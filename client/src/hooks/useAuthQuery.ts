import type { LoginCredentials } from '@/services/auth.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export const AUTH_KEYS = {
    all: ['auth'] as const,
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

    return useMutation({
        mutationFn: async () => {
            await logout();
            return Promise.resolve();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AUTH_KEYS.all });
        },
    });
}
