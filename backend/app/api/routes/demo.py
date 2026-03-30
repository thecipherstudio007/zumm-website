from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import DemoBooking
from app.schemas.schemas import DemoRequestCreate, DemoResponse
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/", response_model=DemoResponse)
def request_demo(demo: DemoRequestCreate, db: Session = Depends(get_db)):
    try:
        new_booking = DemoBooking(
            name=demo.name,
            email=demo.email,
            company=demo.company,
            scheduled_time=demo.scheduled_time,
            source="manual"
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
        
        logger.info(f"New manual demo request from {demo.email}")
        return new_booking
    except Exception as e:
        db.rollback()
        logger.error(f"Error submitting demo request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
