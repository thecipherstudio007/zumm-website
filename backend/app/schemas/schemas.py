from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID

# Contacts
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class ContactResponse(ContactCreate):
    id: UUID
    created_at: datetime
    class Config:
        from_attributes = True

# Careers
class CareerCreate(BaseModel):
    name: str
    email: EmailStr
    message: Optional[str] = None

class CareerResponse(CareerCreate):
    id: UUID
    resume_path: str
    created_at: datetime
    class Config:
        from_attributes = True

# Demos
class DemoRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    scheduled_time: Optional[datetime] = None

class DemoResponse(DemoRequestCreate):
    id: UUID
    source: str
    created_at: datetime
    class Config:
        from_attributes = True

# Calendly Webhook
class CalendlyWebhookPayload(BaseModel):
    name: str
    email: EmailStr
    scheduled_time: datetime

# Newsletters
class NewsletterCreate(BaseModel):
    email: EmailStr

class NewsletterResponse(NewsletterCreate):
    id: UUID
    created_at: datetime
    class Config:
        from_attributes = True
