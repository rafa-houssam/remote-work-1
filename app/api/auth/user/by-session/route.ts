import { NextResponse } from "next/server";
import connect from "@/utils/db"; // your Mongoose connection helper
import User from "@/models/Users"; // your mongoose User model

export async function POST(req: Request) {
  try {
    await connect();

    const { email, name } = await req.json();
    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
    }

    const user = await User.findOne({ email, name }).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
