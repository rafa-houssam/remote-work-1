import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Task from "@/models/Tasks";

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
  try {
    await connect();
    const tasks = await Task.find({ assignedTo: params.userId })
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "حدث خطأ أثناء جلب المهام" }, { status: 500 });
  }
};
