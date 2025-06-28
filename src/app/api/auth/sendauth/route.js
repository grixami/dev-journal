import { GenerateAuthCode } from "@/utils/auth/authcode"
import { sendEmail } from "@/utils/auth/resend/sendemail"
import { createAuth } from "@/utils/prisma/utils/auth"
import { checkUserEmail } from "@/utils/prisma/utils/users"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    const {email} = await request.json()

    if(!email) {
        return new Response(JSON.stringify({ message: "missing params"}), {
            status: 400
        })
    }

    try {
        const emailExists = await checkUserEmail(email)
        
        if(emailExists) {
            return new Response(JSON.stringify({ message: "email in use"}), {
                status: 400
            })
        }
        const code = GenerateAuthCode()
        
        const auth = await createAuth(email, code) // code is a string incase i switch to alphanumeric auth later on

        const sentEmail = await sendEmail(email, "Dev Journal Auth Code", `<p><b>${code}</b> is your authentication code</p>`)

        return new Response(JSON.stringify({ message: "sucess"}), {
            status: 200
        })

    } catch(error) {
        return new Response(JSON.stringify({ message: "internal server error"}), {
            status: 500
        })

    }
}

export function GET() {
    return new Response(JSON.stringify({ message: "method not allowed"}), {
        status: 405
    })
}