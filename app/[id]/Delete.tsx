"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function Delete({ userId }: { userId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm("삭제하시겠습니까?")) {
      startTransition(async () => {
        const { deleteUser } = await import("./action");

        const response = await deleteUser(userId);

        if (response.success) {
          alert("사용자가 삭제되었습니다.");
          router.push("/");
        } else {
          alert(`삭제 실패: ${response.message}`);
        }
      });
    }
  };

  return (
    <button
      type="button"
      className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "삭제 중..." : "삭제하기"}
    </button>
  );
}
