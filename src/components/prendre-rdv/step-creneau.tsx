"use client";

import { Moto, Service } from "@/lib/types";
import { formatDuration } from "@/lib/utils";

interface StepCreneauProps {
  moto: Moto;
  service: Service;
  totalDuration: number;
}

export function StepCreneau({ moto, service, totalDuration }: StepCreneauProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Choisir un créneau
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Cliquez sur le lien et choisissez la date et l&apos;heure qui vous
        conviennent
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
        <div className="bg-primary-500 px-6 py-3">
          <span className="text-sm font-semibold text-white">
            Durée estimée : {formatDuration(totalDuration)}
          </span>
        </div>
        <div className="bg-white px-6 py-5">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <span className="text-primary-500">✂️</span>
            <div>
              <p className="font-semibold text-gray-900">
                {moto.brand} - {moto.model}
              </p>
              <p className="text-sm text-gray-500">{moto.licensePlate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-4 border-b border-gray-100">
            <span className="text-primary-500">✓</span>
            <p className="text-sm font-medium text-gray-900">{service.name}</p>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <span className="text-sm text-gray-700">
              Consulter les disponibilités :
            </span>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "En production, ce lien redirigera vers Cal.com pour la prise de rendez-vous."
                );
              }}
            >
              Cliquez ici
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
