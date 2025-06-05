import NotFound from '@/components/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';

import { HomePage, LoginPage, SpotsList } from '@/features';
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
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'account',
                element: (
                    <ProtectedRoute>
                        <div>Page de compte (à implémenter)</div>
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
