import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer.helper";

connect();

export async function POST(request: NextRequest) {
  try {
    // Taking input
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // TODO: Add validation for username, email, and password
    console.log(reqBody);
    const user = await User.findOne({ email });

    // checking if user already exist
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }
    // If no user exsit
    // Password hasing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // creating new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save new user in the db
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
