const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

import { postComment } from "@/utils/prisma/utils/comments"

export async function POST(request) {
    const { token, content, postId } = await request.json()

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId

        const comment = await postComment(userId, content, parseInt(postId))
       
        return new Response(JSON.stringify({ message: "sucess" }), {
            status: 200
        })
    } catch(error) {
        return new Response(JSON.stringify({ message: "internal server error" }), {
            status: 500
        })
    }
}


export function GET() {
    return new Response(JSON.stringify({ message: "Method not allowed"}), {
        status: 405
    })
}