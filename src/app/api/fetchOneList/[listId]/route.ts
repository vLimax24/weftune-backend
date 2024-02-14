import connect from "../../../../../db";
import User from "../../../models/user";
import List from "../../../models/list";
import { NextResponse } from 'next/server';

export const GET = async (
    request: Request,
    { params }: { params: { listId: string } }
) => {
    try {
        const listId = params.listId;
        await connect();
        // Find the user by email
        const list = await List.findOne({ _id: listId });

        if (!list) {
            console.log("List not found");
            return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(list), { status: 200 });
    } catch (error) {
        console.error("Error fetching lists:", error);
        return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}