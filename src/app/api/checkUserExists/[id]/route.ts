import connect from "../../../../../db";
import User from "../../../models/user";
import { NextResponse } from 'next/server';

export const GET = async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
  try {
    const userId = params.id

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse('false', { status: 404 });
    }

    return new NextResponse('true', { status: 200 });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
