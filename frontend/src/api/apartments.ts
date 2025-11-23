import { apiClient } from './client';
import { Apartment } from '../types';

export interface ApartmentsResponse {
  apartments: Apartment[];
  total: number;
  page: number;
  pages: number;
}

export interface ApartmentsFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  search?: string;
  page?: number;
}

export const apartmentsApi = {
  getApartments: async (filters?: ApartmentsFilters): Promise<ApartmentsResponse> => {
    const params = new URLSearchParams();

    if (filters?.city) params.append('city', filters.city);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.rooms) params.append('rooms', filters.rooms.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());

    const response = await apiClient.get<ApartmentsResponse>(`/apartments?${params.toString()}`);
    return response.data;
  },

  getApartment: async (id: number): Promise<Apartment> => {
    const response = await apiClient.get<Apartment>(`/apartments/${id}`);
    return response.data;
  },
};
