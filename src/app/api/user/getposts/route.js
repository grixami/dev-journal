import { getUserPosts } from "@/utils/prismautils";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "No userId provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const posts = await getUserPosts(parseInt(id))
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
      return new Response(JSON.stringify({message:"Internal server error"}), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
}

export async function POST() {
  return new Response(JSON.stringify({message: "Method not allowed"}), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}