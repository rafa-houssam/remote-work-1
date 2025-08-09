import User from "@/models/Users";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request:any) => {
  const { name, email, password } = await request.json();

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
      email,
      password: hashedPassword,
      name,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
};