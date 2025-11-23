import { apiClient } from './client';
import { Booking, BookingRequest } from '../types';

export const bookingsApi = {
  createBooking: async (data: BookingRequest): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/bookings', data);
    return response.data;
  },

  getBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>('/bookings');
    return response.data;
  },
};
