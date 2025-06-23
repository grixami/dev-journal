import { PrismaClient } from "@prisma/client"

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