export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Moto {
  id: number;
  brand: string;
  model: string;
  year: number;
  registrationDate: string;
  mileage: number;
  licensePlate: string;
  vin: string;
  displacement: number;
  color?: string;
}

export type AppointmentStatus = "planifie" | "annule" | "termine";

export interface Appointment {
  id: string;
  service: string;
  date: string;
  status: AppointmentStatus;
  motoId: number;
}

export interface SubOption {
  id: string;
  name: string;
  duration: number;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  exclusive: boolean;
  description: string;
  hasTextarea: boolean;
  hasSubOptions: boolean;
  subOptions?: SubOption[];
  durationRange?: { min: number; max: number };
  textareaLabel?: string;
  textareaRequired?: boolean;
  subOptionsRequired?: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  label: string;
  status: "payee" | "en_attente";
}
