import { Apartment, User, Booking } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Иван Петров',
    email: 'user@example.com',
  },
];

export const mockApartments: Apartment[] = [
  {
    id: 1,
    title: 'Уютная квартира в центре',
    city: 'Москва',
    price: 3500,
    rooms: 2,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Прекрасная двухкомнатная квартира в самом центре города. Рядом метро, магазины и кафе.',
    address: 'ул. Тверская, д. 10',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 2,
    title: 'Современная студия',
    city: 'Санкт-Петербург',
    price: 2500,
    rooms: 1,
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Стильная студия с панорамными окнами и современным ремонтом.',
    address: 'Невский проспект, д. 25',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 3,
    title: 'Семейная квартира',
    city: 'Казань',
    price: 4000,
    rooms: 3,
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Просторная трёхкомнатная квартира для всей семьи.',
    address: 'ул. Баумана, д. 15',
    images: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 4,
    title: 'Квартира у моря',
    city: 'Сочи',
    price: 5000,
    rooms: 2,
    image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Отличный вид на море, 5 минут до пляжа.',
    address: 'Курортный проспект, д. 50',
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 5,
    title: 'Лофт в историческом центре',
    city: 'Москва',
    price: 6000,
    rooms: 2,
    image: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Стильный лофт с высокими потолками и дизайнерским интерьером.',
    address: 'Чистопрудный бульвар, д. 3',
    images: [
      'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 6,
    title: 'Компактная однушка',
    city: 'Екатеринбург',
    price: 2000,
    rooms: 1,
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Небольшая уютная квартира для одного человека или пары.',
    address: 'ул. Ленина, д. 20',
    images: [
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 7,
    title: 'Панорамная квартира',
    city: 'Москва',
    price: 7000,
    rooms: 3,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Роскошная квартира на высоком этаже с видом на город.',
    address: 'Кутузовский проспект, д. 45',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 8,
    title: 'Квартира рядом с парком',
    city: 'Санкт-Петербург',
    price: 3000,
    rooms: 2,
    image: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Тихое место, окна выходят на парк.',
    address: 'пр. Маршала Жукова, д. 8',
    images: [
      'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 9,
    title: 'Апартаменты бизнес-класса',
    city: 'Москва',
    price: 8000,
    rooms: 3,
    image: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Премиальные апартаменты со всеми удобствами.',
    address: 'Пресненская набережная, д. 12',
    images: [
      'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 10,
    title: 'Светлая квартира',
    city: 'Новосибирск',
    price: 2200,
    rooms: 1,
    image: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Светлая квартира с хорошим ремонтом.',
    address: 'Красный проспект, д. 30',
    images: [
      'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 11,
    title: 'Квартира в новостройке',
    city: 'Москва',
    price: 4500,
    rooms: 2,
    image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Новая квартира с евроремонтом.',
    address: 'ул. Академика Янгеля, д. 5',
    images: [
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 12,
    title: 'Квартира для командировочных',
    city: 'Челябинск',
    price: 1800,
    rooms: 1,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Удобная квартира для краткосрочной аренды.',
    address: 'ул. Кирова, д. 12',
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
];

export const mockBookings: Booking[] = [];
