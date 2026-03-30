from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import ContactSubmission
from app.schemas.schemas import ContactCreate, ContactResponse
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/", response_model=ContactResponse)
def submit_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    try:
        new_contact = ContactSubmission(
            name=contact.name,
            email=contact.email,
            company=contact.company,
            message=contact.message
        )
        db.add(new_contact)
        db.commit()
        db.refresh(new_contact)
        
        # Optional: Send email to admin
        logger.info(f"New contact submission from {contact.email}")
        
        return new_contact
    except Exception as e:
        db.rollback()
        logger.error(f"Error submitting contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
