import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import CareerApplication
from app.schemas.schemas import CareerResponse
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=CareerResponse)
async def submit_application(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(None),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Save resume file
        file_ext = resume.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(file_path, "wb") as buffer:
            content = await resume.read()
            buffer.write(content)
            
        new_app = CareerApplication(
            name=name,
            email=email,
            resume_path=file_path,
            message=message
        )
        db.add(new_app)
        db.commit()
        db.refresh(new_app)
        
        logger.info(f"New career application from {email}")
        return new_app
    except Exception as e:
        db.rollback()
        logger.error(f"Error submitting career application: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
