import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { favorites } from '../schemas';

export type Favorite = InferSelectModel<typeof favorites>;

export type NewFavorite = InferInsertModel<typeof favorites>;
