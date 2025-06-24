"use cleint";


import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm"
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
            .use(gfm)
            .use(html)
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
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    )
}