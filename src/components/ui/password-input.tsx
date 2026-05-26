"use client";

import { useState, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { IconEye, IconEyeOff } from "@/components/ui/icons";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  error?: string;
};

export function PasswordInput({ ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={showPassword ? "Masquer" : "Afficher"}
      >
        {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
      </button>
    </div>
  );
}
