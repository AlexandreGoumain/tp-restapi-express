import NotFound from '@/components/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';

import {
    HomePage,
    LoginPage,
    ProfilPage,
    SpotDetails,
    SpotForm,
    SpotsList,
} from '@/features';
import Layout from '@/layouts/Layout';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'spots',
                element: <SpotsList />,
            },
            {
                path: 'spots/:id',
                element: <SpotDetails />,
            },
            {
                path: 'spots/new',
                element: <SpotForm />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'account',
                element: (
                    <ProtectedRoute>
                        <ProfilPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
