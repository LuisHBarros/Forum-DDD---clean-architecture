export class Slug {
  public value: string;
  constructor(value: string) {
    this.value = value;
  }
  /*
    Receives a string and returns a new Slug instance
    Example: Slug.createFromText('Hello World') // returns a new Slug instance with the value 'hello-world'
    */
  static createFromText(text: string) {
    const slugText = text
      .normalize("NFKC")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--/g, "-")
      .replace(/-$/g, "");

    return new Slug(slugText);
  }
}
