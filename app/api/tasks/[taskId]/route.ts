import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Task from "@/models/Tasks";

export const PUT = async (req: Request, { params }: { params: { taskId: string } }) => {
  try {
    const { status, refuseReason } = await req.json();
    await connect();

    let updateData: any = { status };

    if (status === "refused") {
      updateData.refuseReason = refuseReason || "";
    } else {
      // Remove refuseReason if status is not refused
      updateData.$unset = { refuseReason: "" };
    }

    const updatedTask = await Task.findByIdAndUpdate(
      params.taskId,
      status === "refused"
        ? { $set: { status, refuseReason: refuseReason || "" } }
        : { $set: { status }, $unset: { refuseReason: "" } },
      { new: true, runValidators: true }
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
