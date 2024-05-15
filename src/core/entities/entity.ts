import { UniqueEntityID } from "src/domain/forum/enterprise/entities/value-objects/unique-entity-id";

export class Entity<T> {
  private _id: UniqueEntityID;
  protected _createdAt: Date;

  protected props: T;

  get id() {
    return this._id;
  }
  get createdAt() {
    return this._createdAt;
  }

  protected constructor(props: any, id?: string) {
    this._id = new UniqueEntityID(id);
    this._createdAt = new Date();
    this.props = props;
  }
}
