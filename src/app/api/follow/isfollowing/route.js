import { isFollowing } from "@/utils/prisma/utils/followers"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    let token = searchParams.get("token")
    let userId = parseInt(searchParams.get("userId"))

    if(!token || !userId) {
        return new Response(JSON.stringify({ message: "missing paramaters"} ), {
            status: 500
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const following = await isFollowing(decoded.userId, userId)
        return new Response(JSON.stringify({ message: "Sucess", isFollowing: following}), {
            status: 200
        })

    } catch(error) {
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500
        })
    }
    
}

export function POST() {
    return new Response(JSON.stringify({ message: "Method not allowed"}), {
        status: 405
    })
}