import { getUser } from "./action";
import Modify from "./Modify";
import HomeButton from "@/components/button/HomeButton";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const userId = Number(id);
  const user = await getUser(userId);

  return (
    <div className="flex flex-col gap-4">
      <Modify userId={userId} user={user} />

      <HomeButton />
    </div>
  );
}
