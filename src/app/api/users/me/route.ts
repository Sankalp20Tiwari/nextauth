import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest , NextResponse} from 'next/server';
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect()

export async function GET(request:NextRequest) {
    try{
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry -createdAt -updatedAt -__v");
        if(!user) return NextResponse.json({error:"User does not exist"},{status:400});
        return NextResponse.json({message:"user found",data:user},{status:200})
          
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
    
}