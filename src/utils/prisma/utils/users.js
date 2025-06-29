import prisma from "@/utils/prisma/client"
import { use } from "react";

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
            permissionlevel: true,
            email: false,
            _count: {
                select: {
                    followers: true,
                    following: true
                }
            }
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

export async function checkUserEmail(email) {
    const existingUser = await prisma.user.findUnique({
        where: {email: email}
    })


    return !!existingUser
    
}

export async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {email: email}
    })

    return user
    
}

export async function updateDiscohook(userId, webhookUrl) {
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            discohook: webhookUrl
        }
    })

    return user
}