import { GenerateResetLink } from "@/utils/auth/authcode"
import { sendEmail } from "@/utils/auth/resend/sendemail"
import { createResetLink } from "@/utils/prisma/utils/auth"
import { checkUserEmail } from "@/utils/prisma/utils/users"

export async function POST(request) {
    const {email} = await request.json()

    if(!email) {
        return new Response(JSON.stringify({ message: "missing paramaters"}), {
            status: 400
        })
    }

    try {
        const emailExists = await checkUserEmail(email)
        if(!emailExists) {
            return new Response(JSON.stringify({ message: "email is not connected to an account"}), {
                status: 400
            })
        }

        const code = GenerateResetLink()

        const resetCode = await createResetLink(email, code)

        const fullUrl = new URL(request.url);
        const baseUrl = `${fullUrl.protocol}//${fullUrl.host}`
        const resetLink = `${baseUrl}/auth/setpassword?code=${code}`

        

        const sentEmail = await sendEmail(email, "Password Reset Link", 
            `<p> Please reset your password at <a href="${resetLink}">${resetLink}</a></p>`
        )

        return new Response(JSON.stringify({ message: "sucess" }), {
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