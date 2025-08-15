// app/api/admin/tasks/route.ts
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Task from "@/models/Tasks";
import User from "@/models/Users";

export const GET = async () => {
  try {
    await connect();

    const tasks = await Task.find({})
      .populate({ path: "assignedTo", model: User, select: "name _id" })
      .populate({ path: "assignedBy", model: User, select: "name _id" })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(tasks, { status: 200 });
  } catch (e) {
    console.error("admin/tasks GET error:", e);
    return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  try {
    await connect();
    const body = await req.json();

    const newTask = await Task.create({
      companyId: body.companyId,
      assignedBy: body.assignedBy,
      assignedTo: body.assignedTo,
      title: body.title,
      description: body.description,
      priority: body.priority,
      dueDate: body.dueDate
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
