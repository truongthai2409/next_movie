"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

interface Comment {
  id: string;
  content: string;
  user: {
    name: string;
    image?: string;
  };
  created_at: string;
}
interface Props {
  slug: string; // hoặc movieId tuỳ bạn setup
}

export default function CommentSection({ slug }: Props) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  // console.log(session)
  const handleSubmit = async () => {
    console.log(comments);
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/comments", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          slug: slug,
          content: newComment,
        }),
      });

      const data = await res.json();
      setComments((prev) => [...prev, data.comment]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Bình luận</h3>

      {/* Danh sách bình luận */}
      <div className="space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-2 rounded">
            <div className="font-semibold">{comment.user.name}</div>
            <p>{comment.content}</p>
            <span className="text-sm text-gray-500">{comment.created_at}</span>
          </div>
        ))}
      </div>

      {/* Form comment nếu đã đăng nhập */}
      {session ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Nhập bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={handleSubmit}
          >
            Gửi
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Vui lòng đăng nhập để bình luận.</p>
      )}
    </div>
  );
}
