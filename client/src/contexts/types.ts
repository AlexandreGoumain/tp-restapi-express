import type { LoginResponse } from '@/services/auth.service';
import type { ApiResponse } from '@/services/types';
import type { ReactNode } from 'react';

export interface User {
    id: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;

    login: (
        email: string,
        password: string
    ) => Promise<ApiResponse<LoginResponse>>;
    logout: () => Promise<void>;

    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}
