import type { Article } from "../types/news";


export const MOCK_ARTICLES: Article[] = [
  {
    title: "The Future of Web Development in 2026",
    description: "Discover the latest trends in frontend frameworks and how AI is changing the coding landscape.",
    content: "Full content of the article would go here. GNews provides a snippet in the free version...",
    url: "https://example.com/tech-2026",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-01-08T10:00:00Z",
    source: { name: "TechCrunch", url: "https://techcrunch.com" }
  },
  {
    title: "Global Markets Rally Amid Economic Growth",
    description: "Stock markets across Europe and Asia saw significant gains this morning as inflation fears ease.",
    content: "Detailed financial report content...",
    url: "https://example.com/finance-news",
    image: "https://images.unsplash.com/photo-1611974714658-058e11ee906c?q=80&w=1000&auto=format&fit=crop",
    publishedAt: "2026-01-08T09:30:00Z",
    source: { name: "Reuters", url: "https://reuters.com" }
  }
];