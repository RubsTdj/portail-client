"use client";

import { useState } from "react";
import { Service } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepServiceProps {
  services: Service[];
  selectedServiceId: string | null;
  onSelect: (id: string) => void;
  selectedSubOptions: string[];
  onToggleSubOption: (id: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
}

export function StepService({
  services,
  selectedServiceId,
  onSelect,
  selectedSubOptions,
  onToggleSubOption,
  description,
  onDescriptionChange,
}: StepServiceProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Choisir un service</h2>
      <p className="mt-1 text-sm text-gray-500">
        Sélectionnez le service dont vous avez besoin
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {services.map((service) => {
          const isSelected = selectedServiceId === service.id;
          return (
            <Card
              key={service.id}
              hoverable
              selected={isSelected}
              className={cn("cursor-pointer", isSelected && "border-primary-600")}
              onClick={() => onSelect(service.id)}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">{service.name}</p>
                {isSelected && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-primary-600"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {isSelected && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {service.hasSubOptions && service.subOptions && (
                    <div
                      className="mt-4 flex flex-col gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {service.subOptions.map((sub) => {
                        const isSubSelected = selectedSubOptions.includes(
                          sub.id
                        );
                        return (
                          <label
                            key={sub.id}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isSubSelected}
                              onChange={() => onToggleSubOption(sub.id)}
                              className="h-4 w-4 rounded border-gray-300 accent-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700">
                              {sub.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {service.hasTextarea && (
                    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                      <label className="text-sm font-medium text-gray-700">
                        {service.textareaLabel}
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        placeholder="Décrivez ici..."
                        rows={3}
                        className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
