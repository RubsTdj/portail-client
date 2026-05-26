"use client";

import { Moto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { IconMotorcycle, IconPlus } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface StepMotoProps {
  motos: Moto[];
  selectedMotoId: number | null;
  onSelect: (id: number) => void;
  onAddMoto: () => void;
}

export function StepMoto({
  motos,
  selectedMotoId,
  onSelect,
  onAddMoto,
}: StepMotoProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Sélectionner une moto
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Choisissez la moto pour votre rendez-vous
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {motos.map((moto) => {
          const isSelected = selectedMotoId === moto.id;
          return (
            <Card
              key={moto.id}
              hoverable
              selected={isSelected}
              className="flex items-center justify-between"
              onClick={() => onSelect(moto.id)}
            >
              <div className="flex items-center gap-4">
                <IconMotorcycle
                  size={22}
                  className={isSelected ? "text-primary-600" : "text-gray-500"}
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {moto.brand} - {moto.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {moto.year} - {moto.displacement} cc
                  </p>
                  <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 mt-1">
                    {moto.licensePlate}
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "h-5 w-5 rounded-full border-2 shrink-0 transition-colors",
                  isSelected
                    ? "border-primary-600 bg-primary-600"
                    : "border-gray-300"
                )}
              />
            </Card>
          );
        })}

        <Card
          dashed
          hoverable
          className="flex flex-col items-center justify-center py-6 cursor-pointer"
          onClick={onAddMoto}
        >
          <IconPlus size={22} className="text-primary-600 mb-1" />
          <span className="text-sm font-semibold text-primary-600">
            Ajouter une moto
          </span>
        </Card>
      </div>
    </div>
  );
}
