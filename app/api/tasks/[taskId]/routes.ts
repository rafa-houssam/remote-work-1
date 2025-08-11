import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Task from "@/models/Task";

export const PATCH = async (req: Request, { params }: { params: { taskId: string } }) => {
  try {
    const { status, refuseReason } = await req.json();
    await connect();

    const updatedTask = await Task.findByIdAndUpdate(
      params.taskId,
      { status, ...(status === "refused" ? { refuseReason } : {}) },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "المهمة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "حدث خطأ أثناء تحديث المهمة" }, { status: 500 });
  }
};
