import { Moto } from "./types";

const VIN_CHARS = "0123456789ABCDEFGHJKLMNPRSTUVWXYZ";
const VIN_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
const VIN_TRANSLITERATION: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
};

function transliterateChar(c: string): number {
  if (c >= "0" && c <= "9") return parseInt(c);
  return VIN_TRANSLITERATION[c] || 0;
}

function computeCheckDigit(vin: string): string {
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += transliterateChar(vin[i]) * VIN_WEIGHTS[i];
  }
  const remainder = sum % 11;
  return remainder === 10 ? "X" : String(remainder);
}

export function validateVinChecksum(vin: string): boolean {
  if (vin.length !== 17) return false;
  const expected = computeCheckDigit(vin);
  return vin[8] === expected;
}

export interface VinValidationResult {
  error: string | null;
  checksumValid: boolean | null;
  info: VinInfo | null;
}

export interface VinInfo {
  wmi: string;
  vds: string;
  vis: string;
  year: string | null;
  serial: string;
}

const VIN_YEAR_CODES: Record<string, string> = {
  A: "2010", B: "2011", C: "2012", D: "2013", E: "2014",
  F: "2015", G: "2016", H: "2017", J: "2018", K: "2019",
  L: "2020", M: "2021", N: "2022", P: "2023", R: "2024",
  S: "2025", T: "2026", V: "2027", W: "2028", X: "2029",
  Y: "2030",
  "1": "2001", "2": "2002", "3": "2003", "4": "2004", "5": "2005",
  "6": "2006", "7": "2007", "8": "2008", "9": "2009",
};

function decodeVinYear(char: string): string | null {
  return VIN_YEAR_CODES[char] || null;
}

function parseVinInfo(vin: string): VinInfo {
  return {
    wmi: vin.slice(0, 3),
    vds: vin.slice(3, 9),
    vis: vin.slice(9),
    year: decodeVinYear(vin[9]),
    serial: vin.slice(12),
  };
}

export function validateVin(vin: string, year: number): VinValidationResult {
  if (!vin) return { error: null, checksumValid: null, info: null };

  const clean = vin.replace(/\s/g, "").toUpperCase();

  if (!/^[A-HJ-NPR-Z0-9]*$/.test(clean)) {
    return {
      error: "Caractères invalides. Le VIN ne contient que des lettres (sauf I, O, Q) et des chiffres.",
      checksumValid: null,
      info: null,
    };
  }

  if (year >= 1990 && clean.length !== 17) {
    return {
      error: `Le VIN doit contenir 17 caractères pour les motos après 1990 (${clean.length}/17).`,
      checksumValid: null,
      info: null,
    };
  }

  if (clean.length === 17) {
    const checksumValid = validateVinChecksum(clean);
    const info = parseVinInfo(clean);
    return { error: null, checksumValid, info };
  }

  return { error: null, checksumValid: null, info: null };
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
