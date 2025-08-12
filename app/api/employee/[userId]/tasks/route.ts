import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Task from "@/models/Tasks";

type Params={
  userId:string
}

export const GET = async (request: NextRequest,
  { params }: { params: { id: string } }) => {
  try {
    await connect();
    const {userId}=params
    const tasks = await Task.find({ assignedTo: userId })
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    console.log(tasks)
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "حدث خطأ أثناء جلب المهام" }, { status: 500 });
  }
};
