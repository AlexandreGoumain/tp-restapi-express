import { authService } from '@/services';
import type { LoginCredentials } from '@/services/auth.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const AUTH_KEYS = {
    all: ['auth'] as const,
    user: () => [...AUTH_KEYS.all, 'user'] as const,
    profile: (userId: string) => [...AUTH_KEYS.user(), userId] as const,
};

export function useLogin() {
    const { setUser, setToken, login } = useAuth();

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await login(
                credentials.email,
                credentials.password
            );
            localStorage.setItem('auth_token', response.data.accessToken);
            localStorage.setItem('user_id', response.data.userId);

            setToken(response.data.accessToken);
            setUser({ id: response.data.userId });

            return response;
        },
    });
}

export function useLogout() {
    const { logout } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => {
            logout();
            return Promise.resolve();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AUTH_KEYS.all });
            navigate('/');
        },
    });
}

export function useUserProfile(userId: string | null) {
    return useQuery({
        queryKey: userId ? AUTH_KEYS.profile(userId) : AUTH_KEYS.user(),
        queryFn: () => authService.getCurrentUser(),
        enabled: !!userId && !!localStorage.getItem('auth_token'),
    });
}
