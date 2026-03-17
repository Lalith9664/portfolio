# Portfolio Backend

A **FastAPI** backend that powers the Lalith Kumar M portfolio website.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI |
| Server | Uvicorn (ASGI) |
| Validation | Pydantic v2 |
| Email | Python `smtplib` (SMTP / Gmail) |
| Config | pydantic-settings + `.env` |
| Package manager | [uv](https://docs.astral.sh/uv/) |

## Project Structure

```
backend/
├── main.py           # FastAPI app & route definitions
├── models.py         # Pydantic request / response models
├── data.py           # Portfolio content (projects, skills, about)
├── email_service.py  # SMTP email notifications
├── config.py         # Settings loaded from .env
├── pyproject.toml    # Project manifest & dependencies (uv)
├── requirements.txt  # Pip-compatible dependency list (fallback)
├── .env.example      # Environment variable template
└── README.md
```

## Setup

### 1. Install uv (if not already installed)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

> Or via pip: `pip install uv`

### 2. Sync dependencies

```bash
cd backend
uv sync
```

`uv sync` reads `pyproject.toml`, creates a virtual environment in `.venv/`,
and installs all dependencies automatically — no manual `venv` or `pip` needed.

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your values
```

### 4. (Optional) Enable email notifications

To receive emails when someone fills out the contact form:

1. Use a Gmail account (or create a dedicated one).
2. Enable **2-Step Verification** on the account.
3. Visit <https://myaccount.google.com/apppasswords> and generate an **App Password**.
4. Set `SMTP_USER` and `SMTP_PASSWORD` in your `.env`.

> If SMTP is not configured the server still works — form submissions are logged to the console.

### 5. Run the development server

```bash
uv run main.py
```

The API is now live at <http://localhost:8000>.

## API Reference

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/api/v1/health` | Health check (alias) |
| `GET` | `/api/v1/about` | Personal info & bio |
| `GET` | `/api/v1/skills` | Skill categories |
| `GET` | `/api/v1/projects` | All projects (`?featured=true`) |
| `GET` | `/api/v1/projects/{id}` | Single project |
| `POST` | `/api/v1/contact` | Submit contact form |

### Contact form payload

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Freelance opportunity",
  "message": "Hi Lalith! I'd love to work with you on..."
}
```

### Interactive docs

- Swagger UI: <http://localhost:8000/docs>
- ReDoc: <http://localhost:8000/redoc>

## Connecting the Frontend

To point the React frontend at this backend instead of Formspree, update  
`Contact.tsx` to fetch from `http://localhost:8000/api/v1/contact` (or your  
deployed backend URL).

## Rate Limiting

Contact form submissions are rate-limited to **5 requests per IP per hour**  
(configurable via `RATE_LIMIT_CONTACT` in `.env`).

## Other uv commands

```bash
# Add a new dependency
uv add <package-name>

# Remove a dependency
uv remove <package-name>

# Run any one-off command inside the managed environment
uv run python -c "import fastapi; print(fastapi.__version__)"
```
