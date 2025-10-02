"use client";
import { useState } from "react";

const ContentDisplay = ({
  content,
  charLimit,
}: {
  content: string;
  charLimit: number;
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="relative invisible md:visible">
      <p className="text-white text-sm ">
        {showAll ? content : `${content.slice(0, charLimit)}...`}
      </p>
      {content.length > charLimit && (
        <button
          onClick={handleToggle}
          className="mt-2 text-green-500 text-sm underline absolute -bottom-4 right-4"
        >
          {showAll ? "Ẩn bớt" : "Hiển thị thêm"}
        </button>
      )}
    </div>
  );
};

export default ContentDisplay;
