import NewsPageContent from "@/components/news-page-content";
import { fetchAllPosts } from "@/lib/sanity/queries";

export default async function NewsPage() {
  const articles = await fetchAllPosts();
  return <NewsPageContent articles={articles} />;
}
