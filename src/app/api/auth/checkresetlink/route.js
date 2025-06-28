import { encrypt } from "@/utils/api/stringencryption"
import { checkResetCode, getResetEmail, getResetLink, updateUserPassword } from "@/utils/prisma/utils/auth"
import { getUserByEmail } from "@/utils/prisma/utils/users"


export async function POST(request) {
    const {code, password} = await request.json()

    if(!code || !password) {
        return new Response(JSON.stringify({ message: "missing code or password" }), {
            status: 400
        })
    }

    if(password.length < 8) {
        return new Response(JSON.stringify({ message: "password must be at least 8 characters long"}), {
            status: 400
        })
    }
    try {
        const codeExists = await checkResetCode(code)
        if(!codeExists) {
            return new Response(JSON.stringify({ message: "Invalid reset code" }), {
                status: 400
            })
        }

        
        const email = await getResetEmail(code)
        
        const user = await getUserByEmail(email)
        const userId = user.id

        

        const updatePass = await updateUserPassword(userId, encrypt(password))

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
    return new Response(JSON.stringify({ message: "method not allowed" }), {
        status: 405
    })
}