import connect from "../../../../../../db";
import List from "../../../../models/list";
import User from '../../../../models/user';
import { NextResponse } from 'next/server';

export const POST = async (
  request: Request,
  { params }: { params: { listId: string, email: string } }
) => {
  const { listId, email } = params;

  try {
    await connect();

    // Find the list by its ID
    const list = await List.findById(listId);
    if (!list) {
      return new NextResponse(JSON.stringify({ error: "List not found" }), { status: 404 });
    }

    // Check if the user is already in the list
    if (list.users.includes(email)) {
      return new NextResponse(JSON.stringify({ error: "User already added to the list" }), { status: 400 });
    }

    // Update the list by adding the user to the users array
    list.users.push(email);
    const updatedList = await list.save();

    // Update the user document by adding the list ID to the lists array
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { lists: listId } },
      { new: true }
    );

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedList), { status: 200 });
  } catch (err) {
    console.error("Error updating list and user:", err);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
