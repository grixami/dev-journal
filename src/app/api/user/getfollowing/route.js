import { getFollowing } from "@/utils/prisma/utils/followers"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get("id"))

    if(!id) {
        return new Response(JSON.stringify({ message: "missing id"}), {
            status: 400
        })
    }

    try {
        const following = await getFollowing(id)

        return new Response(JSON.stringify(following), {
            status: 200
        })
    } catch {
        return new Response(JSON.stringify({ message: "Internal serber error"}, {
            status: 500
        }))
    }
}

export async function POST() {
    return new Response(JSON.stringify({ message: "Method not allowed"}), {
        status: 405
    })
}