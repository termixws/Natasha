from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models import Appointment
from schemas import 
from database import get_db