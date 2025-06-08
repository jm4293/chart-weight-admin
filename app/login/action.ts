"use server";

import { supabase } from "@/lib/supabaceClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAdmin(email: string, password: string) {
  const { data, error } = await supabase.from("admin").select("*").eq("email", email).eq("password", password).single();

  if (error || !data) {
    return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  const maxAge = 60 * 60 * 24 * 30; // 30일
  const cookieStore = await cookies();
  cookieStore.set("__at__", "true", { maxAge, path: "/" });
  redirect("/");
}
