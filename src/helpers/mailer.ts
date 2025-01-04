import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
export const sendEmail = async ({email,emailType,userId}:any) => {
    try{
        //TODO: configure mail for usage
       const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000})
        }

        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000})
        }


        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "2c312f4327629b",
              pass: "ceda63c33e865c"
            }
          });

          const mailOptions = {
            from: 'foo@example.com', 
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "Verify your email" : "Reset your password"} or copy paster link in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, 
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    }
    catch(error:any){
        throw new Error(error.message)
    }
}