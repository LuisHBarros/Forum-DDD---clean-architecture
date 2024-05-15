import { Answer } from "src/domain/forum/enterprise/entities/answer";
import { AnswerRepository } from "src/domain/repositories/answers-repository";

export class InMemoryAnswersRepository implements AnswerRepository {
  private answers: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
  }
}
