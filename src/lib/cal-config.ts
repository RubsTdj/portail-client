export const CAL_BASE_URL = "https://cal.com/jbf-motos";

export const CAL_EVENT_LINKS: Record<string, string> = {
  "Révision Simple": `${CAL_BASE_URL}/revision-simple`,
  "Révision Générale": `${CAL_BASE_URL}/revision-generale`,
  "Révision Fourche": `${CAL_BASE_URL}/revision-fourche`,
  "Révision Freins": `${CAL_BASE_URL}/revision-freins`,
  "Moteur": `${CAL_BASE_URL}/moteur`,
  "Montage pneu(s)": `${CAL_BASE_URL}/montage-pneus`,
  "Transmission kit Chaîne / Courroie, Galets": `${CAL_BASE_URL}/transmission`,
  "Diagnostic Panne": `${CAL_BASE_URL}/diagnostic-panne`,
  "Pré Contrôle Technique": `${CAL_BASE_URL}/pre-controle-technique`,
  "Autre": `${CAL_BASE_URL}/autre`,
};

interface CalLinkParams {
  serviceName: string;
  duration: number;
  notes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  motoBrand: string;
  motoModel: string;
  motoYear: number;
}

export function buildCalLink(params: CalLinkParams): string {
  const baseLink =
    CAL_EVENT_LINKS[params.serviceName] || `${CAL_BASE_URL}/autre`;

  const query = new URLSearchParams({
    duration: String(params.duration),
    name: `${params.firstName} ${params.lastName}`,
    email: params.email,
    title: `${params.motoBrand} - ${params.motoModel} - ${params.motoYear}`,
    tel: params.phone,
  });

  if (params.notes) {
    query.set("notes", params.notes);
  }

  return `${baseLink}?${query.toString()}`;
}
