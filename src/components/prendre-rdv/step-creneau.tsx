"use client";

import { useState } from "react";
import { Moto, Service, User } from "@/lib/types";
import { formatDuration, cn } from "@/lib/utils";
import { buildCalLink } from "@/lib/cal-config";

interface StepCreneauProps {
  moto: Moto;
  service: Service;
  totalDuration: number;
  user: User;
  notes: string;
}

const PROVISIONAL_TERMS = `En prenant rendez-vous, je reconnais avoir pris connaissance et accepter les conditions suivantes :

• La moto doit être accessible et prête à être prise en charge à l'heure du rendez-vous.
• Tout retard de plus de 15 minutes pourra entraîner l'annulation du rendez-vous.
• JBF Motos ne peut être tenu responsable des objets personnels laissés sur ou dans la moto.
• Le gardiennage de la moto est assuré uniquement pendant les horaires d'ouverture de l'atelier.
• En cas d'annulation, merci de prévenir au moins 24h à l'avance.
• Un devis sera proposé avant toute intervention supplémentaire non prévue initialement.`;

export function StepCreneau({
  moto,
  service,
  totalDuration,
  user,
  notes,
}: StepCreneauProps) {
  const [accepted, setAccepted] = useState(false);

  const calLink = buildCalLink({
    serviceName: service.name,
    duration: totalDuration,
    notes,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    motoBrand: moto.brand,
    motoModel: moto.model,
    motoYear: moto.year,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Choisir un créneau</h2>
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
            <span className="text-primary-600">✂️</span>
            <div>
              <p className="font-semibold text-gray-900">
                {moto.brand} - {moto.model}
              </p>
              <p className="text-sm text-gray-500">{moto.licensePlate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-4 border-b border-gray-100">
            <span className="text-primary-600">✓</span>
            <p className="text-sm font-medium text-gray-900">{service.name}</p>
          </div>

          <div className="pt-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-xs text-gray-500 leading-relaxed whitespace-pre-line group-hover:text-gray-700 transition-colors">
                {PROVISIONAL_TERMS}
              </span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100">
            <span className="text-sm text-gray-700">
              Consulter les disponibilités :
            </span>
            {accepted ? (
              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Cliquez ici
              </a>
            ) : (
              <span
                className={cn(
                  "text-sm font-medium text-gray-300 cursor-not-allowed"
                )}
                title="Veuillez accepter les conditions ci-dessus"
              >
                Cliquez ici
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
