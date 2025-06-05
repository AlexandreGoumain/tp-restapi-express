import { authService } from '@/services';
import { createContext, useCallback, useEffect, useState } from 'react';
import type { AuthContextType, AuthProviderProps, User } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        const storedUserId = localStorage.getItem('user_id');

        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUser({ id: storedUserId });
        }

        setIsLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            setIsLoading(true);
            return await authService.login({ email, password });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setToken(null);
        setUser(null);
    }, []);

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        token,
        setUser,
        setToken,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
