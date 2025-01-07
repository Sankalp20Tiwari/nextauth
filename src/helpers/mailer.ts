import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { randomBytes } from 'crypto'; // Import crypto to generate secure random tokens
export const sendEmail = async ({email,emailType,userId}:any) => {
    try{
        //TODO: configure mail for usage
       const hashedToken = await bcryptjs.hash(userId.toString(),10)
       const hashedPToken = randomBytes(32).toString('hex');
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000}})
        }

        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashedPToken,forgotPasswordTokenExpiry:Date.now() + 3600000}})
        }


        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "2c312f4327629b",
              pass: "ceda63c33e865c"
            }
          });

          const emailContent =
      emailType === "VERIFY"
        ? {
            subject: "Verify your email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.</p>
               <p>Or copy and paste the link below into your browser: <br>
               ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
          }
        : {
            subject: "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedPToken}">here</a> to reset your password.</p>
               <p>Or copy and paste the link below into your browser: <br>
               ${process.env.DOMAIN}/resetpassword?token=${hashedPToken}</p>`,
          };

          const mailOptions = {
            from: 'foo@example.com', 
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: emailContent.html
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    }
    catch(error:any){
        throw new Error(error.message)
    }
}