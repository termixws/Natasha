import { useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: {
    city: string;
    minPrice: string;
    maxPrice: string;
    rooms: string;
    search: string;
  }) => void;
}

export const Filters = ({ onFilterChange }: FiltersProps) => {
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ city, minPrice, maxPrice, rooms, search });
  };

  const handleReset = () => {
    setCity('');
    setMinPrice('');
    setMaxPrice('');
    setRooms('');
    setSearch('');
    onFilterChange({ city: '', minPrice: '', maxPrice: '', rooms: '', search: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Поиск
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Название..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Город
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Все города</option>
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
            <option value="Казань">Казань</option>
            <option value="Сочи">Сочи</option>
            <option value="Екатеринбург">Екатеринбург</option>
            <option value="Новосибирск">Новосибирск</option>
            <option value="Челябинск">Челябинск</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Мин. цена
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="От"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Макс. цена
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="До"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Комнат
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Любое</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Применить
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Сбросить
        </button>
      </div>
    </form>
  );
};
