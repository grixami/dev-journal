import prisma from "@/utils/prisma/client"

export async function makeQuestion(senderId, receiverId, content) {
    const newQuestion = await prisma.question.create({
        data: {
            senderId: senderId,
            receiverId: receiverId,
            question: content
        }
    })

    return newQuestion
}

export async function delQuestion(questionId) {
    const deletedQuestion = await prisma.question.delete({
        where: {
            id: questionId
        }
    })
    
    return deletedQuestion
}

export async function getQuestionsByReciver(recieverId) {
    const reciverQuestions = await prisma.question.findMany({
        where: {
            receiverId: recieverId
        },
        include: {
            sender: {
                select: {
                    username: true
                }
            }
        }
    })

    return reciverQuestions
}

export async function getQuestionBySender(senderId) {
    const senderQuestions = await prisma.question.findMany({
        where: {
            senderId: senderId
        },
        include: {
            receiver: {
                select: {
                    username: true
                }
            }
        }
    })
    
    return senderQuestions
}

export async function setQuestionResponse(questionId, responseText) {
    const updatedQuestion = await prisma.question.update({
        where: {
            id: questionId
        },
        data: {
            response: responseText
        }
    })
    
    return updatedQuestion
}

export async function getSpecificQuestion(questionId) {
    const specificQuestion = await prisma.question.findUnique({
        where: {
            id: questionId
        }
    })

    return specificQuestion
}

export async function getQuestionBySenderAndReciver(senderId, recieverId) {
    const questionsBySenderAndReciver = await prisma.question.findMany({
        where: {
            senderId: senderId,
            recieverId: recieverId
        }
    })

    return questionsBySenderAndReciver
}