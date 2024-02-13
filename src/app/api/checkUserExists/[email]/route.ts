import connect from "../../../../../db";
import User from "../../../models/user";
import { NextResponse } from 'next/server';

export const GET = async (
    request: Request,
    { params }: { params: { email: string } }
  ) => {
  try {
    const email = params.email

    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse('wrong', { status: 404 });
    }

    return new NextResponse('true', { status: 200 });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
