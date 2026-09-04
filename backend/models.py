from datetime import datetime, timezone
from typing import Any, Optional, Annotated
from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, Field, EmailStr, ConfigDict


def _to_str(v: Any) -> str:
    return str(v) if isinstance(v, ObjectId) else v


PyObjectId = Annotated[str, BeforeValidator(_to_str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        d = self.model_dump(by_alias=True, exclude_none=True)
        d.pop("_id", None)
        return d

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)


class Exhibitor(BaseDocument):
    slug: str
    name: str
    country: str
    stand: str
    hall: str
    category: str
    pavilion: Optional[str] = None
    description: str = ""
    website: Optional[str] = None
    edition: int = 2024


class Session(BaseDocument):
    slug: str
    track: str
    title: str
    day: str
    start: str
    end: str
    venue: str
    summary: str
    speakers: list[dict] = []
    tags: list[str] = []


class Article(BaseDocument):
    slug: str
    title: str
    date: str
    category: str
    excerpt: str
    body: str
    image: Optional[str] = None


class Partner(BaseDocument):
    tier: str
    name: str
    logo: Optional[str] = None
    url: Optional[str] = None
    order: int = 0


LEAD_TYPES = {"stand", "sponsorship", "visa", "press", "visitor", "contact", "newsletter"}


class LeadIn(BaseModel):
    type: str
    name: str = ""
    email: EmailStr
    company: str = ""
    country: str = ""
    phone: str = ""
    message: str = ""
    fields: dict = {}
    consent: bool = False
    website: str = ""  # honeypot
    utm: dict = {}
    page: str = ""


class Lead(BaseDocument):
    type: str
    name: str
    email: str
    company: str
    country: str
    phone: str
    message: str
    fields: dict
    consent: bool
    utm: dict
    page: str
    status: str = "new"
    email_status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
