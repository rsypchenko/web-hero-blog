export default interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    image: string;
    created: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tags: string[];
  };
}
