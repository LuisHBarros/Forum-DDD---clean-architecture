import { Entity } from "src/core/entities/entity";
import { Slug } from "./value-objects/slug";
import { UniqueEntityID } from "./value-objects/unique-entity-id";
import dayjs from "dayjs";
import { Optional } from "src/core/entities/types/optional";

export interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  content: string;
  slug: Slug;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, "slug">, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      createdAt: new Date(),
    });

    return question;
  }
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get authorId() {
    return this.props.authorId;
  }
  get bestAnswerId() {
    return this.props.bestAnswerId || undefined;
  }
  get slug() {
    return this.props.slug;
  }
  get createdAt() {
    return this._createdAt;
  }
  get isNew(): boolean {
    return dayjs().diff(this._createdAt, "day") <= 3;
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
  set title(value: string) {
    this.props.title = value;
    this.touch();
    this.props.slug = new Slug(value);
  }
  set bestAnswerId(value: UniqueEntityID | undefined) {
    this.props.bestAnswerId = value;
    this.touch();
  }
}
