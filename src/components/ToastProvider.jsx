// src/components/ToastProvider.jsx
"use client";

import { Toast } from "@heroui/react";

export default function ToastProvider() {
  return <Toast.Provider placement="bottom end" />;
}

export { Toast };
