export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Apartment {
  id: number;
  title: string;
  city: string;
  price: number;
  rooms: number;
  image: string;
  description: string;
  address?: string;
  images?: string[];
}

export interface Booking {
  id: number;
  apartmentId: number;
  userId: number;
  startDate: string;
  endDate: string;
  guests: number;
  apartment?: Apartment;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface BookingRequest {
  apartmentId: number;
  startDate: string;
  endDate: string;
  guests: number;
}
