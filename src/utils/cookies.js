export function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieVal] = cookie.split("=");
        if(cookieName == name) {
            return cookieVal;
        }
    }
    return null;
}

export function cookieExists(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieVal] = cookie.split("=");
        if(cookieName == name) {
            return true;
        }
    }
    return false;
}