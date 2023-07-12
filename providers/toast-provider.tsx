"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
export const ToastProvider = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return <>{domLoaded && <Toaster />}</>;
};
