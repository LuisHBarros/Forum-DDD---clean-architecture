import { QuestionsRepository } from "src/domain/forum/application/repositories/questions-repository";
import { Question } from "src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private questions: Question[] = [];

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }
  async getBySlug(slug: string): Promise<Question | null> {
    return (
      this.questions.find((question) => question.slug.value === slug) || null
    );
  }
  async findById(id: string): Promise<Question | null> {
    return (
      this.questions.find((question) => question.id.toString() === id) || null
    );
  }
  async delete(question: Question): Promise<void> {
    const index = this.questions.findIndex((q) => q.id === question.id);
    this.questions.splice(index, 1);
  }
}
