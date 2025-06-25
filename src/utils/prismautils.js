import { PrismaClient } from "@prisma/client"
import { use } from "react";

const prisma = new PrismaClient();

export async function createUser(username, password) {
    const existingUser = await prisma.user.findUnique({
        where: { username: username }
    });

    if(existingUser) {
        throw new Error("Username exists already");
    }

    const newUser = await prisma.user.create({
        data: {
            //permissionlevel: 2,
            username: username,
            password: password,
        }
    });

    //console.log(newUser)
}


export async function getUserPassword(username) {
    const user = await prisma.user.findFirst({
        where: { username: username }
    });
    
    if(!user) {
        throw new Error("User does not exist");
    }
    return user.password;
}

export async function usernameToId(username) {
    const user = await prisma.user.findFirst({
        where: { username: username }
    });
    if(!user) {
        throw new Error("User does not exist");
    }
    return user.id
}

export async function getUserNoPass(id) {
    const user = await prisma.user.findFirst({
        where: {id: id},
        select: {
            id: true,
            password: false,
            username: true,
            bio: true,
            profilepic: true,
            createdAt: true,
            permissionlevel: true
        }
    });

    if(!user) {
        throw new Error("User does not exist");
    }
    return user;
}

export async function usernameToUserID(username) {
    const user = await prisma.user.findFirst({
        where: {username: username}
    });

    if(!user) {
        throw new Error("User does not exist");
    }

    return user.id;
}

export async function updateUserProfile(id, username, bio, pfp) {
    const user = await prisma.user.findFirst({
        where: {id: id}
    });

    if(!user) {
        throw new Error("User does not exist");
    }

    const existingUsername = await prisma.user.findFirst({
        where: {
            username: username,
            NOT: { id: id }, // dont inclue current user
        },
    });

    if (existingUsername) {
        throw new Error("Username is already taken");
    }
    const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
            username: username,
            bio: bio,
            profilepic: pfp
        },
    });

    return updatedUser;
}

export async function updateUserPassword(id, password) {
    const user = await prisma.user.findFirst({
        where: { id: id }
    })

    if(!user) {
        throw Error("User does not exist")
    }

    const newUser = prisma.user.update({
        where: { id: id },
        data: {
            password: password
        }
    })

    return newUser
}

export async function getUsersStartsWith(usernameStart, pfp) { // for searching
    const users = await prisma.user.findMany({
        where: {
            username: {
                startsWith: usernameStart
            }
        }, 
        select: {
            username: true,
            bio: true,
            id: true,
            profilepic: pfp
        },
        take: 50
    })  

    if(users.length == 0) {
        return null
    }

    return users;
}

export async function checkUserAdmin(id) {
    const user = await prisma.user.findFirst({
        where: { id: id},
        select: { permissionlevel: true }
    })
    
    if(!user) {
        throw Error("User does not exist")
    }
    if(user.permissionlevel != 2 ) {
        return false
    }
    return true
}

export async function deleteUser(id) {
    const user = await prisma.user.delete({
        where: { id: id},
        select: { permissionlevel: true }
    })
}


export async function updatePermissionLevel(id, permissionlevel) {
    const user = await prisma.user.findFirst({
        where: { id: id }
    })

    if(!user) {
        throw Error("User does not exist")
    }

    const newUser = await prisma.user.update({
        where: { id: id },
        data: {
            permissionlevel: permissionlevel
        }
    })

    return newUser
}


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