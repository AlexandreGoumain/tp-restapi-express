import type { CreateSpot, UpdateSpot } from '@/features/spots/types';
import { spotsService } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const SPOTS_KEYS = {
    all: ['spots'] as const,
    details: () => [...SPOTS_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...SPOTS_KEYS.details(), id] as const,
};

export function useGetSpots() {
    return useQuery({
        queryKey: SPOTS_KEYS.all,
        queryFn: () => spotsService.getSpots(),
    });
}

export function useGetSpotById(id: string) {
    return useQuery({
        queryKey: SPOTS_KEYS.detail(id),
        queryFn: () => spotsService.getSpotById(id),
        enabled: !!id, // request is disabled if id is empty
    });
}

export function useCreateSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateSpot) => spotsService.createSpot(data),
        onSuccess: () => {
            // Invalidate list queries to reload
            queryClient.invalidateQueries({ queryKey: SPOTS_KEYS.all });
        },
    });
}

export function useUpdateSpot(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateSpot) => spotsService.updateSpot(id, data),
        onSuccess: () => {
            // Invalidate specific queries
            queryClient.invalidateQueries({ queryKey: SPOTS_KEYS.detail(id) });
            queryClient.invalidateQueries({ queryKey: SPOTS_KEYS.all });
        },
    });
}

export function useDeleteSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => spotsService.deleteSpot(id),
        onSuccess: (_, id) => {
            // Invalidate queries
            queryClient.invalidateQueries({ queryKey: SPOTS_KEYS.all });
            // Remove spot from cache
            queryClient.removeQueries({ queryKey: SPOTS_KEYS.detail(id) });
        },
    });
}
