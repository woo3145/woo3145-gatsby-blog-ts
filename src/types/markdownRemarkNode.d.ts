interface MarkdownRemarkNode {
  id: string;
  html: string;
  excerpt: string;
  tableOfContents: string;
  frontmatter: {
    author: string;
    categories: string;
    date: Date;
    tags: string;
    title: string;
  };
}
