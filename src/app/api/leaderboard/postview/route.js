import { getViewLb } from "@/utils/prisma/utils/posts"

export async function GET() {
    try {
        const posts = await getViewLb()
        return new Response(JSON.stringify(posts), {
            status: 200
        })
    } catch(error) {
        return new Response(JSON.stringify({ message: "internal server error"}), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({ message: "method not allowed"}), {
        status: 405
    })
}