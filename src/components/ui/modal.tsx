"use client";

import { cn } from "@/lib/utils";
import { useEffect, useCallback } from "react";
import { IconClose } from "@/components/ui/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-xl",
          className
        )}
      >
        <div className="flex items-center justify-between mb-6">
          {title && (
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fermer"
          >
            <IconClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
