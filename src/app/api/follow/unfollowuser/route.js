const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

import { removeFollow } from "@/utils/prisma/utils/followers"

export async function POST(request) {
    const { token, userId } = await request.json()
    if(!token || !userId) {
        return new Response(JSON.stringify({ message: "Missing paramaters "}), {
            status: 400
        })
    }

    try{
        const decoded = jwt.verify(token, jwtSecret)

        const unfollow = await removeFollow(decoded.userId, parseInt(userId))
        
        return new Response(JSON.stringify({ message: "sucess"}), {
            status: 200
        })
    } catch(error) {
        return new Response(JSON.stringify({ message: "Internal server error"}), {
            status: 500
        })
    }
}

export function GET() {
    return new Response(JSON.stringify({ message: "Method not allowed"}), {
        status: 405
    })
}