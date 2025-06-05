import type { CreateSpot, Spot, UpdateSpot } from '@/features/spots/types';
import { fetchApi } from './api.service';
import type { ApiResponse } from './types';

export const spotsService = {
    getSpots: async (): Promise<ApiResponse<Spot[]>> => {
        return fetchApi<ApiResponse<Spot[]>>(`/spots`);
    },

    getSpotById: async (id: string): Promise<ApiResponse<Spot>> => {
        return fetchApi<ApiResponse<Spot>>(`/spots/${id}`);
    },

    createSpot: async (data: CreateSpot): Promise<ApiResponse<Spot>> => {
        return fetchApi<ApiResponse<Spot>>('/spots', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    updateSpot: async (
        id: string,
        data: UpdateSpot
    ): Promise<ApiResponse<Spot>> => {
        return fetchApi<ApiResponse<Spot>>(`/spots/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteSpot: async (id: string): Promise<ApiResponse<null>> => {
        return fetchApi<ApiResponse<null>>(`/spots/${id}`, {
            method: 'DELETE',
        });
    },
};
