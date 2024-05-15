import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { GetQuestionBySlug } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let fakeQuestionsRepository: QuestionsRepository;
let sut: GetQuestionBySlug;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    fakeQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlug(fakeQuestionsRepository);
  });
  it("should get a question by slug", async () => {
    const questionMake = await makeQuestion({ slug: new Slug("test-slug") });
    await fakeQuestionsRepository.create(questionMake);
    const question = await sut
      .execute({
        slug: "test-slug",
      })
      .then((response) => response.question);

    expect(question.slug.value).toEqual("test-slug");
  });
  it("should throw an error if question does not exist", async () => {
    expect(sut.execute({ slug: "non-existent-slug" })).rejects.toThrow(
      "Question not found"
    );
  });
});
