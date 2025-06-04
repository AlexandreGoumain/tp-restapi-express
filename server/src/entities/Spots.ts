import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { spots } from '../schemas';

export type Spot = InferSelectModel<typeof spots>;

export type NewSpot = InferInsertModel<typeof spots>;
