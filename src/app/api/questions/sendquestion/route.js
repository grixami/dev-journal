import { makeQuestion } from "@/utils/prisma/utils/questions"
import { getUserNoPass } from "@/utils/prisma/utils/users"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const {token, reciverId, content} = await request.json()
    
    if(!token || !reciverId || !content) {
        return new Response(JSON.stringify({ message: "missing paramaters" }), {
            status: 400
        })
    }

    if(content.length > 2000) {
        return new Response(JSON.stringify({ message: "please make your question less than 2000 characters"}), {
            status: 400
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const senderId = decoded.userId

        const user = await getUserNoPass(parseInt(reciverId))
        if(!(user.allowquestions)) {
            return new Response(JSON.stringify({ message: "User does not allow questions" }), {
                status: 403
            })
        }

        const question = await makeQuestion(senderId, parseInt(reciverId), content)
        
        return new Response(JSON.stringify({ message: "sucess" }), {
            status: 200
        })

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500
        })
    }
}

export function GET() {
    return new Response(JSON.stringify({ message: "method not allowed"}), {
        status: 405
    })
}