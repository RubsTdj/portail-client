"use client";

import { Moto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { IconMotorcycle, IconTrash } from "@/components/ui/icons";
import { formatDate } from "@/lib/utils";

interface MotoCardProps {
  moto: Moto;
  onDelete?: (id: number) => void;
}

export function MotoCard({ moto, onDelete }: MotoCardProps) {
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <IconMotorcycle size={28} className="text-gray-400" />
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
          <IconTrash size={20} />
        </button>
      )}
    </Card>
  );
}
