import { updateQuestionStatus } from "@/utils/prisma/utils/users"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const { token, allowQuestions} = await request.json()

    if(!token || allowQuestions == null) {
        console.log(token, allowQuestions)
        return new Response(JSON.stringify({ message: "missing paramaters" }), {
            status: 400
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId

        const status = await updateQuestionStatus(userId, parseInt(allowQuestions))

        return new Response(JSON.stringify({ message: "sucess" }), {
            status: 200
        })
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "internal server error"}), {
            status: 500
        })
    }
}

export function GET() {
    return new Response(JSON.stringify({message: "method not allowed"}), {
        status: 405
    })
}