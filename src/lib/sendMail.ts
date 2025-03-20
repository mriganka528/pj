
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
function extractUsername(email: string) {
    return email.split("@")[0];
}

export async function sendMail(
    email: string,
    subject: string,
    message: string
) {

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.email",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NEXT_PUBLIC_APP_USER,
                pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: {
                name: "BulletinX",
                address: "mrj21012003@gmail.com"
            },
            to: email,
            subject: subject,
            html: `
              <div
    style="max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); text-align: center; margin: auto;">
    <h1 style="color: #d9534f;">⚠️ Important Notification ⚠️</h1>
    <p style="font-size: 1rem; color: #333;">Dear <strong>${extractUsername(email)}</strong>,</p>

    <p style="font-size: 1rem; color: #555;">You have received an important message from the <strong>BulletinX</strong>
        admin team. Please review it as soon as possible.</p>

    <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">

    <div style="text-align: left;">
        <p style="font-size: 1.1rem; color: #333;"><strong>Message Details:</strong></p>
        <blockquote
            style="font-size: 1rem; font-style: italic; background: #f9f9f9; padding: 15px; border-left: 4px solid #d9534f; color: #444;">
            ${message}
        </blockquote>
    </div>

    <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">

    <p style="font-size: 1rem; color: #555;">
        If any action is required, please respond immediately or contact our support team.
    </p>

    <a href="mailto:support@bulletinx.com"
        style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #d9534f; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Contact Support
    </a>

    <p style="font-size: 1rem; font-weight: bold; color: #333; margin-top: 20px;">Team BulletinX</p>

    <p style="font-size: 0.9rem; color: #888; margin-top: 10px;">Need urgent support? <a
            href="mailto:support@bulletinx.com" style="color: #4A90E2; text-decoration: none;">Contact us here</a></p>

</div>           
            ` ,
        });
        return NextResponse.json(
            {
                success: true,
                message: "Message sent Successfully"
            },
            {
                status: 250
            }
        )

    }
    catch (emailError) {
        console.log("Error sending email", emailError)

        return NextResponse.json(
            {
                success: false,
                message: "Failed to send message"
            },
            {
                status: 500
            }
        )
    }
}