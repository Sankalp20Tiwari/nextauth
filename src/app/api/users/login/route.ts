import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest , NextResponse} from 'next/server';
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {email,password} = reqBody;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }
        console.log("User exists");
        const isPasswordCorrect = await bcryptjs.compare(password,user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({error:"Invalid credentials"},{status:400})
        }
        
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});
        console.log(token);

        const response = NextResponse.json({message:"Login success",sucess:true},{status:200})

        response.cookies.set("token",token,{httpOnly:true});
        return response
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}