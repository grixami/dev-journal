import { delQuestion, getSpecificQuestion } from "@/utils/prisma/utils/questions"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const {token, questionId} = await request.json()

    if(!token || !questionId) {
        return new Response(JSON.stringify({ message: "missing paramaters" }), {
            status: 400
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId

        const question = await getSpecificQuestion(parseInt(questionId))

        if(userId != question.senderId || userId != question.receiverId) {
            return new Response(JSON.stringify({ message: "you dont have permission to delete this"}), {
                status: 403
            })
        }

        const deletedQuestion = await delQuestion(parseInt(questionId))

        return new Response(JSON.stringify({message : "sucess"}), {
            status: 200
        })
    } catch(error) {
        return new Response(JSON.stringify({ message: "internal server error" }), {
            status: 500
        })
    }
}

export function GET() {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
        status: 405
    })
}