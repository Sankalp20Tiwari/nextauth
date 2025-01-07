import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;

    // Validate token and password presence
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    console.log("Received token:", token);
    console.log("Received password:", password);

    // Attempt to find the user with the provided token
    const user = await User.findOne({
      forgotPasswordToken: token, // Direct comparison of plaintext token
    });

    if (!user) {
      console.log("No user found with the provided token.");
      return NextResponse.json(
        { error: "No user found with the provided token" },
        { status: 400 }
      );
    }

    console.log("User found:", { username: user.username, email: user.email });
    console.log("Token Expiry:", user.forgotPasswordTokenExpiry);
    console.log("Current time:", Date.now());

    // Check if the token is expired
    if (user.forgotPasswordTokenExpiry <= Date.now()) {
      console.log("Token has expired.");
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    // Proceed with password reset
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined; // Clear the reset token
    user.forgotPasswordTokenExpiry = undefined; // Clear the expiry
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during password reset:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


