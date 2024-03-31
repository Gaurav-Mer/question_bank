import { connectMyDb } from '@/dbConfig/connectDB';
import NewQuestion from '@/modals/newQuestion';
import { NextResponse } from 'next/server';

connectMyDb();

export async function GET(request: Request) {
  const limit = 5;
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));



  try {
    const dataList = await NewQuestion.find().sort({ createdAt: -1 }).skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return NextResponse.json({ success: true, data: dataList })
  } catch (error: any) {
    return NextResponse.json({ msg: error?.msg || "Something went wrong!", success: false })
  }
}

export async function POST(request: Request, response: Response) {
  const { question, answer } = await request.json();
  const newData = new NewQuestion({ question, answer });
  // if(newData)
  await newData.save()
  return NextResponse.json({ success: true, data: "added successfully" })
}

export async function PATCH(request: Request, response: Response) {
  const { question, answer, id } = await request.json();
  const updatedQuestion = await NewQuestion.findOneAndUpdate(
    { _id: id },
    { question, answer, updatedAt: Date.now() },
    { new: true } // Return the updated document
  );
  return NextResponse.json({ success: true, message: "Data updated successfully", data: updatedQuestion });
}

export async function DELETE(request: Request, response: Response) {
  const { id } = await request.json();
  try {
    const deletedQuestion = await NewQuestion.findOneAndDelete({ _id: id });
    if (deletedQuestion) {
      return NextResponse.json({ success: true, data: deletedQuestion });
    } else {
      return NextResponse.json({ success: false, message: 'Question not found' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message });
  }
}