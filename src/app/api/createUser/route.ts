import connect from "../../../../db";
import User from "../../../app/models/user";
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
  try {
    const { name, email, password, avatarImage } = await req.json();

    await connect();
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword, // Store the hashed password
      avatarImage: avatarImage,
    });

    return new NextResponse(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
