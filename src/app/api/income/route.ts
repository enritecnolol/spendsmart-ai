import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/db/mongoose";
import { auth } from "@clerk/nextjs";
import Income from "../../../models/Income";

export async function GET() {
  try {
    const { userId } = await auth();
    await dbConnect();
    const incomes = await Income.find({
      userId: userId,
    });
    return NextResponse.json(incomes,
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
    const { income } = await req.json();
    await dbConnect();
    await Income.create({
      userId,
      ...income
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
    const { income } = await req.json();
    await dbConnect();
    await Income.updateOne({
      userId,
      _id: income._id
    }, income);
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
    await Income.deleteOne({
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
