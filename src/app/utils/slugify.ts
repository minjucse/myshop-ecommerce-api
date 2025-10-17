import { Model } from 'mongoose';

type HasSlug = { slug: string };

/**
 * Generates a unique slug for a Mongoose model
 * @param model - Mongoose model
 * @param name - Name string to generate slug from
 * @returns unique slug
 */
export async function generateUniqueSlug<T extends HasSlug>(
  model: Model<T>,
  name: string
): Promise<string> {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      // spaces → hyphens
    .replace(/[^a-z0-9-]/g, ''); // remove special chars

  let counter = 1;
  let slug = `${base}-${counter}`;

  // Check for existing slugs in MongoDB
  while (await model.exists({ slug })) {
    counter++;
    slug = `${base}-${counter}`;
  }

  return slug;
}
