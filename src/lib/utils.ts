import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h${mins}`;
}

export const MOTORCYCLE_BRANDS = [
  "Aprilia",
  "Benelli",
  "BMW",
  "Ducati",
  "Harley-Davidson",
  "Honda",
  "Husqvarna",
  "Indian",
  "Kawasaki",
  "KTM",
  "Moto Guzzi",
  "MV Agusta",
  "Royal Enfield",
  "Suzuki",
  "Triumph",
  "Yamaha",
] as const;

export const DISPLACEMENTS = [
  50, 80, 125, 250, 300, 400, 500, 600, 650, 700, 750, 800, 900, 1000, 1100,
  1200, 1300, 1400, 1500, 1600, 1800, 2000,
] as const;
