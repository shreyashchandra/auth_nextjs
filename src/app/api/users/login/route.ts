import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    // Taking input
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // TODO: Add validation for username, email, and password
    console.log(reqBody);
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist", success: false },
        { status: 400 }
      );
    }
    console.log(user);

    const validPassowrd = await bcryptjs.compare(password, user.password);

    if (!validPassowrd) {
      return NextResponse.json(
        { message: "Incorrect passowrd", success: false },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Loged in Success",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
