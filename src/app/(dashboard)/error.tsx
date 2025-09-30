"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>💥 Đã có lỗi xảy ra!</h2>
        <p>Please reset 2</p>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Thử lại</button>
      </body>
    </html>
  );
}
