import { Model } from "mongoose";

type HasSlug = { slug: string };

export async function generateUniqueSlug<T extends HasSlug>(
  model: Model<T>,
  value: string
): Promise<string> {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  let slug = base;
  let counter = 1;

  while (await model.exists({ slug })) {
    slug = `${base}-${counter++}`;
  }

  return slug;
}
