"use client";

import Head from "next/head"
import LoginNav from "@/components/loginnav"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

function Contnent() {
    const searchParams = useSearchParams()

    const content = searchParams.get("content")
    return(
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <pre>{decodeURIComponent(content)}</pre>
            </div>
        </>
    )
}

export default function PostPreview() {
    return (
        <Suspense>
            <Contnent/>
        </Suspense>
    )
}