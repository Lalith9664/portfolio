from pydantic import BaseModel, EmailStr, field_validator
from typing import List, Optional
import re


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = "New Portfolio Contact"
    message: str

    @field_validator("name")
    @classmethod
    def name_must_be_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        if len(v) > 100:
            raise ValueError("Name must not exceed 100 characters")
        return v

    @field_validator("phone")
    @classmethod
    def phone_must_be_valid(cls, v: Optional[str]) -> Optional[str]:
        if v:
            v = v.strip()
            if len(v) > 20:
                raise ValueError("Phone number must not exceed 20 characters")
            cleaned = re.sub(r"[\s\-\+\(\)]", "", v)
            if cleaned and not cleaned.isdigit():
                raise ValueError("Phone number must contain only digits, spaces, +, -, (, )")
        return v or None

    @field_validator("message")
    @classmethod
    def message_must_be_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters")
        if len(v) > 5000:
            raise ValueError("Message must not exceed 5000 characters")
        # Basic XSS sanitisation — strip obvious HTML tags
        v = re.sub(r"<[^>]+>", "", v)
        return v

    @field_validator("subject")
    @classmethod
    def subject_must_be_valid(cls, v: Optional[str]) -> Optional[str]:
        if v:
            v = v.strip()
            if len(v) > 200:
                raise ValueError("Subject must not exceed 200 characters")
            v = re.sub(r"<[^>]+>", "", v)
        return v


class ContactResponse(BaseModel):
    success: bool
    message: str


class Skill(BaseModel):
    name: str
    icon: str
    level: int


class SkillCategory(BaseModel):
    category: str
    icon: str
    color: str
    skills: List[Skill]


class Project(BaseModel):
    id: int
    title: str
    description: str
    image: str
    tags: List[str]
    github: str
    live: str
    stars: int
    forks: int
    featured: bool
    color: str


class AboutInfo(BaseModel):
    name: str
    title: str
    tagline: str
    bio: List[str]
    location: str
    status: str
    education: str
    interests: str
    email: str
    github: str
    linkedin: str
    twitter: str


class HealthResponse(BaseModel):
    status: str
    version: str
    message: str
