import connect from "../../../../../../db";
import User from "../../../../models/user";
import { NextResponse } from 'next/server';

export const PUT = async (
  request: Request,
  { params }: { params: { email: string, newName: string } }
) => {
  try {
    const email = params.email;

    const newName = params.newName;

    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Update the user's name
    user.name = newName;
    user.avatarImage = `https://ui-avatars.com/api/?name=${newName}&length=2&background=0459D9&color=fff&size=128`
    await user.save();

    return new NextResponse(JSON.stringify({ message: "User name updated successfully", user }), { status: 200 });
  } catch (error) {
    console.error("Error updating user name:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
