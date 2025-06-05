import { z } from 'zod';

// Définir un schéma de validation pour un utilisateur au moment de son inscription
export const evaluationValidation = z.object({
    note: z
        .number()
        .min(0, { message: "La note doit être contenue entre 0 et 10" })
        .max(11, { message: "La note doit être contenue entre 0 et 10" }),
    comment: z
        .string()
        .trim()
        .min(5, { message: 'Le commentaire est requis' })
        .max(256, { message: 'Le commentaire ne doit pas dépasser 255 caractères' }),
    spotId: z.string(),
});