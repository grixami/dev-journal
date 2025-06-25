const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

import { createNewPost } from "@/utils/prisma/utils/posts";

export async function POST(request) {
    try {

        const { token, title, desc, content, postType } = await request.json();
        if(!token || !title || !desc || !content || !postType) {
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

        const newPost = await createNewPost(userId, title, descBase64, contentBase64, parseInt(postType))
        
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