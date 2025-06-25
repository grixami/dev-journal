import { getPostsWithTitle } from "@/utils/prismautils";

export async function GET(request) {
    try {
    const { searchParams } = new URL(request.url);
    const titleSearch = searchParams.get("title");
    const posts = await getPostsWithTitle(titleSearch) 
    return new Response(JSON.stringify(posts), {
        status: 200
    })
    } catch (error) {
        return new Response(JSON.stringify({message: "Internal Server Error"}), {
            status: 500
        })
    }
}

export async function POST() {
    return new Response(JSON.stringify({message: "method not allowed"}), {
        status: 405
    })
}