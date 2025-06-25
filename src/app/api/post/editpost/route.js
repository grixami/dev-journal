
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET
import { getPost } from "@/utils/prismautils"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const token = searchParams.get('token')

    try {  
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId

        const post = await getPost(parseInt(id))
        if(post.authorId != userId) {
            return new Response(JSON.stringify({message: "No permission"}), {
                status: 403
            })
        }
        return new Response(JSON.stringify(post), {
            status: 200
        })


    } catch (error) {
        return new Response(JSON.stringify({message: "Internal server error"}), {
            status: 500
        })
    }
    


}

export function POST() {
    return new Response(JSON.stringify({message: "Method not allowed"}), {
        status: 405
    })
}