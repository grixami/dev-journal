import { delBookmark, setBookmarked } from "@/utils/prisma/utils/bookmarks"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const { token, postId, bookmarkStatus } = await request.json()

    if(!token || !postId || bookmarkStatus == null) {
        return new Response(JSON.stringify({ message: "Missing paramaters" }), {
            status: 400
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId
        let bookmark

        if(bookmarkStatus) {
            bookmark = await setBookmarked(userId, parseInt(postId))
        } else {
            bookmark = await delBookmark(userId, parseInt(postId))
        }

        return new Response(JSON.stringify({ message: "sucess" }), {
            status: 200
        })

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500
        })
    }
    
}

export function GET() {
    return new Response(JSON.stringify({ message: "Method not allowed"}), {
        status: 405
    })
}