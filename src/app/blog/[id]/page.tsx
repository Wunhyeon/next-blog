import { Blog, BlogDetail } from "@/lib/types";
import Image from "next/image";
import React from "react";
import Blogcontent from "./components/Blogcontent";

export const generateStaticParams = async () => {
  const { data: blog } = await fetch(
    process.env.SITE_URL + "/api/blog?id=" + "*"
  ).then((res) => res.json());

  return blog;
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { data: blog } = (await fetch(
    process.env.SITE_URL + "/api/blog?id=" + params.id
  ).then((res) => res.json())) as { data: Blog };

  return {
    metadataBase: new URL(process.env.SITE_URL!),
    title: blog?.title,
    authors: {
      name: "Jaehyeon",
    },
    openGraph: {
      title: blog?.title,
      // url: process.env.SITE_URL + "/blog/" + params.id,
      siteName: "Jaehyeon Blog",
      images: blog?.image_url,
      type: "website",
    },
    keywords: ["Jaehyeon", "Wunhyeon"],
  };
};

const page = async ({ params }: { params: { id: string } }) => {
  const { data: blog } = (await fetch(
    process.env.SITE_URL + "/api/blog?id=" + params.id
  ).then((res) => res.json())) as { data: Blog };

  if (!blog?.id) {
    return <h1>Not Found</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen pt-10 space-y-10">
      {/* {JSON.stringify(blog)} */}
      <div className="sm:px-10 space-y-5">
        <h1 className="text-3xl font-bold">{blog?.title}</h1>
        <p className="text-sm text-gray-400">
          {new Date(blog?.created_at || "").toDateString()}
        </p>
      </div>
      <div className="w-full h-96 relative">
        <Image
          priority
          src={blog?.image_url || "/"}
          alt="cover"
          fill
          className="object-cover object-center rounded-md border"
        />
      </div>
      <Blogcontent blogId={blog.id} />
    </div>
  );
};

export default page;
