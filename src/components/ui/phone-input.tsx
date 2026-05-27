"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Country {
  code: string;
  flag: string;
  name: string;
  dialCode: string;
  pattern: string;
  maxLength: number;
}

const COUNTRIES: Country[] = [
  { code: "FR", flag: "🇫🇷", name: "France", dialCode: "+33", pattern: "## ## ## ## ##", maxLength: 10 },
  { code: "BE", flag: "🇧🇪", name: "Belgique", dialCode: "+32", pattern: "### ## ## ##", maxLength: 9 },
  { code: "CH", flag: "🇨🇭", name: "Suisse", dialCode: "+41", pattern: "## ### ## ##", maxLength: 9 },
  { code: "LU", flag: "🇱🇺", name: "Luxembourg", dialCode: "+352", pattern: "### ### ###", maxLength: 9 },
  { code: "DE", flag: "🇩🇪", name: "Allemagne", dialCode: "+49", pattern: "### #######", maxLength: 11 },
  { code: "ES", flag: "🇪🇸", name: "Espagne", dialCode: "+34", pattern: "### ## ## ##", maxLength: 9 },
  { code: "IT", flag: "🇮🇹", name: "Italie", dialCode: "+39", pattern: "### ### ####", maxLength: 10 },
  { code: "PT", flag: "🇵🇹", name: "Portugal", dialCode: "+351", pattern: "### ### ###", maxLength: 9 },
  { code: "GB", flag: "🇬🇧", name: "Royaume-Uni", dialCode: "+44", pattern: "#### ######", maxLength: 10 },
  { code: "US", flag: "🇺🇸", name: "États-Unis", dialCode: "+1", pattern: "### ### ####", maxLength: 10 },
];

function formatPhone(raw: string, pattern: string): string {
  const digits = raw.replace(/\D/g, "");
  let result = "";
  let digitIndex = 0;

  for (const char of pattern) {
    if (digitIndex >= digits.length) break;
    if (char === "#") {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

function getPlaceholder(pattern: string): string {
  let i = 0;
  return pattern.replace(/#/g, () => String(i++ % 10));
}

interface PhoneInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  className?: string;
  error?: string;
}

export function PhoneInput({
  id,
  label,
  value,
  onChange,
  readOnly = false,
  className,
  error,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, selectedCountry.maxLength);
    const formatted = formatPhone(raw, selectedCountry.pattern);
    onChange(formatted);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    const digits = value.replace(/\D/g, "");
    onChange(formatPhone(digits, country.pattern));
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div ref={dropdownRef} className="relative">
        <div
          className={cn(
            "flex items-center rounded-lg border border-gray-300 bg-white transition-colors",
            "focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500",
            error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500",
            readOnly && "!bg-gray-50",
            className
          )}
        >
          <button
            type="button"
            onClick={() => !readOnly && setIsOpen(!isOpen)}
            disabled={readOnly}
            className="flex items-center gap-1.5 px-3 py-2.5 border-r border-gray-200 hover:bg-gray-50 transition-colors disabled:hover:bg-transparent shrink-0"
          >
            <span className="text-lg leading-none">{selectedCountry.flag}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={cn("text-gray-400 transition-transform", isOpen && "rotate-180")}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <input
            id={id}
            type="tel"
            value={value}
            onChange={handleInputChange}
            placeholder={getPlaceholder(selectedCountry.pattern)}
            readOnly={readOnly}
            className="flex-1 px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
          />
        </div>

        {isOpen && (
          <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {COUNTRIES.map((country) => (
              <li
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors",
                  country.code === selectedCountry.code
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-xs text-gray-400">{country.dialCode}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
