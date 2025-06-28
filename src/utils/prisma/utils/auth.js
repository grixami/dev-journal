import prisma from "@/utils/prisma/client"

export async function createUser(username, password, email) {
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
            email: email
        }
    });

    return newUser
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

export async function createAuth(email, code) {
    
    const auth = await prisma.authcode.upsert({
        where: {email: email},
        create: {
            email: email,
            code: code
        },
        update: { code: code }
    })
    return auth
}

export async function createResetLink(email, code) {
    const resetLink = await prisma.resetcode.upsert({
        where: {email: email},
        create: {
            email: email,
            code: code
        },
        update: { code: code}
    })
    return resetLink
}

export async function getAuthCode(email) {

    const code = await prisma.authcode.findUnique({
        where: { email: email },
        select: {
            code: true
        }
    })

    return code?.code // returns only the code as an str
    
}

export async function getResetLink(email) {
    const resetLink = await prisma.authcode.findUnique({
        where: { email: email},
        select: {
            code: true
        }
    })

    return resetLink?.code
}

export async function getResetEmail(code) {
    
    const resetcode = await prisma.resetcode.findFirst({
        where: { code: code}
    })
    return resetcode?.email
}

export async function checkResetCode(code) {
    const resetcode = await prisma.resetcode.findFirst({
        where: { code: code }
    })
    
    return !!resetcode
}