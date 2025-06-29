

export async function sendDiscohookPost(webhookUrl, link, title, description, username, color) {
    try {
        const data = JSON.stringify({
            username: "devjournal.lol",
            content: `${username} has created a new post`,
            embeds: [
                {
                title: title,
                description: `${description}\n\n${link}`,
                color: color
                }
                
            ]
        })

        await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
    } catch(error) {
        console.log("error sending webhook message")
    }
}

export async function sendDiscordUpdate(webhookUrl, link, title, description, username, color) {
    try {
        const data = JSON.stringify({
            username: "devjournal.lol",
            content: `${username} has updated a post`,
            embeds: [
                {
                    title: title,
                    description: `${description}\n\n${link}`,
                    color: color
                }
            ]
        })

        await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
    } catch(error) {
        console.log("error sending webhook message")
    }
}