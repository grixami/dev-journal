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
            createdAt: true
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

export async function getUsersStartsWith(usernameStart) { // for searching
    const users = await prisma.user.findMany({
        where: {
            username: {
                startsWith: usernameStart
            }
        }
    })  

    if(users.length == 0) {
        return null
    }

    return users;
}