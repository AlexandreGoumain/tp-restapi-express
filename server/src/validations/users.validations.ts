import { z } from 'zod';

// Définir un schéma de validation pour un utilisateur au moment de son inscription
export const userRegisterValidation = z.object({
    username: z
        .string()
        .trim()
        .min(6, { message: "L'username doit contenir au moins 6 caractères " })
        .max(13, { message: "L'username doit contenir maximum 13 caractères" }),
    email: z
        .string()
        .trim()
        .email({ message: 'Adresse email invalide' })
        .refine((email: string): boolean => {
            // faites votre propre condition ici, appel API, vérif DB ou que sais-je
            // cela fait aussi parti de votre schéma de validation
            return true;
        }),
    password: z
        .string()
        .trim()
        .min(6, {
            message: 'Votre mot de passe doit contenir au moins 6 caractères',
        })
        .regex(/[0-9]/, {
            message: 'Votre mot de passe doit contenir au moins un chiffre',
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message:
                'Votre mot de passe doit contenir au moins un caractère spécial',
        }),
});

export const userUpdatePasswordValidation = z.object({
    currentPassword: z
        .string()
        .trim()
        .min(1, { message: 'Le mot de passe actuel est requis' }),
    newPassword: z
        .string()
        .trim()
        .min(6, {
            message:
                'Le nouveau mot de passe doit contenir au moins 6 caractères',
        })
        .regex(/[0-9]/, {
            message:
                'Le nouveau mot de passe doit contenir au moins un chiffre',
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message:
                'Le nouveau mot de passe doit contenir au moins un caractère spécial',
        }),
});
