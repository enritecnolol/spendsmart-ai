import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/db/mongoose";
import { auth } from "@clerk/nextjs";
import Expense from "../../../models/Expense";

export async function GET() {
  try {
    const { userId } = await auth();
    await dbConnect();
    const Expenses = await Expense.find({
      userId: userId,
    });
    return NextResponse.json(Expenses,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { expense } = await req.json();
    await dbConnect();
    await Expense.create({
      userId,
      ...expense
    });
    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    const { expense } = await req.json();
    await dbConnect();
    await Expense.updateOne({
      userId,
      _id: expense._id
    }, expense);
    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('_id')
    await dbConnect();
    await Expense.deleteOne({
      userId,
      _id: id
    });
    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    });
  }
}