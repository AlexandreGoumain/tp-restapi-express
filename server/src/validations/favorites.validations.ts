import { z } from 'zod';

export const addFavoriteValidation = z.object({
    spotId: z
        .string()
        .uuid({ message: "L'ID du spot doit être un UUID valide" })
        .min(1, { message: "L'ID du spot est requis" }),
});

export const removeFavoriteValidation = z.object({
    spotId: z
        .string()
        .uuid({ message: "L'ID du spot doit être un UUID valide" })
        .min(1, { message: "L'ID du spot est requis" }),
});

export type AddFavoriteData = z.infer<typeof addFavoriteValidation>;
export type RemoveFavoriteData = z.infer<typeof removeFavoriteValidation>;
