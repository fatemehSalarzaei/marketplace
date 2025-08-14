import { Toast } from "@/context/ToastContext";

let callback: ((toast: Omit<Toast, "id">) => void) | null = null;

export const setToastCallback = (cb: (toast: Omit<Toast, "id">) => void) => {
  callback = cb;
};

export const toastCallback = callback;
