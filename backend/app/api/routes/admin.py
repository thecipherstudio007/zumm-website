from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import ContactSubmission, CareerApplication, DemoBooking

router = APIRouter()

@router.get("/leads")
def get_all_leads(db: Session = Depends(get_db)):
    """
    Returns a dump of all relevant DB data for Admin Dashboard matching CRM usage.
    """
    contacts = db.query(ContactSubmission).all()
    careers = db.query(CareerApplication).all()
    demos = db.query(DemoBooking).all()
    
    return {
        "contacts": contacts,
        "careers": careers,
        "demos": demos
    }
