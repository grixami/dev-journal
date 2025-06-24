"use client";

import Head from "next/head";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm"
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RenderMarkdown from "@/components/md/mdrender";

function Content() {
  const searchParams = useSearchParams();
  const contentParam = searchParams.get("content");

  return (
    <div className="p-10">
        <RenderMarkdown contentParam={contentParam}/>
    </div>
  );
}

export default function PostPreview() {
  return (
    <>
      <Head>
        <title>dev-journal</title>
        <meta name="description" content="A Blogging Site For Devs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Suspense fallback={<p>Loading preview...</p>}>
        <Content />
      </Suspense>
    </>
  );
}
