import { isBookmarked } from "@/utils/prisma/utils/bookmarks"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const postId = searchParams.get("postId")

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId

        const bookmarked = await isBookmarked(userId, parseInt(postId))

        return new Response(JSON.stringify({ bookmarkStatus: bookmarked }), {
            status: 200
        })

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Internal sever error" }), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({ message: "method not allowed" }), {
        status: 400
    })
}