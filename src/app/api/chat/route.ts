import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { dbConnect } from "@/lib/db/mongoose";
import { NextResponse } from "next/server";
import Income from "@/models/Income";
import { auth } from "@clerk/nextjs";
import Expense from "@/models/Expense";
import CreditCard from "@/models/CreditCard";
import { convertToContextPrompt } from "@/lib/context";
import { Message } from "ai/react";
import MessageModel from "@/models/Message";

// export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const { userId } = auth();
    await dbConnect();
    const incomes = await Income.find({
      userId,
    });
    const expenses = await Expense.find({
      userId,
    });
    const creditCards = await CreditCard.find({
      userId,
    });

    const context = convertToContextPrompt({
      incomes,
      expenses,
      creditCards,
    });

    const lastMessage = messages[messages.length - 1];

    const prompt = {
      role: "system" as ChatCompletionRequestMessageRoleEnum,
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      `,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        await MessageModel.create({
          userId,
          content: lastMessage.content,
          role: "user"
        })
      },
      onCompletion: async (completion) => {
        await MessageModel.create({
          userId,
          content: completion,
          role: "system"
        })
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("error - api/chat:", error);
    return NextResponse.json({ message: error, success: false });
  }
}

export async function GET() {
  await dbConnect();
  return NextResponse.json(
    {
      message: "hola",
    },
    { status: 200 }
  );
}
