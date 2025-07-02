import { getRecentPosts } from "@/utils/prisma/utils/posts"



export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const from = searchParams.get("from")
    const count = searchParams.get("count")
    
    if(!from || !count) {
        return new Response(JSON.stringify({message: "missing parameters"}), {
            status: 400
        })
    }

    if(parseInt(count > 30)) {
        return new Response(JSON.stringify({ message: "you can get a maximum of 30 posts at once"}), {
            status: 400
        })
    }

    try {
        const posts = await getRecentPosts(parseInt(from), parseInt(count))

        return new Response(JSON.stringify(posts), {
            status: 200
        })

    } catch(error) {
        return new Response(JSON.message({ message: "Internal server error"}), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({message: "method not allowed"}), {
        status: 405
    })
}