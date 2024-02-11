import connect from "../../../../db";
import Recipe from "../../../app/models/recipe";
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
  try {
    const recipeData = await req.json();

    await connect();
    const newRecipe = await Recipe.create(recipeData);

    return new NextResponse(JSON.stringify(newRecipe), { status: 200 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}