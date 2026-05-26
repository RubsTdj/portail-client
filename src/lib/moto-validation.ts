import { Moto } from "./types";

export function validateVin(vin: string, year: number): string | null {
  if (!vin) return null;
  const clean = vin.replace(/\s/g, "").toUpperCase();
  if (year >= 1990 && clean.length !== 17) {
    return "Le VIN doit contenir exactement 17 caractères pour les motos à partir de 1990.";
  }
  if (!/^[A-HJ-NPR-Z0-9]*$/.test(clean)) {
    return "Le VIN ne peut contenir que des lettres (sauf I, O, Q) et des chiffres.";
  }
  return null;
}

export function isMotoComplete(moto: Moto): boolean {
  return !!(
    moto.brand &&
    moto.model &&
    moto.year &&
    moto.displacement &&
    moto.mileage >= 0 &&
    moto.registrationDate &&
    moto.licensePlate &&
    moto.vin
  );
}

export function getMotoCompletionFields(moto: Moto): string[] {
  const missing: string[] = [];
  if (!moto.brand) missing.push("Marque");
  if (!moto.model) missing.push("Modèle");
  if (!moto.year) missing.push("Année");
  if (!moto.displacement) missing.push("Cylindrée");
  if (!moto.registrationDate) missing.push("Date de mise en circulation");
  if (!moto.licensePlate) missing.push("Plaque");
  if (!moto.vin) missing.push("VIN");
  return missing;
}
