"use cleint";


import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { useEffect, useState } from "react";

export default function RenderMarkdown({contentParam}) {
  const [contentHtml, setContentHtml] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function processContent() {
      try {
        if (contentParam) {
          const decodedContent = decodeURIComponent(contentParam);
          const matterResult = matter(decodedContent);
          const processed = await remark()
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkRehype)
            .use(rehypeKatex)
            .use(rehypePrettyCode, {
              transformers: [
                transformerCopyButton({
                  visibility: 'always',
                  feedbackDuration: 3_000,
                })
              ]
            })
            .use(rehypeStringify)
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings, {
              behavior: "append",
              properties: { class: "heading-anchor"}
            })
            .process(matterResult.content);
          setContentHtml(processed.toString());
        }
      } catch (err) {
        console.error("Error processing content, ", err);
        setError("Failed to load content");
      }
    }
    processContent();
  }, [contentParam]);

  if (error) {
    return <p>{error}</p>;
  }

    return (
      
        <div className="prose prose-invert">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
          />
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    )
}