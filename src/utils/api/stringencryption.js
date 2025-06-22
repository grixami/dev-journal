import bcrypt from "bcryptjs"

const saltRounds = 10

export async function encrypt(text) {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(text, salt)
}

export async function compare(text, hash) {
    return bcrypt.compareSync(text, hash)
}