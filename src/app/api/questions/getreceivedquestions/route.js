import { getQuestionsByReciver } from "@/utils/prisma/utils/questions"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const token = searchParams.get("token")

    if(!token) {
        return new Response(JSON.stringify({ message: "missing token"}), {
            status: 400
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const reciverId = decoded.userId

        const questions = await getQuestionsByReciver(reciverId)

        return new Response(JSON.stringify(questions), {
            status: 200
        })
        
    } catch(error) {
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500
        })
    }
}

export function POST() {
    return new Response(JSON.stringify({ message: "method not allowed" }), {
        status: 405
    })
}