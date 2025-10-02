import React from "react";

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1 className="text-center">Main Layout Header</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2025 Next Movie</p>
      </footer>
    </>
  );
}
