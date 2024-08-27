import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getdatafromtoken";

connect();

export async function POST(request: NextRequest) {
  // Extract Data From Token
  const userId = await getDataFromToken(request);

  const user = await User.findOne({ _id: userId }).select("-password");

  //   check if no user
  if (!user) {
    return NextResponse.json(
      { message: "invalid user", success: false },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "user fetched successfully", success: true, data: user },
    { status: 200 }
  );
}
