import { AnswerQuestion } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";
import { InMemoryAnswersRepository } from "test/repositories/in_memory-answers-repository";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";

let fakeAnswersRepository: AnswersRepository;
let sut: AnswerQuestion;

describe("AnswerQuestion", () => {
  beforeEach(() => {
    fakeAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestion(fakeAnswersRepository);
  });
  it("should create an answer", async () => {
    const questionId = new UniqueEntityID().toString();
    const authorId = new UniqueEntityID().toString();
    const answer = await sut
      .execute({
        questionId,
        authorId,
        content: "Question content example",
      })
      .then((response) => response.answer);

    expect(answer.content).toEqual("Question content example");
    expect(answer.questionId.toString()).toEqual(questionId);
    expect(answer.authorId.toString()).toEqual(authorId);
  });
});
