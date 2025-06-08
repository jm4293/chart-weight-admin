"use server";

import { supabase } from "@/lib/supabaceClient";

export async function registerUser(formData: FormData) {
  let name = formData.get("name") as string;
  const birth = Number(formData.get("birth"));
  const register = formData.get("register") as string;

  // 동일한 이름 개수 확인
  const { data: existingUsers, error: fetchError } = await supabase
    .from("user")
    .select("name")
    .ilike("name", `${name}%`);

  if (fetchError) {
    return { success: false, message: "이름 중복 검사 실패: " + fetchError.message };
  }

  // 이미 동일한 이름이 있으면 -2, -3 ... 붙이기
  if (existingUsers && existingUsers.length > 0) {
    // 이미 이름-숫자 형식이 있으면 가장 큰 숫자+1로
    let maxNum = 1;
    existingUsers.forEach((u: { name: string }) => {
      const match = u.name.match(new RegExp(`^${name}-(\\d+)$`));
      if (match) {
        const num = Number(match[1]);
        if (num >= maxNum) maxNum = num + 1;
      } else if (u.name === name) {
        if (maxNum < 2) maxNum = 2;
      }
    });
    name = `${name}-${maxNum}`;
  }

  const { error } = await supabase.from("user").insert([{ name, birth, register }]);

  if (error) {
    return { success: false, message: "등록 실패: " + error.message };
  }

  return { success: true, message: "등록 성공!" };
}
