import prisma from "@/utils/prisma/client"

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