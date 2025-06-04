import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { comments } from "../schemas";

export type Comment = InferSelectModel<typeof comments>;

export type NewComment = InferInsertModel<typeof comments>;