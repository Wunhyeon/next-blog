"use server";

import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "../types/supabase";
import { revalidatePath } from "next/cache";
import { CreateSupabaseServerClient } from "../supabase";

const DASHBOARD = "/dashboard";

export const createBlog = async (data: BlogFormSchemaType) => {
  const supabase = await CreateSupabaseServerClient();

  const { ["content"]: excludedKey, ...blog } = data;

  const resultBlog = await supabase
    .from("blog")
    .insert(blog)
    .select("id")
    .single();

  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .insert({
        blog_id: resultBlog.data.id!,
        content: data.content,
      })
      .select("blog_id")
      .single();
    // revalidation
    revalidatePath(DASHBOARD);
    return JSON.stringify(result);
  }
};

export const readBlogAdmin = async () => {
  const supabase = await CreateSupabaseServerClient();

  return supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: true });
};

export const readBlog = async () => {
  const supabase = await CreateSupabaseServerClient();

  return supabase
    .from("blog")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });
};

export const deleteBlogById = async (blogId: string) => {
  const supabase = await CreateSupabaseServerClient();

  const result = await supabase.from("blog").delete().eq("id", blogId);

  revalidatePath(DASHBOARD);
  revalidatePath("/blog/" + blogId);
  return JSON.stringify(result);
};

export const updateBlogById = async (
  blogId: string,
  data: BlogFormSchemaType
) => {
  const supabase = await CreateSupabaseServerClient();

  const result = await supabase.from("blog").update(data).eq("id", blogId);
  revalidatePath(DASHBOARD);
  revalidatePath("/blog/" + blogId);
  return JSON.stringify(result);
};

export const readBlogContentById = async (blogId: string) => {
  const supabase = await CreateSupabaseServerClient();

  return supabase
    .from("blog")
    .select("*,blog_content(*)")
    .eq("id", blogId)
    .single();
};

export async function updateBlogDetailById(
  blogId: string,
  data: BlogFormSchemaType
) {
  const supabase = await CreateSupabaseServerClient();
  const { ["content"]: excludedKey, ...blog } = data;

  const resultBlog = await supabase.from("blog").update(blog).eq("id", blogId);

  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .update({ content: data.content })
      .eq("blog_id", blogId);

    revalidatePath(DASHBOARD);
    revalidatePath("/blog/" + blogId);

    return JSON.stringify(result);
  }
}
