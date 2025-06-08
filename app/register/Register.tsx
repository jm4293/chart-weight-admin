"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./action";
import HomeButton from "@/components/button/HomeButton";

export default function Register() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const birth = formData.get("birth") as string;
    const register = formData.get("register") as string;

    if (!name || !birth || !register) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }

    if (isNaN(Number(birth)) || birth.length !== 6) {
      setMessage("생년월일은 8자리 숫자로 입력해주세요.");
      return;
    }

    if (confirm("환자를 등록하시겠습니까?")) {
      const result = await registerUser(formData);

      if (result.success) {
        alert("환자가 등록되었습니다.");
        router.push("/");
      } else {
        setMessage(result.message);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => handleAction(formData));
      }}
      className="flex flex-col items-center"
    >
      <h1 className="text-2xl font-bold my-8">관리페이지 - 환자 등록</h1>

      <input type="text" name="name" placeholder="이름" className="w-full mb-4 border border-gray-300" required />
      <input
        type="number"
        name="birth"
        placeholder="생년월일"
        className="w-full mb-4 border border-gray-300"
        required
      />
      <input
        type="text"
        name="register"
        placeholder="등록번호"
        className="w-full mb-8 border border-gray-300 "
        maxLength={6}
        max={6}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition-colors mb-4"
        disabled={isPending}
      >
        {isPending ? "등록 중..." : "등록하기"}
      </button>
      {message && <p className="mt-4">{message}</p>}
      <HomeButton />
    </form>
  );
}
