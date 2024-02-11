import connect from "../../../../db";
import User from "../../../app/models/user";
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
  try {
    const { name, email, password, avatarImage } = await req.json();

    await connect();

    // Generate a salt and hash the password
    bcrypt.genSalt(10, async function(err:any, salt:any) {
      if (err) {
        throw err;
      }
      bcrypt.hash(password, salt, async function(err:any, hashedPassword:any) {
        if (err) {
          throw err;
        }

        // Create a new user with the hashed password
        const newUser = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
          avatarImage: avatarImage,
        });

        return new NextResponse(JSON.stringify(newUser), { status: 200 });
      });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
