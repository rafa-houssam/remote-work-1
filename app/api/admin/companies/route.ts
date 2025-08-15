// app/api/admin/companies/route.ts
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Company from "@/models/Company";

export const GET = async () => {
  try {
    await connect();
    const companies = await Company.find({}).select("_id name").lean();
    return NextResponse.json(companies, { status: 200 });
  } catch (e) {
    console.error("admin/companies GET error:", e);
    return NextResponse.json({ message: "Error fetching companies" }, { status: 500 });
  }
};
