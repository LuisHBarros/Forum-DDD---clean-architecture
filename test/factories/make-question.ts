import { faker } from "@faker-js/faker";
import {
  Question,
  QuestionProps,
} from "src/domain/forum/enterprise/entities/question";
import { UniqueEntityID } from "src/domain/forum/enterprise/entities/value-objects/unique-entity-id";

export async function makeQuestion(override: Partial<QuestionProps>) {
  return Question.create({
    authorId: new UniqueEntityID(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    ...override,
  });
}
