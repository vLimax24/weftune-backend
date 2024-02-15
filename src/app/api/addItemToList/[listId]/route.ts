import connect from "../../../../../db";
import List from "../../../models/list";
import { NextResponse } from 'next/server';

export const POST = async (
    request: Request,
    { params }: { params: { listId: string } }
) => {
    try {
        const listId = params.listId;
        const { itemName, customProperties } = await request.json();

        await connect();

        // Find the list by ID
        const list = await List.findById(listId);

        if (!list) {
            return new NextResponse(JSON.stringify({ error: "List not found" }), { status: 404 });
        }

        // Add the new item to the list's items array
        list.items.push({
            itemName,
            customProperties
        });

        // Save the updated list
        const updatedList = await list.save();

        return new NextResponse(JSON.stringify(updatedList), { status: 200 });
    } catch (error) {
        console.error("Error adding item to list:", error);
        return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
