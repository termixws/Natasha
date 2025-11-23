import { http, HttpResponse } from 'msw';
import { mockUsers, mockApartments, mockBookings } from './data';
import { LoginRequest, RegisterRequest, BookingRequest } from '../types';

const API_BASE = 'http://127.0.0.1:8000/api';

export const handlers = [
  http.post(`${API_BASE}/login`, async ({ request }) => {
    const body = await request.json() as LoginRequest;
    const user = mockUsers.find(u => u.email === body.email);

    if (user && body.password === 'password123') {
      return HttpResponse.json({
        access_token: 'fake-jwt-token-123',
        user,
      });
    }

    return HttpResponse.json(
      { detail: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.post(`${API_BASE}/register`, async ({ request }) => {
    const body = await request.json() as RegisterRequest;

    const newUser = {
      id: mockUsers.length + 1,
      name: body.name,
      email: body.email,
    };

    mockUsers.push(newUser);

    return HttpResponse.json({
      message: 'User registered successfully',
      access_token: `fake-jwt-token-${newUser.id}`,
      user: newUser,
    });
  }),

  http.get(`${API_BASE}/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }

    return HttpResponse.json(mockUsers[0]);
  }),

  http.get(`${API_BASE}/apartments`, ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('city');
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');
    const rooms = url.searchParams.get('rooms');
    const search = url.searchParams.get('search');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = 10;

    let filtered = [...mockApartments];

    if (city) {
      filtered = filtered.filter(a => a.city.toLowerCase() === city.toLowerCase());
    }

    if (minPrice) {
      filtered = filtered.filter(a => a.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(a => a.price <= parseInt(maxPrice));
    }

    if (rooms) {
      filtered = filtered.filter(a => a.rooms === parseInt(rooms));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchLower) ||
        a.description.toLowerCase().includes(searchLower)
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return HttpResponse.json({
      apartments: paginated,
      total: filtered.length,
      page,
      pages: Math.ceil(filtered.length / limit),
    });
  }),

  http.get(`${API_BASE}/apartments/:id`, ({ params }) => {
    const { id } = params;
    const apartment = mockApartments.find(a => a.id === parseInt(id as string));

    if (!apartment) {
      return HttpResponse.json(
        { detail: 'Apartment not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(apartment);
  }),

  http.post(`${API_BASE}/bookings`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json() as BookingRequest;

    const newBooking = {
      id: mockBookings.length + 1,
      apartmentId: body.apartmentId,
      userId: 1,
      startDate: body.startDate,
      endDate: body.endDate,
      guests: body.guests,
    };

    mockBookings.push(newBooking);

    return HttpResponse.json(newBooking, { status: 201 });
  }),

  http.get(`${API_BASE}/bookings`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }

    const bookingsWithApartments = mockBookings.map(booking => ({
      ...booking,
      apartment: mockApartments.find(a => a.id === booking.apartmentId),
    }));

    return HttpResponse.json(bookingsWithApartments);
  }),
];
