import { Answer } from "../../enterprise/entities/answer";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionData {
  questionId: string;
  authorId: string;
  content: string;
}

interface AnswerQuestionResponse {
  answer: Answer;
}

export class AnswerQuestion {
  constructor(private answersRepository: AnswersRepository) {}
  public async execute({
    questionId,
    authorId,
    content,
  }: AnswerQuestionData): Promise<AnswerQuestionResponse> {
    const objectAuthorId = new UniqueEntityID(authorId);
    const objectQuestionId = new UniqueEntityID(questionId);
    const answer = Answer.create({
      content,
      questionId: objectQuestionId,
      authorId: objectAuthorId,
    });
    this.answersRepository.create(answer);

    return { answer };
  }
}
