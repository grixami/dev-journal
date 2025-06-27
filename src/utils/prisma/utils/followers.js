import prisma from "@/utils/prisma/client"

export async function addFollow(followerId, followingId) {
    const existingFollow = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: followerId,
                followingId: followingId
            }
        }
    })

    if(existingFollow) {
        return existingFollow
    }

    const {newFollow} = await prisma.follow.create({
        data: {
            followerId: followerId,
            followingId: followingId
        }
    })
    
    return newFollow
}

export async function removeFollow(followerId, followingId) {
    const removedFollow = await prisma.follow.delete({
        where: {
            followerId_followingId: {
                followerId : followerId,
                followingId: followingId
            }
        }
    })
    return removedFollow
}

export async function isFollowing(followerId, followingId) {
    const follow = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: followerId,
                followingId: followingId
            }
        }
    })
    return !!follow
        
}

export async function getFollowers(userId) {
    const followers = await prisma.follow.findMany({
        where: {
            followingId: userId
        },
        include: {
            follower: {
                select: {
                    username: true,
                    id: true,
                    profilepic: true,
                    bio: true
                }
            }
        }
    })

    return followers
}

export async function getFollowersCount(userId) {
    const count = await prisma.follow.count({
        where: {
            followingId: userId
        }
    })

    return count
}

export async function getFollowing(userId) {
    const following = await prisma.follow.findMany({
        where: {
            followerId: userId
        },
        include: {
            following: {
                select: {
                    username: true,
                    id: true,
                    profilepic: true,
                    bio: true
                }
            }
        }
    })

    return following
}

export async function getFollowingCount(userId) {
    const count = await prisma.follow.count({
        where: {
            followerId: userId
        }
    })
}