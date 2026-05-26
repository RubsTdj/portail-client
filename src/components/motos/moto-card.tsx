"use client";

import { Moto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { IconMotorcycle, IconTrash, IconEdit } from "@/components/ui/icons";
import { formatDate } from "@/lib/utils";

interface MotoCardProps {
  moto: Moto;
  onEdit?: (moto: Moto) => void;
  onDelete?: (moto: Moto) => void;
}

export function MotoCard({ moto, onEdit, onDelete }: MotoCardProps) {
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <IconMotorcycle size={28} className="text-gray-500 shrink-0 hidden sm:block" />
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
      <div className="flex items-center gap-1 shrink-0">
        {onEdit && (
          <button
            onClick={() => onEdit(moto)}
            className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
            aria-label="Modifier"
          >
            <IconEdit size={18} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(moto)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Supprimer"
          >
            <IconTrash size={18} />
          </button>
        )}
      </div>
    </Card>
  );
}
