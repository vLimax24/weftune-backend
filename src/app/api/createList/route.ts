import connect from "../../../../db";
import List from "../../models/list";
import User from '../../models/user'
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
  try {
    const listData = await req.json();
    const userId = listData.userId;

    await connect();

    
    const newList = await List.create({
        ...listData,
        users: [userId]
    });

    // Add the ID of the newly created list to the user's lists array
    await User.updateOne({ _id: userId }, { $push: { lists: newList._id } });

    return new NextResponse(JSON.stringify(newList), { status: 200 });
  } catch (error) {
    console.error("Error creating list:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
