"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { validateVin, VinValidationResult } from "@/lib/moto-validation";
import { IconCheckCircle } from "@/components/ui/icons";

interface VinInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  year: number;
  className?: string;
}

export function VinInput({ id, label, value, onChange, year, className }: VinInputProps) {
  const [result, setResult] = useState<VinValidationResult>({
    error: null,
    checksumValid: null,
    info: null,
  });
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (value) {
      setResult(validateVin(value, year));
    } else {
      setResult({ error: null, checksumValid: null, info: null });
    }
  }, [value, year]);

  const clean = value.replace(/\s/g, "");
  const showCounter = year >= 1990 && clean.length > 0;
  const isComplete = clean.length === 17;
  const hasError = touched && result.error;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {showCounter && (
            <span className={cn(
              "text-xs font-medium",
              isComplete ? "text-emerald-600" : "text-gray-400"
            )}>
              {clean.length}/17
            </span>
          )}
        </div>
      )}

      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value
            .toUpperCase()
            .replace(/[^A-HJ-NPR-Z0-9]/g, "")
            .slice(0, 17);
          onChange(v);
        }}
        onBlur={() => setTouched(true)}
        placeholder="Ex: VF1RJA00056789012"
        maxLength={17}
        autoComplete="off"
        spellCheck={false}
        className={cn(
          "w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 font-mono tracking-widest placeholder:text-gray-400 placeholder:font-sans placeholder:tracking-normal transition-colors",
          "focus:outline-none focus:ring-1",
          hasError
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : isComplete && result.checksumValid
              ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500"
              : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          className
        )}
      />

      {hasError && (
        <p className="text-xs text-red-500">{result.error}</p>
      )}

      {isComplete && !result.error && (
        <div className="flex items-start gap-2">
          {result.checksumValid ? (
            <div className="flex items-center gap-1.5">
              <IconCheckCircle size={14} className="text-emerald-500 shrink-0" />
              <span className="text-xs text-emerald-600">VIN valide</span>
            </div>
          ) : result.checksumValid === false ? (
            <p className="text-xs text-amber-600">
              Le checksum VIN ne correspond pas. Vérifiez votre saisie — certains constructeurs n&apos;utilisent pas le checksum standard.
            </p>
          ) : null}
          {result.info?.year && (
            <span className="text-xs text-gray-500 ml-auto">
              Année VIN : {result.info.year}
            </span>
          )}
        </div>
      )}

      {!touched && !value && (
        <p className="text-xs text-gray-400">
          Disponible sur votre carte grise — champ E
        </p>
      )}
    </div>
  );
}
