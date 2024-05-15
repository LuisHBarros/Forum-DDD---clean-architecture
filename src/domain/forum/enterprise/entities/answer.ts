import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface AnswerProps {
  authorId: UniqueEntityID;
  content: string;
  questionId: UniqueEntityID;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  static create(props: AnswerProps, id?: UniqueEntityID) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    });

    return answer;
  }
  get content() {
    return this.props.content;
  }
  get authorId() {
    return this.props.authorId;
  }
  get questionId() {
    return this.props.questionId;
  }
  get createdAt() {
    return this._createdAt;
  }

  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
  set content(value: string) {
    this.props.content = value;
    this.touch();
  }
}
