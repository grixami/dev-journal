import { getPostCountLeaderboard } from "@/utils/prisma/utils/users"

export async function GET() {
    try {
        const users = await getPostCountLeaderboard()

        return new Response(JSON.stringify(users), {
            status: 200
        })
    } catch(error) {
        return new Response(JSON.stringify({ message: "internal server error"}), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({ message: "method not allowed" }), {
        status: 405
    })
}