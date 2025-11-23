import { Link } from 'react-router-dom';
import { Apartment } from '../types';

interface ApartmentCardProps {
  apartment: Apartment;
}

export const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={apartment.image}
          alt={apartment.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {apartment.price} ₽/ночь
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {apartment.title}
        </h3>

        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
          <svg
            className="w-4 h-4 mr-1"
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
          <span>{apartment.city}</span>
          <span className="mx-2">•</span>
          <span>{apartment.rooms} комн.</span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {apartment.description}
        </p>

        <Link
          to={`/apartments/${apartment.id}`}
          className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md text-sm font-medium transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};
