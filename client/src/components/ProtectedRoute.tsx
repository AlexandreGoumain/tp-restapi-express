import { useAuth } from '@/hooks';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-[50vh]'>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='w-12 h-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-500 border-r-blue-700 animate-spin'></div>
                    <div className='text-lg font-medium'>
                        Vérification de l'authentification...
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
