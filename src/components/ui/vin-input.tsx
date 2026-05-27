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
  error?: string;
  className?: string;
}

const VIN_LENGTH = 17;

export function VinInput({ id, label, value, onChange, year, error: externalError, className }: VinInputProps) {
  const [result, setResult] = useState<VinValidationResult>({
    error: null,
    checksumValid: null,
    info: null,
  });
  const [touched, setTouched] = useState(false);

  const clean = value.replace(/\s/g, "");
  const isComplete = clean.length === VIN_LENGTH;
  const requiresFull = year >= 1990;

  useEffect(() => {
    if (value) {
      setResult(validateVin(value, year));
    } else {
      setResult({ error: null, checksumValid: null, info: null });
    }
  }, [value, year]);

  const displayError = externalError || (touched ? result.error : null);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {requiresFull && clean.length > 0 && (
            <span className={cn(
              "text-xs font-semibold tabular-nums",
              isComplete ? "text-emerald-600" : clean.length > 0 ? "text-gray-500" : "text-gray-400"
            )}>
              {clean.length} / {VIN_LENGTH}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value
              .toUpperCase()
              .replace(/[^A-HJ-NPR-Z0-9]/g, "")
              .slice(0, VIN_LENGTH);
            onChange(v);
          }}
          onBlur={() => setTouched(true)}
          placeholder="VF1RJA00056789012"
          maxLength={VIN_LENGTH}
          autoComplete="off"
          spellCheck={false}
          className={cn(
            "w-full rounded-lg border px-4 py-2.5 text-base font-mono tracking-[0.2em] placeholder:tracking-[0.2em] placeholder:text-gray-300 transition-colors",
            "focus:outline-none focus:ring-1",
            displayError
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : isComplete && result.checksumValid
                ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500"
                : isComplete && result.checksumValid === false
                  ? "border-amber-400 focus:border-amber-500 focus:ring-amber-500"
                  : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          )}
        />
        {isComplete && !displayError && result.checksumValid && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <IconCheckCircle size={18} className="text-emerald-500" />
          </div>
        )}
      </div>

      {displayError && (
        <p className="text-xs text-red-500">{displayError}</p>
      )}

      {isComplete && !displayError && (
        <div className="flex items-center gap-3">
          {result.checksumValid ? (
            <span className="text-xs font-medium text-emerald-600">VIN valide</span>
          ) : result.checksumValid === false ? (
            <span className="text-xs text-amber-600">
              Checksum non standard — vérifiez votre saisie.
            </span>
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
          17 caractères — disponible sur votre carte grise, champ E
        </p>
      )}
    </div>
  );
}
