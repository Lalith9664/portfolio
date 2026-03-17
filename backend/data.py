"""
Static portfolio data — single source of truth for the API.
Edit this file to update your portfolio content.
"""

from models import Project, SkillCategory, Skill, AboutInfo

# ─────────────────────────────────────────
#  ABOUT
# ─────────────────────────────────────────
ABOUT: AboutInfo = AboutInfo(
    name="Lalith Kumar M",
    title="Frontend Developer",
    tagline="Crafting elegant digital experiences — from pixel-perfect interfaces to scalable server architectures.",
    bio=[
        "Hi! I'm Lalith Kumar, a passionate Full Stack Developer with a love for building "
        "things that live on the internet. I specialise in creating responsive, performant, "
        "and accessible web applications.",
        "With expertise in React, TypeScript, Python, and FastAPI, I bridge the gap between "
        "design and engineering. I enjoy the full spectrum of web development — from crafting "
        "intuitive UIs to architecting efficient backend systems.",
        "When I'm not writing code, I'm exploring the latest in web technologies, contributing "
        "to open source, or designing systems that scale.",
    ],
    location="India",
    status="Open to Work",
    education="B.Tech CSE",
    interests="Open Source",
    email="lalith8302@gmail.com",
    github="https://github.com/Lalith9664/",
    linkedin="https://www.linkedin.com/in/lalith-kumar-2a124b331/",
    twitter="https://twitter.com",
)

# ─────────────────────────────────────────
#  SKILLS
# ─────────────────────────────────────────
SKILLS: list[SkillCategory] = [
    SkillCategory(
        category="Frontend",
        icon="🎨",
        color="from-blue-500 to-violet-500",
        skills=[
            Skill(name="React", icon="⚛️", level=92),
            Skill(name="TypeScript", icon="🔷", level=88),
            Skill(name="Tailwind CSS", icon="💨", level=90),
            Skill(name="Next.js", icon="▲", level=82),
            Skill(name="HTML & CSS", icon="🌐", level=95),
        ],
    ),
    SkillCategory(
        category="Backend",
        icon="⚙️",
        color="from-emerald-500 to-cyan-500",
        skills=[
            Skill(name="Python", icon="🐍", level=90),
            Skill(name="FastAPI", icon="⚡", level=85),
            Skill(name="Node.js", icon="🟢", level=82),
            Skill(name="Express.js", icon="🚂", level=80),
            Skill(name="REST APIs", icon="🔗", level=92),
        ],
    ),
    SkillCategory(
        category="DevOps & Tools",
        icon="🛠️",
        color="from-orange-500 to-rose-500",
        skills=[
            Skill(name="Git & GitHub", icon="🐙", level=90),
            Skill(name="Docker", icon="🐳", level=75),
            Skill(name="Linux / Bash", icon="🐧", level=82),
            Skill(name="VS Code", icon="💻", level=95),
            Skill(name="Figma", icon="🎯", level=72),
        ],
    ),
]

# ─────────────────────────────────────────
#  PROJECTS
# ─────────────────────────────────────────
PROJECTS: list[Project] = [
    Project(
        id=1,
        title="HackPath",
        description=(
            "A competitive programming platform with real-time MCQ rounds, coding challenges, "
            "leaderboards, and countdown timers. Built for hackathons and tech competitions."
        ),
        image="🏆",
        tags=["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
        github="https://github.com/Lalith9664/",
        live="https://example.com",
        stars=48,
        forks=12,
        featured=True,
        color="from-violet-500 to-indigo-500",
    ),
    Project(
        id=2,
        title="DevCompiler",
        description=(
            "An online code execution environment supporting multiple languages. Features syntax "
            "highlighting, real-time output, and secure Docker-based sandboxing."
        ),
        image="⚡",
        tags=["React", "Monaco Editor", "Python", "Docker", "WebSocket"],
        github="https://github.com/Lalith9664/",
        live="https://example.com",
        stars=35,
        forks=8,
        featured=True,
        color="from-cyan-500 to-blue-500",
    ),
    Project(
        id=3,
        title="PixelUI",
        description=(
            "A modern component library with glassmorphism design, dark mode support, and smooth "
            "animations built with React and Tailwind CSS."
        ),
        image="🎨",
        tags=["React", "Tailwind CSS", "Storybook", "TypeScript"],
        github="https://github.com/Lalith9664/",
        live="https://example.com",
        stars=62,
        forks=19,
        featured=False,
        color="from-rose-500 to-orange-500",
    ),
    Project(
        id=4,
        title="APIForge",
        description=(
            "A FastAPI boilerplate with JWT authentication, role-based access control, database "
            "migrations, and Swagger documentation built-in."
        ),
        image="🔧",
        tags=["FastAPI", "Python", "PostgreSQL", "JWT", "Alembic"],
        github="https://github.com/Lalith9664/",
        live="https://example.com",
        stars=29,
        forks=11,
        featured=False,
        color="from-emerald-500 to-teal-500",
    ),
    Project(
        id=5,
        title="QuizMaster",
        description=(
            "A real-time quiz application with WebSocket-based multiplayer, leaderboards, and "
            "custom quiz creation tools."
        ),
        image="🎯",
        tags=["React", "Node.js", "Socket.io", "MongoDB"],
        github="https://github.com/Lalith9664/",
        live="https://example.com",
        stars=41,
        forks=14,
        featured=False,
        color="from-amber-500 to-yellow-500",
    ),
    Project(
        id=6,
        title="NoteVault",
        description=(
            "A minimal, keyboard-first notes app with markdown support, search, tagging, and "
            "local-first storage using IndexedDB."
        ),
        image="📝",
        tags=["React", "TypeScript", "IndexedDB", "Markdown"],
        github="https://github.com/Lalith9664/",
        live="https://example.com",
        stars=23,
        forks=7,
        featured=False,
        color="from-pink-500 to-rose-500",
    ),
]
