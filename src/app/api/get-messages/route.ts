import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/db/mongoose";
import Message from "../../../models/Message";

export async function POST() {  
  const { userId } = await auth();
  await dbConnect()
  const messages = await Message.find({
    userId
  })
  return NextResponse.json(messages)
};
