const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

import { deletePost, getPost } from "@/utils/prismautils"

export async function POST(request) {
    const {token, id} = await request.json()
    if(!token || !id) {
        return new Response(JSON.stringify({message: "perameters missing"}),{
            status: 400
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const userId = decoded.userId
        const post = await getPost(parseInt(id))
        
        if(post.authorId != userId) {
            return new Response(JSON.stringify({message: "No permission"}), {
                status: 403
            })
        }
        const deletedPost = await deletePost(parseInt(id))
        return new Response(JSON.stringify({message: "sucess"}), {
            status: 200
        })
    } catch(error) {
        return new Response(JSON.stringify({message: "Internal server error"}), {
            status: 500
        })
    }
    
}

export function GET() {
    return new Response(JSON.stringify({message: "Method not allowed"}), {
        status: 405
    })
}