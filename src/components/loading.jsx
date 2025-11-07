import React, { useState, useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loading from "./loading.json"

function Loading({ children, delay = 2000 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) {
    return (
        <DotLottieReact
          src={loading}
          loop
          autoplay
        />
    );
  }

  return children;
}

export default Loading;
