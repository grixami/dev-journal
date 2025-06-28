import { getAuthCode } from "@/utils/prisma/utils/auth"


export async function POST(request) {
    const { code, email} = await request.json()

    if(!code || !email) {
        return new Response(JSON.stringify({ message: "missing paramaters"}), {
            status: 400
        })
    }

    try {
        const authCode = await getAuthCode(email)
        const trimmedCode = code.trim()
        
        if(authCode != trimmedCode) {
            return new Response(JSON.stringify({ message: "incorrect code"}), {
                status: 400
            })
        }


        return new Response(JSON.stringify({ message: "sucess"}), {
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error"}), {
            code: 500
        })
    }
}

export function GET() {
    return new Response(JSON.stringify({ message: "method not allowd"}), {
        status: 405
    })
}