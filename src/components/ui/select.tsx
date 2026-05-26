"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({
  id,
  label,
  error,
  options,
  placeholder,
  value,
  onChange,
  disabled = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (optValue: string) => {
      onChange?.({ target: { value: optValue } });
      setIsOpen(false);
      setActiveIndex(-1);
      setSearch("");
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        return;
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(options[activeIndex].value);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      setSearch("");
    } else if (e.key.length === 1) {
      const newSearch = search + e.key.toLowerCase();
      setSearch(newSearch);

      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => setSearch(""), 500);

      const matchIndex = options.findIndex((o) =>
        o.label.toLowerCase().startsWith(newSearch)
      );
      if (matchIndex >= 0) setActiveIndex(matchIndex);
    }
  };

  useEffect(() => {
    if (isOpen && activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div ref={wrapperRef} className="relative">
        <button
          id={id}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2.5 text-left text-sm transition-colors",
            "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            disabled && "cursor-not-allowed bg-gray-50 text-gray-400",
            isOpen && "border-primary-500 ring-1 ring-primary-500",
            className
          )}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption?.label || placeholder || "Sélectionnez..."}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={cn(
              "shrink-0 text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                className={cn(
                  "cursor-pointer px-4 py-2.5 text-sm transition-colors",
                  index === activeIndex && "bg-primary-50 text-primary-700",
                  option.value === value &&
                    index !== activeIndex &&
                    "text-primary-600 font-medium",
                  index !== activeIndex &&
                    option.value !== value &&
                    "text-gray-700 hover:bg-gray-50"
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
            {options.length === 0 && (
              <li className="px-4 py-2.5 text-sm text-gray-400">
                Aucune option
              </li>
            )}
          </ul>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
