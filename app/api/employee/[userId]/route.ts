import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/Users";
import Task from "@/models/Tasks";
import { Types } from "mongoose";

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
export const PUT = async (req: Request, { params }: { params: {userId:string} }) => {
  try {
    await connect();

    // Validate ObjectId
    if (!Types.ObjectId.isValid(params.userId)) {
      return NextResponse.json({ message: "معرّف غير صالح" }, { status: 400 });
    }

    const body = await req.json();
    const { phoneNumber, geoPosition, bio } = body;

    // Prevent updates to these fields
    if ("name" in body || "email" in body || "dateOfJoining" in body) {
      return NextResponse.json(
        { message: "لا يمكن تعديل الاسم أو البريد أو تاريخ الانضمام" },
        { status: 400 }
      );
    }

    // Build update object (allow empty string if user wants to clear a field)
    const updateData: Record<string, any> = {};
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (geoPosition !== undefined) updateData.geoPosition = geoPosition;
    if (bio !== undefined) updateData.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(
      params.userId,
      { $set: updateData },
      {
        new: true, // return updated doc
        runValidators: true, // respect schema validators
      }
    )
      .select("name email role phoneNumber geoPosition dateOfJoining bio")
      .lean();

    if (!updatedUser) {
      return NextResponse.json({ message: "الموظف غير موجود" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "تم تحديث البيانات بنجاح",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json(
      {
        message: "حدث خطأ أثناء تحديث البيانات",
        error: error.message,
      },
      { status: 500 }
    );
  }
};