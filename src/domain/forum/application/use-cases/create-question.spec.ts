import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";
import { CreateQuestion } from "./create-question";

let fakeQuestionsRepository: QuestionsRepository;
let sut: CreateQuestion;
describe("Create Question", () => {
  beforeEach(() => {
    fakeQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestion(fakeQuestionsRepository);
  });
  it("create a question", async () => {
    const id = new UniqueEntityID().toString();
    const question = await sut
      .execute({
        title: "Nova pergunta",
        content: "Conteúdo da pergunta",
        authorId: id,
      })
      .then((response) => response.question);

    expect(question.title).toEqual("Nova pergunta");
    expect(question.content).toEqual("Conteúdo da pergunta");
    expect(question.authorId.toString()).toEqual(id);
  });
});
