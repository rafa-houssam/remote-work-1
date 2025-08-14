import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Task from "@/models/Tasks";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";



export const GET = async (request: NextRequest,
  { params }: { params: { userId: string } }) => {
  try {
    await connect();
    const {userId}=params
     const objectId = new mongoose.Types.ObjectId(userId);
     console.log(objectId)
    const tasks = await Task.find({assignedTo:objectId})


    console.log(tasks)
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "حدث خطأ أثناء جلب المهام" }, { status: 500 });
  }
};
