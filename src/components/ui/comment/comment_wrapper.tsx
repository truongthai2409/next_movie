"use client";

import CommentSection from "./comment";

interface Props {
  slug: string;
}

export default function CommentClientWrapper({ slug }: Props) {
  return <CommentSection slug={slug} />;
}
