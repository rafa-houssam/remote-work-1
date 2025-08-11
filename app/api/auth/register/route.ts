import User from "@/models/Users";
import Company from "@/models/Company";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const {
      companyName,
      companySize,
      industry,
      companyDescription,
      adminName,
      adminEmail,
      adminPhone,
      adminPassword,
      confirmPassword,
      agreeToTerms
    } = await request.json();

    // 1. Basic validation
    if (
      !companyName ||
      !companySize ||
      !industry ||
      !adminName ||
      !adminEmail ||
      !adminPassword
    ) {
      return NextResponse.json(
        { message: "الرجاء ملء جميع الحقول المطلوبة" },
        { status: 400 }
      );
    }

    if (adminPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "كلمات المرور غير متطابقة" },
        { status: 400 }
      );
    }

    if (!agreeToTerms) {
      return NextResponse.json(
        { message: "يجب الموافقة على الشروط والأحكام" },
        { status: 400 }
      );
    }

    await connect();

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      return NextResponse.json(
        { message: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 409 }
      );
    }

    // 3. Create company first
    const newCompany = new Company({
      name: companyName,
      size: companySize,
      industry,
      description: companyDescription
    });
    await newCompany.save();

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // 5. Create admin user linked to company
    const newAdmin = new User({
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      password: hashedPassword,
      role: "admin", // Mark as admin
      companyId: newCompany._id
    });
    await newAdmin.save();

    return NextResponse.json(
      {
        message: "تم إنشاء الشركة والمشرف بنجاح",
        companyId: newCompany._id,
        adminId: newAdmin._id
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { message: "حدث خطأ أثناء إنشاء الحساب" },
      { status: 500 }
    );
  }
};
