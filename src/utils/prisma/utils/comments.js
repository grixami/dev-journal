import prisma from "@/utils/prisma/client";

export async function postComment(userId, content, postId) {
    const newComment = await prisma.comment.create({
        data: {
            content: content,
            authorId: userId,
            postId, postId
        }
    })

    return newComment
    
}

export async function getComments(postId) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId
        },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return comments
    
}