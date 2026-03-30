from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import DemoBooking
from app.schemas.schemas import DemoResponse
from datetime import datetime
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/webhook")
async def calendly_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Receives webhook payload from Calendly.
    Extracts name, email, and scheduled time to store in DEMO_BOOKINGS.
    """
    try:
        payload = await request.json()
        
        print("Calendly webhook received", payload)
        logger.info(f"Calendly webhook received: {payload}")
        
        if payload.get("event") != "invitee.created":
            return {"status": "success", "message": "Ignored non-creation event"}
        
        payload_data = payload.get("payload", {})
        
        email = payload_data.get("email")
        name = payload_data.get("name")
        
        scheduled_event = payload_data.get("scheduled_event", {})
        start_time_str = scheduled_event.get("start_time")
        
        if not email or not name:
            raise ValueError("Missing required fields (email or name)")
            
        try:
            if start_time_str:
                scheduled_time = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
            else:
                scheduled_time = datetime.now()
        except ValueError:
            scheduled_time = datetime.now()
        
        new_booking = DemoBooking(
            name=name,
            email=email,
            company=None,
            scheduled_time=scheduled_time,
            source="calendly"
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
        
        logger.info(f"Calendly webhook parsed. Booking stored for {email}")
        return {"status": "success", "booking_id": str(new_booking.id)}
    except Exception as e:
        db.rollback()
        logger.error(f"Error processing Calendly webhook: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid Webhook payload")
