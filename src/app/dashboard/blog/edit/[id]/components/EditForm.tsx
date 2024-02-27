"use client";

import BlogForm from "@/app/dashboard/components/BlogForm";
import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { toast } from "@/components/ui/use-toast";
import { updateBlogDetailById } from "@/lib/actions/blog";
import { BlogDetail } from "@/lib/types";
import { useRouter } from "next/navigation";
import React from "react";

const EditForm = ({ blog }: { blog: BlogDetail }) => {
  const router = useRouter();

  const handleEidt = async (data: BlogFormSchemaType) => {
    const result = await updateBlogDetailById(blog?.id!, data);
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: "Fail to update blog",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully update" + data.title,
      });

      router.push("/dashboard");
    }
  };

  const onSubmit = () => {};

  return <BlogForm onHandleSubmit={handleEidt} blog={blog} />;
};

export default EditForm;
