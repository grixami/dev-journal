import { getFollowers } from "@/utils/prisma/utils/followers"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get("id"))

    if(!id) {
        return new Response(JSON.stringify({message: "missing id"}), {
            status: 400
        })
    }

    try {

        const followers = await getFollowers(id)

        return new Response(JSON.stringify(followers), {
            status: 200
        })

    } catch(error) {
        return new Response(JSON.stringify("Internal server error"), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({ message: "method not allowed"}), {
        status: 200
    })
}