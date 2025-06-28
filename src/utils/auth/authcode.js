export function GenerateAuthCode() {
    return getRandomInt(100000, 999999).toString()
}

export function GenerateResetLink() {
    return getRandomString(40)
}

function getRandomString(length) {
    const letters = "abcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for(let i = 0;  i < length; i++) {
        const letter = getRandomInt(0, letters.length - 1)
        result += letters[letter]
    }
    return result

}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
}