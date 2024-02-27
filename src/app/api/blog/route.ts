import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const GET = async (request: Request) => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (id === "*") {
    const result = await supabase.from("blog").select("id").limit(10);

    console.log("result : ", result);

    return Response.json({ ...result });
  } else if (id) {
    const result = await supabase
      .from("blog")
      .select("*,blog_content(*)")
      .eq("id", id)
      .single();

    console.log("result : ", result);

    return Response.json({ ...result });
  }

  return Response.json({});
};
