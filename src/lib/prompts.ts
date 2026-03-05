import { remark } from "remark";
import html from "remark-html";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type ApiPrompt = {
  id: string;
  slug: string;
  title: string;
  category_slug: string;
  difficulty: string | null;
  models: string[] | null;
  tags: string[] | null;
  body: string | null;
};

type PromptView = {
  slug: string;
  category: string;
  meta: { title?: string };
  html: string;
  promptText: string;
  description: string;
};

async function toPromptView(p: ApiPrompt): Promise<PromptView> {
  const body = p.body ?? "";
  const htmlContent = String(await remark().use(html).process(body));
  const description =
    body.split(/\n\n+/)[0]?.trim().slice(0, 160) ?? "";

  return {
    slug: p.slug.normalize("NFC"),
    category: p.category_slug,
    meta: { title: p.title },
    html: htmlContent,
    promptText: body,
    description,
  };
}

export async function getAllPrompts(): Promise<PromptView[]> {
  const res = await fetch(`${API_BASE}/prompts`, {
    // Cache for a short time; adjust as needed
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch prompts from API");
  }
  const data = (await res.json()) as ApiPrompt[];
  const views: PromptView[] = [];
  for (const p of data) {
    views.push(await toPromptView(p));
  }
  return views;
}

export async function getPromptsByCategory(
  category: string,
): Promise<PromptView[]> {
  const all = await getAllPrompts();
  return all.filter((p) => p.category === category);
}

export async function getPrompt(
  category: string,
  slug: string,
): Promise<PromptView | undefined> {
  const slugNfc = slug.normalize("NFC");
  const res = await fetch(`${API_BASE}/prompts/${encodeURIComponent(slugNfc)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    return undefined;
  }
  const data = (await res.json()) as ApiPrompt;
  const view = await toPromptView(data);
  if (view.category !== category) {
    return undefined;
  }
  return view;
}
