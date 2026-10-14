export type ContentItem = {
  id: string;
  title: string;
  type: string;
  url: string;
  publishedAt: string;
  author: string;
  space: string;
  excerpt: string;
  durationSeconds: number | null;
  thumbnailUrl: string | null;
};