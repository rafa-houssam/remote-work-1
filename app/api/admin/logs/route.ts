// app/api/admin/logs/route.ts
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Log from "@/models/Logs";
import User from "@/models/Users";

export const GET = async () => {
  try {
    await connect();
    const logs = await Log.find({})
      .populate({ path: "userId", model: User, select: "name _id" })
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    return NextResponse.json(logs, { status: 200 });
  } catch (e) {
    console.error("admin/logs GET error:", e);
    return NextResponse.json({ message: "Error fetching logs" }, { status: 500 });
  }
};
