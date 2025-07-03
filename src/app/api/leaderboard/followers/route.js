import { getFolowerLeaderboard } from "@/utils/prisma/utils/users"

export async function GET() {
    try {
        const users = await getFolowerLeaderboard()
        return new Response(JSON.stringify(users), {
            status: 200
        })

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Internal server error"}), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({ message: "method not allowed"}), {
        status: 405
    })
}