import { getAllBookmarks } from "@/utils/prisma/utils/bookmarks"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId
        
        const bookmarks = await getAllBookmarks(userId)

        return new Response(JSON.stringify({ bookmarks: bookmarks}))

    } catch(error) {
        return new Response(JSON.stringify({ message: "internal server error" }), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
        status: 405
    })
}