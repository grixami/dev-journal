import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY)

export async function sendEmail(to, subject, html) {
    try {
        const data = await resend.emails.send({
            from: "grixami <noreply@devjournal.lol>",
            to: to,
            subject: subject,
            html: html
        })
        return data
    } catch(error) {
        console.error(error)
        return null
    }
    
}