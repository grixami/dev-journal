import prisma from "@/utils/prisma/client"

export async function createNewPost(creator, title, desc, content, isPublic, tag) {
    const newPost = await prisma.post.create({
        data: {
            title: title,
            desc: desc,
            content: content,
            isPublic: isPublic,
            authorId: creator,
            postTag: tag
        },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })

    return newPost
    
}

export async function getPost(postId) {
    const post = await prisma.post.findFirst({
        where: {
            id: postId
        },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })
    return post
}

export async function getUserPosts(userId, includeDrafts) {
    const posts = await prisma.post.findMany({
        where: {
            authorId: userId,
            draft: includeDrafts,
            isPublic: 1
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return posts
}

export async function getPostsWithTitle(title) {
    const posts = await prisma.post.findMany({
        where: {
            title: {
                contains: title
            },
            isPublic: 1
        },
        take: 20,
        orderBy: {
            createdAt: "desc"
        }
    })

    return posts
}

export async function getPostDrafts(userId) {
    const posts = await prisma.post.findMany({
        where: {
            authorId: userId,
            isPublic: 0
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return posts
}

export async function updatePost(id, title, desc, content, isPublic, tag) {
    const post = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title: title,
            desc: desc,
            content: content,
            isPublic: isPublic,
            postTag: tag
        },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })
    return post
    
}

export async function deletePost(id) {
    const post = await prisma.post.delete({
        where: {
            id: id
        }
    })
    return post
    
}

export async function incrementPostViews(postId) {
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            views: {
                increment: 1
            }
        }
    })

    return updatePost
    
}

export async function getRecentPosts(start, count) {
    const posts = await prisma.post.findMany({
        skip: start,
        take: count,
        orderBy: {
            createdAt: "desc"
        }
    })
    return posts
}