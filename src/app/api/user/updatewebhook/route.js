import { updateDiscohook } from "@/utils/prisma/utils/users"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const { token, discohook } = await request.json()
    
    if(!discohook || !token) {
        return new Response(JSON.message({ message: "missing params"}), {
            status: 400
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId
        const user = await updateDiscohook(userId, discohook)
        
        return new Response(JSON.stringify({ message: "Sucess" }), {
            status: 200
        })
    } catch(error) {
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500
        })
    }
}

export function GET() {
    return new Response(JSON.stringify({message: "method not allowed"}), {
        status: 405
    })
}