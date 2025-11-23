import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apartmentsApi } from '../api/apartments';
import { useAuth } from '../context/AuthContext';

export const ApartmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: apartment, isLoading, error } = useQuery({
    queryKey: ['apartment', id],
    queryFn: () => apartmentsApi.getApartment(parseInt(id!)),
    enabled: !!id,
  });

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/book/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Квартира не найдена
          </h2>
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  const images = apartment.images && apartment.images.length > 0
    ? apartment.images
    : [apartment.image];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Назад к списку
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={images[currentImageIndex]}
              alt={apartment.title}
              className="w-full h-full object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-full text-lg font-bold">
              {apartment.price} ₽/ночь
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {apartment.title}
            </h1>

            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-lg">{apartment.city}</span>
              {apartment.address && (
                <>
                  <span className="mx-2">•</span>
                  <span>{apartment.address}</span>
                </>
              )}
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {apartment.rooms} {apartment.rooms === 1 ? 'комната' : 'комнаты'}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Описание
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {apartment.description}
              </p>
            </div>

            <button
              onClick={handleBooking}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors"
            >
              Забронировать
            </button>

            {!isAuthenticated && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                Для бронирования необходимо{' '}
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  войти в аккаунт
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
