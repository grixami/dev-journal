import prisma from "@/utils/prisma/client"

export async function createNewPost(creator, title, desc, content, isPublic) {
    const newPost = await prisma.post.create({
        data: {
            title: title,
            desc: desc,
            content: content,
            isPublic: isPublic,
            authorId: creator
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
        take: 20
    })

    return posts
}

export async function getPostDrafts(userId) {
    const posts = await prisma.post.findMany({
        where: {
            authorId: userId,
            isPublic: 0
        }
    })

    return posts
}

export async function updatePost(id, title, desc, content, isPublic) {
    const post = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title: title,
            desc: desc,
            content: content,
            isPublic: isPublic
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