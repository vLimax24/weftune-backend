// Import necessary modules
import connect from "../../../../../../db";
import List from "../../../../models/list";
import { NextResponse } from 'next/server';

// Define the POST method for the endpoint
export const POST = async (
  request: Request,
  { params }: { params: { listId: string, itemName: string } }
) => {
  const { listId, itemName } = params;

  try {
    // Connect to the database
    await connect();

    // Find the list by its ID
    const list = await List.findById(listId);
    if (!list) {
      return new NextResponse(JSON.stringify({ error: "List not found" }), { status: 404 });
    }

    // Remove the item from the list
    list.items = list.items.filter((item:any) => item.itemName !== itemName);
    const updatedList = await list.save();

    return new NextResponse(JSON.stringify(updatedList), { status: 200 });
  } catch (err) {
    console.error("Error removing item from list:", err);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
};
