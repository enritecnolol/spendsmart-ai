import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/db/mongoose";
import { auth } from "@clerk/nextjs";
import CreditCard from "../../../models/CreditCard";

export async function GET() {
  try {
    const { userId } = await auth();
    await dbConnect();
    const creditCards = await CreditCard.find({
      userId: userId,
    });
    return NextResponse.json(creditCards,
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
    const { creditCard } = await req.json();
    await dbConnect();
    await CreditCard.create({
      userId,
      ...creditCard
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
    const { creditCard } = await req.json();
    await dbConnect();
    await CreditCard.updateOne({
      userId,
      _id: creditCard._id
    }, creditCard);
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
    await CreditCard.deleteOne({
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
