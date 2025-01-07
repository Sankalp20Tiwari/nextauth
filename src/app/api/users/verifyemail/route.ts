import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest , NextResponse} from 'next/server';

connect()

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        let {token} = reqBody;
        console.log("Encoded token received:", token); // Log the encoded token

        token = decodeURIComponent(token);
        console.log("Decoded token:", token); // Log the decoded token

        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        console.log(user);
        
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        const result = await user.save();
        console.log(result);
        console.log('User verification result:', result);
        return NextResponse.json({message:"Email verified successfully",success:true},{status:200})
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}