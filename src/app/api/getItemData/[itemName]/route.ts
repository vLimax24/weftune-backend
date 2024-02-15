// api/endpoints/recipe/getAllItems.js
import connect from "../../../../../db";
import Item from "../../../models/item";
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { itemName: string } }
) => {
  try {
    await connect();
    const items = await Item.findOne({ name: params.itemName});

    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
