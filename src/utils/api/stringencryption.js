import bcrypt from "bcryptjs"

const saltRounds = 10

export function encrypt(text) {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(text, salt)
}

export function compare(text, hash) {
    return bcrypt.compareSync(text, hash)
}