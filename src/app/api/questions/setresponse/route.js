import { getSpecificQuestion, setQuestionResponse } from "@/utils/prisma/utils/questions"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const {token, questionId, responseMessage} = await request.json()

    if(!token || !questionId || !responseMessage) {
        return new Response(JSON.stringify({ message: "missing paramaters" }), {
            status: 400
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId

        const question = await getSpecificQuestion(questionId)

        if(question.receiverId != userId) {
            return new Response(JSON.stringify({ message: "no permission to make a response to this post"}), {
                status: 403
            })
        }

        const resp = await setQuestionResponse(parseInt(questionId), responseMessage)
 
        return new Response(JSON.stringify({ message: "success" }), {
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