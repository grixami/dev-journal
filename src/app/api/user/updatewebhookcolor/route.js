import { updateDiscohookColor } from "@/utils/prisma/utils/users"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const {token, color} = await request.json()

    if(!token || !color) {
        return new Response(JSON.stringify({message: "mising paramaters"}), {
            status: 400
        })
    }

    try {
       const decoded = jwt.verify(token, jwtSecret) 
       const userId = decoded.userId
       const user = await updateDiscohookColor(userId, color)

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