import { QuestionsRepository } from "../repositories/questions-repository";

interface deleteQuestionData {
  id: string;
}

export class DeleteQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(data: deleteQuestionData) {
    const question = await this.questionsRepository.findById(data.id);
    if (!question) {
      throw new Error("Question not found");
    }
    await this.questionsRepository.delete(question);
    return;
  }
}
