const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

import { getPost, updatePost } from "@/utils/prisma/utils/posts"

export async function POST(request) {
    try {

        const {content, desc, id, postType, title, token } = await request.json();
        if(id, !token || !title || !desc || !content || !postType) {
            return new Response(JSON.stringify({message: "Please fill in all fields"}), {
                status: 400
            })  
        }

        if(content.length > 10000) {
            return new Response(JSON.stringify({message: "Post longer than 10,000 characters, please shorten it"}), {
                status: 400
            })  
        }

        if(desc.length > 256) {
            return new Response(JSON.stringify({message: "Post longer than 256 characters, please shorten it"}), {
                status: 400
            })  
        }


        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.userId;

        const contentBase64 = Buffer.from(content).toString('base64');
        const descBase64 = Buffer.from(desc).toString('base64');
        const oldPost = await getPost(parseInt(id))

        if(oldPost.authorId != userId) {
            return new Response({message: "no permission"}, {
                status: 403
            })
        }
        const newPost = await updatePost(parseInt(id), title, descBase64, contentBase64, parseInt(postType))
        
        return new Response({message: "sucess"}, {
            status: 200
        })
    } catch (error) {
        return new Response({message: "Internal server error"}, {
            status: 500
        })
    }
}


export function GET() {
    return new Response({message: "Method not allowed"}, {
        status: 405
    })
}