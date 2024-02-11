import connect from "../../../../../db";
import User from "../../../models/user";
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { email: string } }
) => {

  const email = params.email
  try {

    if (!email) {
      return new NextResponse(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    await connect();
    const user = await User.findOne({ email: email });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error finding user:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}