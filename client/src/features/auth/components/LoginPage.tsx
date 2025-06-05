import { LoginForm } from '@/components/login-form';
import { useLogin } from '@/hooks';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { LocationState } from './types';

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState<string | null>(null);

    const locationState = location.state as LocationState;
    const from = locationState?.from?.pathname || '/';

    const loginMutation = useLogin();
    const isLoading = loginMutation.isPending;

    const handleLogin = async (email: string, password: string) => {
        try {
            setError(null);
            await loginMutation.mutateAsync({ email, password });
            navigate(from, { replace: true });
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Une erreur est survenue lors de la connexion'
            );
        }
    };

    return (
        <div className='max-w-md mx-auto'>
            <h1 className='text-2xl font-bold mb-6'>Connexion</h1>

            {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                    {error}
                </div>
            )}

            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        </div>
    );
}
