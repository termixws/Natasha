import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apartmentsApi } from '../api/apartments';
import { ApartmentCard } from '../components/ApartmentCard';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';

export const Home = () => {
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    search: '',
  });
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['apartments', filters, page],
    queryFn: () =>
      apartmentsApi.getApartments({
        city: filters.city || undefined,
        minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
        rooms: filters.rooms ? parseInt(filters.rooms) : undefined,
        search: filters.search || undefined,
        page,
      }),
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Аренда квартир
        </h1>

        <Filters onFilterChange={handleFilterChange} />

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Ошибка загрузки квартир
          </div>
        )}

        {data && data.apartments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Квартиры не найдены
            </p>
          </div>
        )}

        {data && data.apartments.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.apartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={data.pages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};
