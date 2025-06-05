import { db } from '../config/pool';
import logger from '../utils/logger';

import { eq } from 'drizzle-orm';
import { NewUser } from '../entities/User';
import { users } from '../schemas';

export const userModel = {
    getAll: () => {
        try {
            return db
                .select({
                    id: users.id,
                    username: users.username,
                })
                .from(users);
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération des utilisateurs; ${err.message}`
            );
            throw new Error('Impossible de récupérer les utilisateurs');
        }
    },

    get: (id: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns: {
                    id: true,
                    username: true,
                    email: true,
                },
                with: {
                    spots: {
                        columns: {
                            id: true,
                            description: true,
                            address: true,
                            createdAt: true,
                            modifiedAt: true,
                        },
                    },
                    evaluations: {
                        columns: {
                            id: true,
                            comment: true,
                            spotId: true,
                            createdAt: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur; ${err.message}`
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },

    getWithPassword: (id: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns: {
                    id: true,
                    username: true,
                    email: true,
                    password: true,
                },
            });
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur avec mot de passe; ${err.message}`
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },

    update: (id: string, email: string, username: string) => {
        try {
            return db
                .update(users)
                .set({ email, username })
                .where(eq(users.id, id));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la mise à jour de l'utilisateur; ${err.message}`
            );
            throw new Error("Impossible de mettre à jour l'utilisateur");
        }
    },

    updatePassword: (id: string, password: string) => {
        try {
            return db.update(users).set({ password }).where(eq(users.id, id));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la mise à jour du mot de passe de l'utilisateur; ${err.message}`
            );
            throw new Error(
                "Impossible de mettre à jour le mot de passe de l'utilisateur"
            );
        }
    },

    findByCredentials: (email: string) => {
        try {
            return db
                .select({
                    id: users.id,
                    password: users.password,
                    username: users.username,
                    email: users.email,
                })
                .from(users)
                .where(eq(users.email, email));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur; ${err.message}`
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },

    findByUsername: (username: string) => {
        try {
            return db
                .select({
                    id: users.id,
                    password: users.password,
                    username: users.username,
                    email: users.email,
                })
                .from(users)
                .where(eq(users.username, username));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la récupération de l'utilisateur; ${err.message}`
            );
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },

    create: (user: NewUser) => {
        try {
            return db.insert(users).values(user).returning({ id: users.id });
        } catch (err: any) {
            logger.error(
                `Erreur lors de la création de l'utilisateur; ${err.message}`
            );
            throw new Error("Impossible de créer l'utilisateur");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(users).where(eq(users.id, id));
        } catch (err: any) {
            logger.error(
                `Erreur lors de la suppression de l'utilisateur; ${err.message}`
            );
            throw new Error("Impossible de supprimer l'utilisateur");
        }
    },
};
