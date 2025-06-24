const jwt = require("jsonwebtoken");
import { checkUserAdmin, deleteUser, updatePermissionLevel } from "@/utils/prismautils";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    return new Response(JSON.stringify({ message: "JWT secret not configured" }), {
        status: 500
    });
}

export async function POST(request) {
    try {
        const { action, user, token } = await request.json();
        if(!action || !user || !token) {
            return new Response(JSON.stringify({message: "Missing perameters"}), {
                status: 400
            })  
        }
        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.userId;

        const isAdmin = await checkUserAdmin(userId);
        if (!isAdmin) {
        return new Response(
            JSON.stringify({ message: "You must be an admin" }),
            { status: 403 }
        );
        }

        switch(action) {
            case "ban":
                await deleteUser(parseInt(user)) // "user" is the id of the user
                break;
            
            case "adminify":
                await updatePermissionLevel(parseInt(user), 2)
                break;
            default:
                return new Response(JSON.stringify({ message: "Unknown action" }), {
                    status: 400
                });

        }

        return new Response(JSON.stringify({message: "Sucess"}), {
            status: 200
        })  

    } catch (error) {
        return new Response(JSON.stringify({message: "Internal Server Error"}), {
            status: 500
        })  
    }


}




export async function GET() {
    return new Response(JSON.stringify({message: "Method not allowded"}), {
        status: 405
    })
}