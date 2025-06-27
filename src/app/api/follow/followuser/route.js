import { addFollow } from "@/utils/prisma/utils/followers"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const {token, userId} = await request.json()

    try{
        const decoded = jwt.verify(token, jwtSecret)

        if(decoded.userId == parseInt(userId)) {
            return new Response(JSON.stringify({ message: "you cannot follow yourself"}), {
                status: 400
            })
        }

        addFollow(decoded.userId, parseInt(userId))

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