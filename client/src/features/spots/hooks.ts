import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { spotsApi } from './api';
import type { CreateSpot, UpdateSpot } from './types';

export const SPOTS_KEYS = {
    all: ['spots'] as const,
    details: () => [...SPOTS_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...SPOTS_KEYS.details(), id] as const,
};

const useGetSpots = () => {
    return useQuery({
        queryKey: SPOTS_KEYS.all,
        queryFn: () => spotsApi.getSpots(),
    });
};

const useGetSpotById = (id: string) => {
    return useQuery({
        queryKey: SPOTS_KEYS.detail(id),
        queryFn: () => spotsApi.getSpotById(id),
        enabled: !!id, // Désactiver la requête si l'ID est vide
    });
};

/**
 * Hook pour créer un nouveau post
 */
const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateSpot) => spotsApi.createSpot(data),
        onSuccess: () => {
            // Invalider les requêtes de liste pour les recharger
            queryClient.invalidateQueries({ queryKey: SPOTS_KEYS.all });
        },
    });
};

/**
 * Hook pour mettre à jour un post existant
 */
const useUpdatePost = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateSpot) => spotsApi.updateSpot(id, data),
        onSuccess: () => {
            // Invalider les requêtes spécifiques
            queryClient.invalidateQueries({ queryKey: SPOTS_KEYS.detail(id) });
            queryClient.invalidateQueries({ queryKey: SPOTS_KEYS.all });
        },
    });
};

/**
 * Hook pour supprimer un post
 */
const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => spotsApi.deleteSpot(id),
        onSuccess: (_, id) => {
            // Invalider les requêtes
            queryClient.invalidateQueries({ queryKey: SPOTS_KEYS.all });
            // Supprimer le post du cache
            queryClient.removeQueries({ queryKey: SPOTS_KEYS.detail(id) });
        },
    });
};

export {
    useCreatePost,
    useDeletePost,
    useGetSpotById,
    useGetSpots,
    useUpdatePost,
};
