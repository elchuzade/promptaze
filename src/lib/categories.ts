const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.promptaze.com";

export type Category = { slug: string; title: string };

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories from API");
  }
  return (await res.json()) as Category[];
}

export async function getCategoryTitle(slug: string): Promise<string> {
  try {
    const categories = await fetchCategories();
    return categories.find((c) => c.slug === slug)?.title ?? slug;
  } catch {
    return slug;
  }
}
