import { API_URL } from '@/lib/utils';
import { authService } from './auth.service';
import type { ApiError, FetchOptions } from './types';

export async function fetchApi<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const defaultOptions: FetchOptions = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
    };

    // Add authentication token if it exists
    const token = authService.getToken();
    if (token) {
        defaultOptions.headers = {
            ...defaultOptions.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    // Merge options
    const fetchOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            let errorMessage = `Erreur ${response.status}`;

            // Try to get error message from response
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;

                throw {
                    message: errorMessage,
                    status: response.status,
                    code: errorData.code,
                } as ApiError;
            } catch {
                // If the response is not valid JSON
                throw {
                    message: errorMessage,
                    status: response.status,
                } as ApiError;
            }
        }

        // If the response is empty
        if (response.status === 204) {
            return {} as T;
        }

        // Parse the JSON response
        return await response.json();
    } catch (error) {
        // If the error is already formatted (from the try block above)
        if (typeof error === 'object' && error !== null && 'message' in error) {
            throw error;
        }

        // Network error or other
        throw {
            message:
                error instanceof Error
                    ? error.message
                    : 'Erreur de connexion au serveur',
        } as ApiError;
    }
}
