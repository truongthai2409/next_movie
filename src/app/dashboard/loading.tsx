import React from "react";

function Loading() {
  return (
    // <div className='text-center mt-4'>
    //   Loaing...
    // </div>
    <video
      src="/LoadingAnimation.webm"
      autoPlay
      loop
      muted
      className="w-32 h-32"
    />
  );
}

export default Loading;
