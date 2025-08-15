
// app/api/admin/users/route.ts
import User from "@/models/Users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Task from "@/models/Tasks";
import Company from "@/models/Company";
import mongoose from "mongoose";

export const GET = async () => {
  try {
    await connect();

    // get users and their company populated (optional)
    const users = await User.find({})
      .populate({ path: "companyId", model: Company, select: "name _id" })
      .select("_id name email role avatar companyId lastActive isOnline")
      .lean();

    // compute tasksCompleted per user
    const byUser = await Task.aggregate([
      { $match: { status: "done" } },
      { $group: { _id: "$assignedTo", count: { $sum: 1 } } }
    ]);

    const doneMap = new Map<string, number>();
    byUser.forEach((row: any) => doneMap.set(String(row._id), row.count));

    const FIVE_MIN = 5 * 60 * 1000;
    const now = Date.now();

    const result = users.map((u: any) => {
      const lastActive = u.lastActive ? new Date(u.lastActive) : null;
      const isOnlineCalculated = lastActive ? (now - lastActive.getTime()) <= FIVE_MIN : false;

      return {
        ...u,
        tasksCompleted: doneMap.get(String(u._id)) || 0,
        isOnline: typeof u.isOnline === "boolean" ? u.isOnline : isOnlineCalculated
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error("admin/users GET error:", e);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
};



// /app/api/admin/users/route.ts


export const POST = async (req: Request) => {
  try {
    await connect();
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.password || !body.companyId) {
      return NextResponse.json({ message: "الرجاء ملء جميع الحقول المطلوبة" }, { status: 400 });
    }

    // Validate companyId
    if (!mongoose.Types.ObjectId.isValid(body.companyId)) {
      return NextResponse.json({ message: "معرف الشركة غير صالح" }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ message: "البريد الإلكتروني مسجل بالفعل" }, { status: 400 });
    }

    // Check if name already exists
    const existingName = await User.findOne({ name: body.name });
    if (existingName) {
      return NextResponse.json({ message: "اسم المستخدم مسجل بالفعل" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create new user
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      companyId: new mongoose.Types.ObjectId(body.companyId),
      role: "employee", // ✅ Keep in English to match schema enum
      phoneNumber: body.phoneNumber || "",
      position: body.position || "",
      geoPosition: body.geoPosition || null,
      dateOfJoining: body.dateOfJoining || Date.now(),
      bio: body.bio || ""
    });

    return NextResponse.json(newUser, { status: 201 });

  } catch (err: any) {
    console.error("Error creating user:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};



