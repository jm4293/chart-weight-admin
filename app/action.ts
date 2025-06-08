"use server";

import { supabase } from "@/lib/supabaceClient";

export async function fetchUsers() {
  const { data, error } = await supabase.from("user").select("*").order("name", { ascending: true });

  if (error) return [];

  return data;
}
