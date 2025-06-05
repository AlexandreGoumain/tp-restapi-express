export type ApiError = {
    message: string;
    status?: number;
    code?: string;
};

export type FetchOptions = RequestInit & {
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
};

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
