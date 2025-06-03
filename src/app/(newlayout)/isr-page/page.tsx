import React from "react";
// ISR (Incremental Static Regeneration) trong Next.js cho phép bạn cập nhật nội dung trang mà không cần phải xây dựng lại toàn bộ ứng dụng.

// Định nghĩa kiểu dữ liệu cho ảnh Unsplash
interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
    [key: string]: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
}

// Hàm lấy danh sách ảnh random từ Unsplash
async function getImages() {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?count=12&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      next: { revalidate: 10 }, // ISR: revalidate sau mỗi 60 giây
    }
  );
  return res.json();
}

const BlogPage = async () => {
  const images: UnsplashImage[] = await getImages();

  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog Gallery (ISR)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="rounded overflow-hidden shadow-lg">
            <img
              src={img.urls.small}
              alt={img.alt_description || "Unsplash Image"}
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 border-2 border-gray-200 shadow-md hover:shadow-xl"
            />
            <div className="p-4">
               <p className="text-sm text-gray-700">{img.user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage; 