export default class Post {
  id: string;
  title: string;
  html: string;
  excerpt: string;
  author: string;
  categories: string[];
  date: Date;
  tags: string[];

  constructor(data: MarkdownRemarkNode) {
    const { id, html, excerpt, frontmatter } = data;
    const { author, categories, date, tags, title } = frontmatter;
    this.id = id;
    this.title = title;
    this.html = html;
    this.excerpt = excerpt;
    this.author = author;
    this.categories = categories.split(" ");
    this.date = date;
    this.tags = tags.split(" ");
  }
}
