import { before } from "node:test";
import { DeleteQuestion } from "./delete-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestion } from "./create-question";
import { makeQuestion } from "test/factories/make-question";

let fakeQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestion;

describe("Delete Question", () => {
  beforeEach(() => {
    fakeQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestion(fakeQuestionsRepository);
  });
  it("should delete a question", async () => {
    const question = await makeQuestion({});
    await fakeQuestionsRepository.create(question);
    expect(await sut.execute({ id: question.id.toString() })).toBeUndefined();
  });
  it("should throw an error if question does not exist", async () => {
    expect(sut.execute({ id: "non-existent-id" })).rejects.toThrow(
      "Question not found"
    );
  });
});
