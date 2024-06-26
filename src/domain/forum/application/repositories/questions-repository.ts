import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
  getBySlug(slug: string): Promise<Question | null>;
  findById(id: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
