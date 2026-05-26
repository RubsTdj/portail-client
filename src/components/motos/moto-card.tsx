"use client";

import { Moto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface MotoCardProps {
  moto: Moto;
  onDelete?: (id: number) => void;
}

export function MotoCard({ moto, onDelete }: MotoCardProps) {
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-2xl">🏍️</span>
        <div>
          <p className="text-base font-semibold text-gray-900">
            {moto.brand} - {moto.model}
          </p>
          <p className="text-sm text-gray-500">
            {moto.year} - {formatDate(moto.registrationDate)}
          </p>
          <p className="text-sm text-gray-500">
            {moto.mileage.toLocaleString("fr-FR")} KM - N° {moto.vin}
          </p>
          <div className="mt-1 flex items-center gap-3">
            <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {moto.licensePlate}
            </span>
            <span className="text-xs text-gray-500">
              - {moto.displacement} cc
            </span>
          </div>
        </div>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(moto.id)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Supprimer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      )}
    </Card>
  );
}
