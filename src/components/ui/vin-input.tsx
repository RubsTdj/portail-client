"use client";

import { useState, useEffect, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const clean = value.replace(/\s/g, "");
  const chars = clean.split("");
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
              isComplete ? "text-emerald-600" : "text-gray-400"
            )}>
              {clean.length}/{VIN_LENGTH}
            </span>
          )}
        </div>
      )}

      <div
        className="cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className={cn(
          "flex gap-px rounded-lg border p-2 transition-colors bg-white",
          displayError
            ? "border-red-500"
            : isComplete && result.checksumValid
              ? "border-emerald-500"
              : "border-gray-300 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500"
        )}>
          {Array.from({ length: VIN_LENGTH }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex h-8 w-full items-center justify-center text-sm font-mono font-bold select-none transition-colors",
                i === 8 && "border-x border-gray-200",
                chars[i]
                  ? "text-gray-900"
                  : i === clean.length
                    ? "bg-primary-50 border-b-2 border-primary-500"
                    : "text-gray-200",
                i < 3 && "bg-gray-50/50",
                i >= 3 && i < 9 && "bg-white",
                i >= 9 && "bg-gray-50/50",
              )}
            >
              {chars[i] || (i === clean.length ? "│" : "·")}
            </div>
          ))}
        </div>

        <input
          ref={inputRef}
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
          maxLength={VIN_LENGTH}
          autoComplete="off"
          spellCheck={false}
          className="sr-only"
          aria-label="Numéro de série VIN"
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-gray-400">
          <span>WMI</span>
          <span>VDS</span>
          <span>VIS</span>
        </div>
      </div>

      {displayError && (
        <p className="text-xs text-red-500">{displayError}</p>
      )}

      {isComplete && !result.error && (
        <div className="flex items-center gap-3">
          {result.checksumValid ? (
            <div className="flex items-center gap-1.5">
              <IconCheckCircle size={14} className="text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">VIN valide</span>
            </div>
          ) : result.checksumValid === false ? (
            <p className="text-xs text-amber-600">
              Checksum non standard — vérifiez votre saisie.
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
          17 caractères — disponible sur votre carte grise, champ E
        </p>
      )}
    </div>
  );
}
