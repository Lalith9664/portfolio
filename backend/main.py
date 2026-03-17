"""
Portfolio Backend — FastAPI Application
========================================
Endpoints:
  GET  /                   → health check
  GET  /api/v1/about       → about info
  GET  /api/v1/projects    → all projects  (?featured=true|false)
  GET  /api/v1/projects/{id}
  GET  /api/v1/skills      → skill categories
  POST /api/v1/contact     → submit contact form

Interactive docs: http://localhost:8000/docs
"""

import logging
from contextlib import asynccontextmanager
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import get_settings
from data import ABOUT, PROJECTS, SKILLS
from email_service import send_contact_email
from models import (
    AboutInfo,
    ContactForm,
    ContactResponse,
    HealthResponse,
    Project,
    SkillCategory,
)

# ─────────────────────────────────────────
#  Logging
# ─────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

settings = get_settings()

# ─────────────────────────────────────────
#  Rate-limit store (in-memory, per-process)
#  Tracks how many contact requests each IP has made in the current hour
# ─────────────────────────────────────────
from collections import defaultdict
from datetime import datetime, timedelta

_rate_store: dict[str, list[datetime]] = defaultdict(list)


def _is_rate_limited(ip: str) -> bool:
    now = datetime.utcnow()
    cutoff = now - timedelta(hours=1)
    timestamps = [t for t in _rate_store[ip] if t > cutoff]
    _rate_store[ip] = timestamps
    if len(timestamps) >= settings.RATE_LIMIT_CONTACT:
        return True
    _rate_store[ip].append(now)
    return False


# ─────────────────────────────────────────
#  App
# ─────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 %s v%s starting…", settings.APP_NAME, settings.APP_VERSION)
    yield
    logger.info("👋 Server shutting down.")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "REST API powering the Lalith Kumar M portfolio. "
        "Serves portfolio data and handles contact-form submissions."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ─────────────────────────────────────────
#  CORS
# ─────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# ─────────────────────────────────────────
#  Global exception handler
# ─────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception: %s", exc, exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."},
    )


# ═════════════════════════════════════════
#  ROUTES
# ═════════════════════════════════════════

# ── Health ────────────────────────────────
@app.get("/", response_model=HealthResponse, tags=["Health"])
async def health_check() -> HealthResponse:
    """Returns API health status."""
    return HealthResponse(
        status="ok",
        version=settings.APP_VERSION,
        message="Lalith Kumar Portfolio API is running ✨",
    )


@app.get("/api/v1/health", response_model=HealthResponse, tags=["Health"])
async def health() -> HealthResponse:
    return await health_check()


# ── About ─────────────────────────────────
@app.get("/api/v1/about", response_model=AboutInfo, tags=["Portfolio"])
async def get_about() -> AboutInfo:
    """Returns personal info, bio, and social links."""
    return ABOUT


# ── Skills ────────────────────────────────
@app.get("/api/v1/skills", response_model=List[SkillCategory], tags=["Portfolio"])
async def get_skills() -> List[SkillCategory]:
    """Returns all skill categories with proficiency levels."""
    return SKILLS


# ── Projects ──────────────────────────────
@app.get("/api/v1/projects", response_model=List[Project], tags=["Portfolio"])
async def get_projects(featured: Optional[bool] = None) -> List[Project]:
    """
    Returns all projects.
    Optional query param: `?featured=true` or `?featured=false`
    """
    if featured is None:
        return PROJECTS
    return [p for p in PROJECTS if p.featured == featured]


@app.get("/api/v1/projects/{project_id}", response_model=Project, tags=["Portfolio"])
async def get_project(project_id: int) -> Project:
    """Returns a single project by ID."""
    for project in PROJECTS:
        if project.id == project_id:
            return project
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Project with id={project_id} not found.",
    )


# ── Contact ───────────────────────────────
@app.post(
    "/api/v1/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
    tags=["Contact"],
)
async def submit_contact(form: ContactForm, request: Request) -> ContactResponse:
    """
    Handles contact form submission.
    - Validates input (Pydantic)
    - Rate-limits per IP (max 5 requests / hour)
    - Sends email notification (if SMTP is configured)
    """
    client_ip = request.client.host if request.client else "unknown"

    if _is_rate_limited(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please wait before submitting again.",
        )

    logger.info(
        "Contact form received → name=%s | email=%s | ip=%s",
        form.name,
        form.email,
        client_ip,
    )

    success = send_contact_email(
        name=form.name,
        email=form.email,
        phone=form.phone,
        subject=form.subject or "New Portfolio Contact",
        message=form.message,
    )

    if not success:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Failed to send message. Please try again later or email me directly at lalith8302@gmail.com.",
        )

    return ContactResponse(
        success=True,
        message="Your message was sent successfully! I'll get back to you within 24 hours. 🎉",
    )


# ─────────────────────────────────────────
#  Entry point  →  uv run main.py
# ─────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["."],
        log_level="info",
    )
