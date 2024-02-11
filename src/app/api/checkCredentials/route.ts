import connect from "../../../../db";
import User from "../../models/user";
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
  try {
    const { email, password } = await req.json();

    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new NextResponse(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    // Password is correct, login successful
    return new NextResponse(JSON.stringify({ message: "Login successful" }), { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
