"use client";

import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState } from "react";
import BlogLoading from "./BlogLoading";
import Checkout from "@/components/stripe/Checkout";

const Blogcontent = ({ blogId }: { blogId: string }) => {
  const [blog, setBlog] = useState<{
    blog_id: string;
    content: string;
    created_at: string;
  } | null>();

  const [isLoading, setLoading] = useState(true);

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const readBlogContent = async () => {
    const { data } = await supabase
      .from("blog_content")
      .select("content,blog_id,created_at")
      .eq("blog_id", blogId)
      .single();

    console.log("blogId : ", blogId);

    console.log("data : ", data);

    setBlog(data);
    setLoading(false);
  };

  useEffect(() => {
    readBlogContent();
  }, []);

  if (isLoading) {
    return <BlogLoading />;
  }

  if (!blog?.content) {
    return <Checkout />;
  }

  return <MarkdownPreview className="sm:px-10" content={blog?.content || ""} />;
};

export default Blogcontent;
