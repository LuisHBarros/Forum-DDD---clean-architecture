import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionRequest {
  title: string;
  content: string;
  authorId: string;
}

interface CreateQuestionResponse {
  question: Question;
}

export class CreateQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    title,
    content,
    authorId,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const objectAuthorId = new UniqueEntityID(authorId);
    const question = Question.create({
      authorId: objectAuthorId,
      title,
      content,
    });
    this.questionsRepository.create(question);

    return { question };
  }
}
