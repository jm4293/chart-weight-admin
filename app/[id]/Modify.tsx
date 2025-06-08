"use client";

import { useRouter } from "next/navigation";
import Delete from "./Delete";
import { updateUser } from "./action";
import { useTransition } from "react";

export default function Modify({ userId, user }: { userId: number; user: any }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAction = (formData: FormData) => {
    const name = formData.get("name") as string;
    const birth = formData.get("birth") as string;
    const register = formData.get("register") as string;

    if (!name || !birth || !register) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (isNaN(Number(birth)) || birth.length !== 6) {
      alert("생년월일은 6자리 숫자로 입력해주세요.");
      return;
    }

    if (confirm("수정하시겠습니까?")) {
      startTransition(async () => {
        const name = formData.get("name") as string;
        const birth = formData.get("birth") as string;
        const register = formData.get("register") as string;

        const response = await updateUser(userId, { name, birth, register });

        if (response.success) {
          alert("사용자 정보가 수정되었습니다.");
          router.push("/");
        }
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => handleAction(formData));
      }}
      className="flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold my-2">관리페이지 - 환자 정보</h1>
      {user ? (
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-xl">
            <p className="min-w-[90px]">이름:</p>
            <input type="text" name="name" defaultValue={user?.name || ""} className="w-full border" />
          </label>
          <label className="flex items-center gap-2 text-xl">
            <p className="min-w-[90px]">생년월일:</p>
            <input type="number" name="birth" defaultValue={user?.birth || ""} className="w-full border" />
          </label>
          <label className="flex items-center gap-2 text-xl">
            <p className="min-w-[90px]">등록번호:</p>
            <input type="text" name="register" defaultValue={user?.register || ""} className="w-full border" />
          </label>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isPending}
            >
              {isPending ? "수정 중..." : "수정하기"}
            </button>
            <Delete userId={user.id} />
          </div>
        </div>
      ) : (
        <div>사용자 정보를 찾을 수 없습니다.</div>
      )}
    </form>
  );
}
