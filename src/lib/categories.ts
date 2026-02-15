import fs from "fs";
import path from "path";
import { CONTENT_DIR } from "./paths";

export function getCategoryTitle(slug: string): string {
  try {
    const categories = JSON.parse(
      fs.readFileSync(path.join(CONTENT_DIR, "categories.json"), "utf8"),
    ) as { slug: string; title: string }[];
    return categories.find((c) => c.slug === slug)?.title ?? slug;
  } catch {
    return slug;
  }
}
