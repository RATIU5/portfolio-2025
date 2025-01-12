import fs from "node:fs/promises";

type MarkdownData<T extends object> = {
  frontmatter: T;
  file: string;
  url: string;
};

export const processContentInDir = async <T extends object, K>(
  contentType: "projects" | "blog",
  processFn: (data: MarkdownData<T>) => K,
  dir: string = process.cwd(),
) => {
  const files = await fs.readdir(dir + `/src/pages/${contentType}`);
  const markdownFiles = files
    .filter((file: string) => file.endsWith(".md"))
    .map((file) => file.split(".")[0]);
  const readMdFileContent = async (file: string) => {
    if (contentType === "projects") {
      const content = import.meta
        .glob(`/src/pages/projects/*.md`)
        [`/src/pages/projects/${file}.md`]();
      const data = (await content) as {
        frontmatter: T;
        file: string;
        url: string;
      };

      return processFn(data);
    } else {
      const content = import.meta
        .glob(`/src/pages/blog/*.md`)
        [`/src/pages/blog/${file}.md`]();
      const data = (await content) as {
        frontmatter: T;
        file: string;
        url: string;
      };

      return processFn(data);
    }
  };
  return await Promise.all(markdownFiles.map(readMdFileContent));
};

export const getShortDescription = (content: string) => {
  const splitByWord = content.split(" ");
  const length = splitByWord.length;
  return length > 20 ? splitByWord.slice(0, 20).join(" ") + "..." : content;
};

export const processArticleDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const monthSmall = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${monthSmall} ${day}, ${year}`;
};

export const generateSourceUrl = (
  sourceUrl: string,
  contentType: "projects" | "blog",
) => {
  return `https://ratiu5.dev/${contentType}/${sourceUrl}`;
};
