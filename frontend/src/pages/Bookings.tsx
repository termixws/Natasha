import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { bookingsApi } from '../api/bookings';

export const Bookings = () => {
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: bookingsApi.getBookings,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
          Ошибка загрузки бронирований
        </div>
      </div>
    );
  }

  const now = new Date();

  const activeBookings = bookings?.filter(
    (booking) => new Date(booking.endDate) >= now
  ) || [];

  const pastBookings = bookings?.filter(
    (booking) => new Date(booking.endDate) < now
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Мои бронирования
          </h1>
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            К квартирам
          </Link>
        </div>

        {bookings?.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              У вас пока нет бронирований
            </p>
            <Link
              to="/"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Найти квартиру
            </Link>
          </div>
        ) : (
          <>
            {activeBookings.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Активные бронирования
                </h2>
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                    >
                      <div className="flex items-start">
                        {booking.apartment && (
                          <img
                            src={booking.apartment.image}
                            alt={booking.apartment.title}
                            className="w-32 h-32 object-cover rounded-lg mr-6"
                          />
                        )}
                        <div className="flex-1">
                          {booking.apartment && (
                            <>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {booking.apartment.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-2">
                                {booking.apartment.city}
                              </p>
                            </>
                          )}
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>
                              <span className="font-medium">Заезд:</span>{' '}
                              {new Date(booking.startDate).toLocaleDateString('ru-RU')}
                            </p>
                            <p>
                              <span className="font-medium">Выезд:</span>{' '}
                              {new Date(booking.endDate).toLocaleDateString('ru-RU')}
                            </p>
                            <p>
                              <span className="font-medium">Гостей:</span> {booking.guests}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Активно
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Прошедшие бронирования
                </h2>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 opacity-75"
                    >
                      <div className="flex items-start">
                        {booking.apartment && (
                          <img
                            src={booking.apartment.image}
                            alt={booking.apartment.title}
                            className="w-32 h-32 object-cover rounded-lg mr-6"
                          />
                        )}
                        <div className="flex-1">
                          {booking.apartment && (
                            <>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {booking.apartment.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-2">
                                {booking.apartment.city}
                              </p>
                            </>
                          )}
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>
                              <span className="font-medium">Заезд:</span>{' '}
                              {new Date(booking.startDate).toLocaleDateString('ru-RU')}
                            </p>
                            <p>
                              <span className="font-medium">Выезд:</span>{' '}
                              {new Date(booking.endDate).toLocaleDateString('ru-RU')}
                            </p>
                            <p>
                              <span className="font-medium">Гостей:</span> {booking.guests}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            Завершено
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
