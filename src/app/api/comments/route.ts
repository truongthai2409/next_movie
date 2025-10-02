import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/config";
import authOptions from "../../../../auth.config";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { content, slug } = body;
  const insert = {
    movie_id: slug,
    email: session.user.email,
    content,
    name: session.user.name,
    image: session.user.image,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("comments")
    .insert(insert)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment: data });
}
