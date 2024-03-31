import MyQuestion from "@/components/myQuestion";

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
