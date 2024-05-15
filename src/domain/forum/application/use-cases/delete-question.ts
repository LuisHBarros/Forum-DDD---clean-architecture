import { QuestionsRepository } from "../repositories/questions-repository";

interface deleteQuestionData {
    question_id: string;
    author_id: string;
}

export class DeleteQuestion {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute(data: deleteQuestionData) {
        const question = await this.questionsRepository.findById(
            data.question_id
        );
        if (!question) {
            throw new Error("Question not found");
        }
        if (question.authorId.toString() !== data.author_id) {
            throw new Error("You are not allowed to delete this question");
        }
        await this.questionsRepository.delete(question);
        return;
    }
}
