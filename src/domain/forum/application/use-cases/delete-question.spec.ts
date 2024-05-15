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
        expect(
            await sut.execute({
                question_id: question.id.toString(),
                author_id: question.authorId.toString(),
            })
        ).toBeUndefined();
    });
    it("should throw an error if question does not exist", async () => {
        expect(
            sut.execute({
                question_id: "non-existent-id",
                author_id: "non-existent-id",
            })
        ).rejects.toThrow("Question not found");
    });
    it("should throw an error if user is not the author of the question tries to delete it", async () => {
        const question = await makeQuestion({});
        await fakeQuestionsRepository.create(question);
        expect(
            sut.execute({
                question_id: question.id.toString(),
                author_id: "non-existent-id",
            })
        ).rejects.toThrow("You are not allowed to delete this question");
    });
});
