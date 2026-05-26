"use client";

import { useState, useMemo, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { IconEye, IconEyeOff } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  error?: string;
  showStrength?: boolean;
};

interface StrengthRule {
  label: string;
  test: (pw: string) => boolean;
}

const RULES: StrengthRule[] = [
  { label: "8 caractères minimum", test: (pw) => pw.length >= 8 },
  { label: "Une majuscule", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Une minuscule", test: (pw) => /[a-z]/.test(pw) },
  { label: "Un chiffre", test: (pw) => /[0-9]/.test(pw) },
  { label: "Un caractère spécial", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" };
  const passed = RULES.filter((r) => r.test(password)).length;
  if (passed <= 1) return { score: 1, label: "Très faible", color: "bg-red-500" };
  if (passed === 2) return { score: 2, label: "Faible", color: "bg-orange-500" };
  if (passed === 3) return { score: 3, label: "Moyen", color: "bg-amber-500" };
  if (passed === 4) return { score: 4, label: "Fort", color: "bg-emerald-400" };
  return { score: 5, label: "Très fort", color: "bg-emerald-500" };
}

export function PasswordInput({ showStrength = false, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const value = typeof props.value === "string" ? props.value : "";

  const strength = useMemo(() => getStrength(value), [value]);
  const ruleResults = useMemo(
    () => RULES.map((r) => ({ ...r, passed: r.test(value) })),
    [value]
  );

  return (
    <div className="flex flex-col gap-1.5">
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

      {showStrength && value.length > 0 && (
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    level <= strength.score ? strength.color : "bg-gray-200"
                  )}
                />
              ))}
            </div>
            <span className={cn(
              "text-xs font-medium shrink-0",
              strength.score <= 1 ? "text-red-500" :
              strength.score === 2 ? "text-orange-500" :
              strength.score === 3 ? "text-amber-500" :
              "text-emerald-500"
            )}>
              {strength.label}
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-0.5">
            {ruleResults.map((rule) => (
              <li
                key={rule.label}
                className={cn(
                  "text-[11px] flex items-center gap-1 transition-colors",
                  rule.passed ? "text-emerald-600" : "text-gray-400"
                )}
              >
                <span>{rule.passed ? "✓" : "○"}</span>
                {rule.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export { getStrength, RULES };
