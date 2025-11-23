import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { apartmentsApi } from '../api/apartments';
import { bookingsApi } from '../api/bookings';

interface BookingFormData {
  startDate: string;
  endDate: string;
  guests: number;
}

export const BookingForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();
  const [successMessage, setSuccessMessage] = useState('');

  const { data: apartment, isLoading } = useQuery({
    queryKey: ['apartment', id],
    queryFn: () => apartmentsApi.getApartment(parseInt(id!)),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: bookingsApi.createBooking,
    onSuccess: () => {
      setSuccessMessage('Бронирование успешно создано!');
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    },
  });

  const onSubmit = (data: BookingFormData) => {
    mutation.mutate({
      apartmentId: parseInt(id!),
      startDate: data.startDate,
      endDate: data.endDate,
      guests: data.guests,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!apartment) {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to={`/apartments/${id}`}
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
          Назад к квартире
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Бронирование
          </h1>

          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-start">
              <img
                src={apartment.image}
                alt={apartment.title}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {apartment.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{apartment.city}</p>
                <p className="text-primary-600 font-bold mt-1">
                  {apartment.price} ₽/ночь
                </p>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}

          {mutation.isError && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Ошибка при создании бронирования
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Дата заезда
              </label>
              <input
                id="startDate"
                type="date"
                {...register('startDate', { required: 'Выберите дату заезда' })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Дата выезда
              </label>
              <input
                id="endDate"
                type="date"
                {...register('endDate', { required: 'Выберите дату выезда' })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Количество гостей
              </label>
              <input
                id="guests"
                type="number"
                min="1"
                max="10"
                {...register('guests', {
                  required: 'Укажите количество гостей',
                  min: { value: 1, message: 'Минимум 1 гость' },
                  max: { value: 10, message: 'Максимум 10 гостей' },
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                defaultValue={1}
              />
              {errors.guests && (
                <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending || !!successMessage}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? 'Создание...' : 'Забронировать'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
