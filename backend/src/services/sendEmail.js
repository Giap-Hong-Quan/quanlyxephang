import { mailer } from "../config/nodeMailer.js";

export const sendEmail =async ({to,subject,html})=>{
    try {
        await mailer.sendMail(
            {
                from: `"QUẢN LÝ XẾP HẠNG" <${process.env.EMAIL_USERNAME}>`,
                to,
                subject,
                html,
            }
        )
        return true;
    } catch (error) {
        console.error("Gửi email lỗi:", error);

    }
}