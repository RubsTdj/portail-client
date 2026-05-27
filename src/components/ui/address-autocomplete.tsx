"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface AddressResult {
  label: string;
  postcode: string;
  city: string;
  context: string;
}

interface AddressAutocompleteProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export function AddressAutocomplete({
  id,
  label,
  value,
  onChange,
  placeholder = "391 Rue de l'artisanat, 74330 Poisy",
  readOnly = false,
  className,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    try {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await res.json();
      const results: AddressResult[] = data.features.map(
        (f: { properties: AddressResult }) => ({
          label: f.properties.label,
          postcode: f.properties.postcode,
          city: f.properties.city,
          context: f.properties.context,
        })
      );
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setActiveIndex(-1);
    } catch {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelect = (result: AddressResult) => {
    onChange(result.label);
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete="off"
        className={cn(
          "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base text-gray-900 placeholder:text-gray-400 transition-colors",
          "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
          readOnly && "bg-gray-50",
          className
        )}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {suggestions.map((result, index) => (
            <li
              key={`${result.label}-${index}`}
              className={cn(
                "cursor-pointer px-4 py-3 text-sm transition-colors",
                index === activeIndex
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50"
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => handleSelect(result)}
            >
              <span className="font-medium">{result.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
