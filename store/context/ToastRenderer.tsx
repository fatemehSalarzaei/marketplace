"use client";

import React from "react";
import { useToast } from "./ToastContext";

const ToastRenderer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white ${
            toast.type === "success" ? "bg-green-500" :
            toast.type === "error" ? "bg-red-500" :
            "bg-blue-500"
          }`}
        >
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="mr-2">✕</button>
        </div>
      ))}
    </div>
  );
};

export default ToastRenderer;
