import { Slug } from "./slug";

test("Slug creation", () => {
  const slug = Slug.createFromText("Hello World");
  expect(slug.value).toBe("hello-world");
});
