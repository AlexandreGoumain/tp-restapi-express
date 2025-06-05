import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { evaluations } from '../schemas';

export type Evaluation = InferSelectModel<typeof evaluations>;

export type NewEvaluation = InferInsertModel<typeof evaluations>;
