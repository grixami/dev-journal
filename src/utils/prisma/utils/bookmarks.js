import prisma from "@/utils/prisma/client"

export async function setBookmarked(userId, postId) {

    const bookmark = await prisma.bookmark.create({
        data: {
            userId: userId,
            postId: postId
        }
    })
    return bookmark
}


export async function delBookmark(userId, postId) {
    const bookmark = await prisma.bookmark.delete({
        where: {
            postId_userId: {
                postId: postId,
                userId: userId
            }
        }
    })

    return bookmark
}

export async function getAllBookmarks(userId) {
    const bookmarks = await prisma.bookmark.findMany({
        where: {
            userId: userId
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    desc: true
                }   
            }
        }
    })

    return bookmarks
}

export async function isBookmarked(userId, postId) {
    const bookmark = await prisma.bookmark.findFirst({
        where: {
            userId: userId,
            postId: postId
        }
    })
    return bookmark
}