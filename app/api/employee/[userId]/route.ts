import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/Users";
import Task from "@/models/Tasks";

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
  try {
    await connect();

    const user = await User.findById(params.userId).select("name email role createdAt companyId");
    if (!user) {
      return NextResponse.json({ message: "الموظف غير موجود" }, { status: 404 });
    }

    const totalTasks = await Task.countDocuments({ assignedTo: user._id });
    const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "done" });

    return NextResponse.json({
      ...user.toObject(),
      totalTasks,
      completedTasks
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json({ message: "حدث خطأ أثناء جلب البيانات" }, { status: 500 });
  }
};
