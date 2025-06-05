import { fetchApi } from './api.service';
import type { ApiResponse } from './types';

export type LoginCredentials = {
    email: string;
    password: string;
};

export type LoginResponse = {
    message: string;
    data: {
        accessToken: string;
        userId: string;
    };
};

export type RegisterData = {
    email: string;
    password: string;
    username: string;
};

export type AuthError = {
    message: string;
    code?: string;
    status?: number;
};

export const authService = {
    login: async (
        credentials: LoginCredentials
    ): Promise<ApiResponse<LoginResponse>> => {
        try {
            return await fetchApi<ApiResponse<LoginResponse>>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            const authError: AuthError = {
                message:
                    error instanceof Error
                        ? error.message
                        : 'Échec de connexion',
            };
            throw authError;
        }
    },

    register: async (
        data: RegisterData
    ): Promise<ApiResponse<LoginResponse>> => {
        try {
            return await fetchApi<ApiResponse<LoginResponse>>(
                '/auth/register',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            const authError: AuthError = {
                message:
                    error instanceof Error
                        ? error.message
                        : "Échec d'inscription",
            };
            throw authError;
        }
    },

    logout: async (): Promise<void> => {
        try {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_id');

            localStorage.setItem('auth_token', '');
            localStorage.setItem('user_id', '');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    },

    getCurrentUser: async () => {
        try {
            return await fetchApi('/auth/me');
        } catch (error) {
            const authError: AuthError = {
                message:
                    error instanceof Error
                        ? error.message
                        : 'Échec de récupération du profil',
            };
            throw authError;
        }
    },

    getToken: (): string | null => {
        return localStorage.getItem('auth_token');
    },

    isTokenExpired: (): boolean => {
        const token = localStorage.getItem('auth_token');
        if (!token) return true;

        try {
            return false;
        } catch {
            return true;
        }
    },
};
