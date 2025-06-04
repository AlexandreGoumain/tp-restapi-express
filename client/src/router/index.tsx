import NotFound from '@/components/NotFound';
import { HomePage } from '@/features';
import { SpotsList } from '@/features/spots/components';
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
        ],
    },
]);
