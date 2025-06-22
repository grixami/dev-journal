import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function CreateUser(username, password) {
    const existingUser = await prisma.user.findUnique({
        where: { username }
    });

    if(existingUser) {
        throw new Error("Username exists already")
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    });

    console.log(newUser)
}