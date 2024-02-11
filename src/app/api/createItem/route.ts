// api/endpoints/item/post.js
import connect from "../../../../db";
import Item from "../../models/item";
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
  try {
    const itemData = await req.json();

    await connect();
    const newItem = await Item.create(itemData);

    return new NextResponse(JSON.stringify(newItem), { status: 200 });
  } catch (error) {
    console.error("Error creating item:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
