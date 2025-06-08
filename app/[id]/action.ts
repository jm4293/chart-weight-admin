"use server";

import { supabase } from "@/lib/supabaceClient";

export async function getUser(userId: number) {
  if (isNaN(userId)) {
    return null;
  }

  const { data, error } = await supabase.from("user").select("*").eq("id", userId).single();

  if (error) return null;

  return data;
}

export async function getWeights(userId: number) {
  if (isNaN(userId)) {
    return [];
  }

  const { data, error } = await supabase
    .from("weight")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  if (error) return [];

  return data;
}

export async function addWeight(userId: number, weight: number) {
  const { error } = await supabase.from("weight").insert([{ userId, weight }]);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function deleteWeight(weightId: number) {
  if (isNaN(weightId)) {
    return { success: false, message: "잘못된 id입니다." };
  }

  const { error } = await supabase.from("weight").delete().eq("id", weightId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function updateUser(userId: number, update: { name: string; birth: string; register: string }) {
  if (isNaN(userId)) {
    return { success: false, message: "잘못된 id입니다." };
  }

  let name = update.name;
  const birth = update.birth;
  const register = update.register;

  // 동일한 이름 개수 확인 (자기 자신 제외)
  const { data: existingUsers, error: fetchError } = await supabase
    .from("user")
    .select("name, id")
    .ilike("name", `${name}%`);

  if (fetchError) {
    return { success: false, message: "이름 중복 검사 실패: " + fetchError.message };
  }

  // 이미 동일한 이름이 있으면 -2, -3 ... 붙이기 (자기 자신 제외)
  if (existingUsers && existingUsers.length > 0) {
    let maxNum = 1;
    existingUsers.forEach((u: { name: string; id: number }) => {
      if (u.id === userId) return; // 자기 자신은 제외
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

  const { error } = await supabase.from("user").update({ name, birth, register }).eq("id", userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function deleteUser(userId: number) {
  if (isNaN(userId)) {
    return { success: false, message: "잘못된 id입니다." };
  }
  const { error } = await supabase.from("user").delete().eq("id", userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}
