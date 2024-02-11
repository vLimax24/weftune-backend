import connect from "../../../../../../db";
import List from "../../../../models/list";
import { NextResponse } from 'next/server';

export const GET = async (
    request: Request,
    { params }: { params: { listId: string, userId: string } }
  ) => {
    const listId = params.listId
    const userId = params.userId
    try {
        await connect()
        // Check if the user is already in the list
        const list = await List.findById(listId);
        if (!list) {
          return new NextResponse(JSON.stringify({ error: "List not found" }), { status: 404 });
        }

        if (list.users.includes(userId)) {
          return new NextResponse(JSON.stringify({ error: "User already added to the list" }), { status: 400 });
        }

        // Add the user to the list if not already present
        list.users.push(userId);
        const updatedList = await list.save();

        return new NextResponse(JSON.stringify(updatedList), { status: 200 });
    } catch (err) {
      console.error("Error finding user:", err)
      return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 })
    }
  }
