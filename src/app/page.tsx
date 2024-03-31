import MyQuestion from "@/components/myQuestion";
import { Metadata } from "next";


export const metadata: Metadata = {

  title: 'Question Bank',
  description: 'Helping user to add and summerize their question and answer',
  openGraph: {
    title: 'Question Bank',
    description: 'Helping user to add and summerize their question and answer',
    images: ['/exam.svg', 'exam.svg'],

  },
}

export default async function Home() {
  if (!process.env.NEXT_PUBLIC_MY_URL) {
    return null
  }
  return (
    <main>
      <MyQuestion />
    </main>
  );
}
