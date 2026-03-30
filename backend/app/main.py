from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import contact, careers, demo, calendly, admin
from app.core.database import engine, Base

# Auto-create tables for local testing
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, specify the exact domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(careers.router, prefix="/api/careers", tags=["Careers"])
app.include_router(demo.router, prefix="/api/demo-request", tags=["Demo Requests"])
app.include_router(calendly.router, prefix="/api/calendly", tags=["Calendly"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Zumm Backend API"}
