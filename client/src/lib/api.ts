import { API_URL } from './utils';

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({
            message: 'Une erreur est survenue',
        }));
        throw new Error(error.message || `Erreur ${response.status}`);
    }

    return response.json();
}

export type ApiResponse<T> = {
    data: T;
    success: boolean;
    message?: string;
};

export type PaginatedResponse<T> = ApiResponse<{
    items: T[];
    total: number;
    page: number;
    limit: number;
}>;
