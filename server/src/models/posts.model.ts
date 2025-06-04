import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { comments, posts, users } from "../schemas";
import logger from "../utils/logger";
import { NewPost } from "../entities/Post";

export const postModel = {
    create: (post: NewPost) => {
        try {
            return db.insert(posts).values(post).returning({
                id: posts.id,
                title: posts.title
            }).execute();
        } catch (err: any) {
            logger.error("Impossible de créer le post: +", err.message);
            throw new Error("Le post ne peut pas être crée");
        }
    },

    delete: (id: string, authorId: string) => {
        try {
            return db.delete(posts).where(
                and(
                    eq(posts.id, id),
                    eq(posts.author, authorId)
                )
            )
        } catch (err: any) {
            logger.error("Impossible de supprimer le post: +", err.message);
            throw new Error("Le post ne peut pas être supprimé");
        }
    },

    getAll: () => {
        try {
            return db.query.posts.findMany({
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    comments: {
                        with: {
                            user: {
                                columns: {
                                    id: true,
                                    username: true
                                }
                            }
                        }
                    }
                }
            })
        } catch (err: any) {
            logger.error("Impossible de récupérer les posts: +", err.message);
            return [];
        }
    },

    get: (id: string) => {
        try {
            return db.query.posts.findFirst({
                where: eq(posts.id, id),
                columns: {
                    id: true,
                    title: true,
                    content: true,
                    created_at: true
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    comments: {
                        columns: {
                            id: true,
                            content: true,
                            createdAt: true
                        },
                        with: {
                            user: {
                                columns: {
                                    id: true,
                                    username: true
                                }
                            }
                        }
                    },
                }
            })
        } catch (err: any) {
            logger.error("Impossible de récupérer le post: +", err.message);
            throw new Error("Le post ne peut pas être récupéré");
        }
    },

    update: (id: string, authorId: string, post: NewPost) => {
        try {
            return db.update(posts).set(post).where(
                and(
                    eq(posts.id, id),
                    eq(posts.author, authorId)
                )
            ).execute();
        } catch (err: any) {
            logger.error("Impossible d'update le post: +", err.message);
            throw new Error("Le post ne peut pas être màj");
        }
    }
}