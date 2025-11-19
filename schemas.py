from typing import Optional
from sqlmodel import SQLModel

class UserCreate(SQLModel):
    name: str
    email: str
    phone: str
    password: str


class UserRead(SQLModel):
    id: int
    name: str
    email: str
    phone: str


class UserUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    password: Optional[str] = None


class MasterCreate(SQLModel):
    name: str
    sex: str
    phone: str
    experience: int
    specialty: str

class MasterRead(SQLModel):
    id: int
    name: str
    sex: str
    phone: str
    experience: int
    specialty: str

class MasterUpdate(SQLModel):
    name: Optional[str] = None
    sex: Optional[str] = None
    phone: Optional[str] = None
    experience: Optional[int] = None
    specialty: Optional[str] = None

class ServiceCreate(SQLModel):
    name: str
    description: str
    price: float
    duration: int

class ServiceRead(SQLModel):
    id: int
    name: str
    description: str
    price: float
    duration: int

class ServiceUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[int] = None

class AppointmentsCreate(SQLModel):
    