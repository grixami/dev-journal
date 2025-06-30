

import { getComments } from "@/utils/prisma/utils/comments"



export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id =  parseInt(searchParams.get("id"));

    try {
        const comments = await getComments(id)
        return new Response(JSON.stringify({ comments }), {
            status: 200
        })

    } catch(error) {
        return new Response(JSON.stringify({ message: "internal server error"}), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({ message: "Method not allowed"}), {
        status: 405
    })
}