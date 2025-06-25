import { getPost } from "@/utils/prismautils";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        let id = searchParams.get("id");
        id = parseInt(id)
        const post = await getPost(id)
        if(post.isPublic == 0) {
            return new Response({message: "Post is a draft, not public"}, {
                status: 404
            })
        }
        return new Response(JSON.stringify(post), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
    return new Response({message: "Internal server error"}, {
        status: 500
    })  
    }
}

export function POST() {
    return new Response(JSON.stringify({message: "Method not allowed"}), {
        status: 405
    })
}