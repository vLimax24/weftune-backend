import connect from "../../../../db";
import List from "../../models/list";
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
  try {
    const { listId, newTheme } = await req.json();

    await connect();

    const updatedList = await List.findByIdAndUpdate(
      listId,
      { colorTheme: newTheme },
      { new: true }
    );

    return new NextResponse(JSON.stringify(updatedList), { status: 200 });
  } catch (error) {
    console.error("Error updating list theme:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
