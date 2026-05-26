import { User, Moto, Appointment, Invoice, Service } from "./types";

export const mockUser: User = {
  id: "1",
  firstName: "Rubs",
  lastName: "Tdj",
  email: "rubenstordjman@gmail.com",
  phone: "0666489771",
  address: "10 Rue des Héros Nogentais, 94130 Nogent-sur-Marne",
};

export const mockMotos: Moto[] = [
  {
    id: 1,
    brand: "Yamaha",
    model: "MT-07",
    year: 2020,
    registrationDate: "2025-04-16",
    mileage: 12000,
    licensePlate: "AB-TEST-AZ",
    vin: "KUI7T899Y9BGI87TG",
    displacement: 125,
  },
  {
    id: 2,
    brand: "Yamaha",
    model: "MT-07",
    year: 2002,
    registrationDate: "2002-03-05",
    mileage: 13000,
    licensePlate: "AZ-123-AZ",
    vin: "78YH8787F866F7",
    displacement: 400,
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    service: "Frein",
    date: "2026-06-24",
    status: "planifie",
    motoId: 1,
  },
  {
    id: "2",
    service: "Révision Simple",
    date: "2026-06-12",
    status: "annule",
    motoId: 1,
  },
  {
    id: "3",
    service: "Frein",
    date: "2026-05-28",
    status: "annule",
    motoId: 2,
  },
  {
    id: "4",
    service: "Autres",
    date: "2026-05-26",
    status: "annule",
    motoId: 1,
  },
  {
    id: "5",
    service: "Autres",
    date: "2026-05-26",
    status: "annule",
    motoId: 2,
  },
  {
    id: "6",
    service: "Révision Générale",
    date: "2026-03-15",
    status: "termine",
    motoId: 1,
  },
  {
    id: "7",
    service: "Montage pneu(s)",
    date: "2026-01-10",
    status: "termine",
    motoId: 2,
  },
];

export const mockInvoices: Invoice[] = [];

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Révision Simple",
    duration: 120,
    exclusive: false,
    description:
      "Inclus la vidange moteur, l'échange du filtre à huile et du joint de bouchon vidange. Le contrôle des éléments de sécurité : usure plaquettes, taux d'humidité liquide de frein, le contrôle de l'éclairage, état des optiques phare et feux, l'usure, la pression des pneumatiques, jeu roulement de roue, jeu colonne direction, réglage tension chaîne graissage, liquide de refroidissement, remise à zéro des indicateurs de maintenance et un essai routier.",
    hasTextarea: false,
    hasSubOptions: false,
  },
  {
    id: "2",
    name: "Révision Générale",
    duration: 240,
    exclusive: false,
    description:
      "Inclus la vidange moteur, l'échange du filtre à huile et du joint de bouchon vidange. Échange filtre à air, bougie(s). Le contrôle des éléments de sécurité : usure plaquettes, taux d'humidité liquide de frein, embrayage échange si nécessaire, le contrôle de l'éclairage, état des optiques phare et feux, état et pression des pneumatiques, jeu roulement de roue, jeu colonne direction, réglage tension chaîne graissage, niveau liquide de refroidissement, remise à zéro des indicateurs de maintenance et un essai routier.",
    hasTextarea: false,
    hasSubOptions: false,
  },
  {
    id: "3",
    name: "Révision Fourche",
    duration: 180,
    exclusive: false,
    description:
      "Inclus la dépose, le démontage, le nettoyage et l'inspection. L'échange des joints spi et l'huile de fourche selon les préconisations constructeur. Essai routier.",
    hasTextarea: false,
    hasSubOptions: false,
  },
  {
    id: "4",
    name: "Révision Freins",
    duration: 30,
    exclusive: false,
    description:
      "Inclus l'échange à votre demande des plaquettes de freins Av ou/et Ar, le test d'humidité du liquide de frein, échange si nécessaire. Essai routier.",
    hasTextarea: false,
    hasSubOptions: true,
    subOptionsRequired: true,
    durationRange: { min: 30, max: 150 },
    subOptions: [
      { id: "4-1", name: "Échange plaquettes AV", duration: 30 },
      { id: "4-2", name: "Échange plaquettes AR", duration: 30 },
      { id: "4-3", name: "Échange disque/plaquettes AV", duration: 30 },
      { id: "4-4", name: "Échange disque/plaquettes AR", duration: 30 },
      { id: "4-5", name: "Purge frein AV/AR", duration: 30 },
    ],
  },
  {
    id: "5",
    name: "Moteur",
    duration: 300,
    exclusive: false,
    description:
      "Mise au point moteur. Inclus le contrôle du jeu et le réglage, remplacement des joints et synchro si nécessaire. Essai routier.",
    hasTextarea: false,
    hasSubOptions: false,
  },
  {
    id: "6",
    name: "Montage pneu(s)",
    duration: 30,
    exclusive: false,
    description:
      "Nous ne prenons pas en charge le montage de pneus motos cross, bib mousse, quad, voiture. Inclus le montage de pneu, l'équilibrage de la roue avant, le contrôle des plaquettes de freins, de la tension, le graissage de la chaîne si nécessaire. Essai routier.",
    hasTextarea: false,
    hasSubOptions: true,
    subOptionsRequired: true,
    durationRange: { min: 30, max: 60 },
    subOptions: [
      { id: "6-1", name: "Pneu AV", duration: 30 },
      { id: "6-2", name: "Pneu AR", duration: 30 },
    ],
  },
  {
    id: "7",
    name: "Transmission kit Chaîne / Courroie, Galets",
    duration: 60,
    exclusive: false,
    description:
      "Inclus le démontage, le nettoyage et le montage du kit chaîne ou du kit courroie galets coulisseaux. Essai routier.",
    hasTextarea: false,
    hasSubOptions: true,
    subOptionsRequired: true,
    subOptions: [
      { id: "7-1", name: "Échange kit chaîne", duration: 0 },
      {
        id: "7-2",
        name: "Échange courroie, galets et coulisseaux",
        duration: 0,
      },
    ],
  },
  {
    id: "8",
    name: "Diagnostic Panne",
    duration: 60,
    exclusive: true,
    description:
      "Décrivez votre problème. Le temps de rendez-vous prévisionnel est d'1 heure, modifiable en fonction de la description et du modèle de moto.",
    hasTextarea: true,
    hasSubOptions: false,
    textareaLabel: "Décrivez votre problème",
    textareaRequired: true,
  },
  {
    id: "9",
    name: "Pré Contrôle Technique",
    duration: 60,
    exclusive: false,
    description:
      "Carte grise nécessaire. Inclus la vérification des points de contrôle : identification du véhicule (documents, plaque d'immatriculation), équipements de freinage, direction, visibilité, feux et dispositifs réfléchissants, essieux, roues, pneus, suspension, châssis et accessoires, autre matériel (klaxon...), nuisances (pollution, niveau sonore). Essai routier.",
    hasTextarea: false,
    hasSubOptions: false,
  },
  {
    id: "10",
    name: "Autre",
    duration: 60,
    exclusive: false,
    description:
      "Intervention personnalisée. Le temps de rendez-vous prévisionnel est d'1 heure, modifiable en fonction de la description et du modèle de moto.",
    hasTextarea: true,
    hasSubOptions: false,
    textareaLabel: "Décrivez votre demande",
    textareaRequired: true,
  },
];
