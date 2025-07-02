const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

import { sendDiscohookPost } from "@/utils/discord/discohook";
import { createNewPost } from "@/utils/prisma/utils/posts";
import { getUserNoPass, getUserWebhook } from "@/utils/prisma/utils/users";

const tags = ["Other", "Robotics", "Cybersecurity", "Software Development"]

export async function POST(request) {
    try {

        const { token, title, desc, content, postType, tag } = await request.json();
        if(!token || !title || !desc || !content || !postType || !tag) {
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

        if(title.length > 50) {
            return new Response(JSON.stringify({message: "Title is too long, please make it under 50 characters"}), {
                status: 400
            })
        }

        if(!(tags.includes(tag))) {
            return new Response(JSON.stringify({message: "invalid tag"}), {
                status: 400
            })  
        }


        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.userId;


        const contentBase64 = Buffer.from(content).toString('base64');
        const descBase64 = Buffer.from(desc).toString('base64');

        const newPost = await createNewPost(userId, title, descBase64, contentBase64, parseInt(postType), tag)
        
        if(postType != 1) {
            return new Response({message: "sucess"}, {
                    status: 200
            })
        }

        const discohook = await getUserWebhook()

        if(!discohook) {
            return new Response({message: "sucess"}, {
                status: 200
            })
        }

        await sendDiscohookPost(discohook.discohook, `https://devjournal.lol/post/${newPost.id}/view`, newPost.title, desc, newPost.author.username, discohook.discohookcolor)

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