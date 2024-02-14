import connect from "../../../../../db";
import User from "../../../models/user";
import List from "../../../models/list";
import { NextResponse } from 'next/server';

export const GET = async (
    request: Request,
    { params }: { params: { email: string } }
) => {
    try {
        const email = params.email;
        await connect();
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // Extract listIds from the user document
        const listIds = user.lists;

        // Fetch lists associated with the listIds
        const lists = await List.find({ _id: { $in: listIds } });

        return new NextResponse(JSON.stringify(lists), { status: 200 });
    } catch (error) {
        console.error("Error fetching lists:", error);
        return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
