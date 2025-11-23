import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ApartmentDetails } from '../pages/ApartmentDetails';
import { BookingForm } from '../pages/BookingForm';
import { Bookings } from '../pages/Bookings';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'apartments/:id',
        element: <ApartmentDetails />,
      },
      {
        path: 'book/:id',
        element: (
          <ProtectedRoute>
            <BookingForm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
