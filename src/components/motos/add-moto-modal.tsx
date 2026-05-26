"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MOTORCYCLE_BRANDS, DISPLACEMENTS } from "@/lib/utils";

interface AddMotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: MotoFormData) => void;
}

export interface MotoFormData {
  brand: string;
  model: string;
  year: string;
  displacement: string;
  mileage: string;
  color: string;
  registrationDate: string;
  licensePlate: string;
  vin: string;
}

const brandOptions = MOTORCYCLE_BRANDS.map((b) => ({ value: b, label: b }));
const displacementOptions = DISPLACEMENTS.map((d) => ({
  value: String(d),
  label: `${d} cc`,
}));

export function AddMotoModal({ isOpen, onClose, onAdd }: AddMotoModalProps) {
  const [form, setForm] = useState<MotoFormData>({
    brand: "",
    model: "",
    year: "",
    displacement: "",
    mileage: "",
    color: "",
    registrationDate: "",
    licensePlate: "",
    vin: "",
  });

  const handleChange = (field: keyof MotoFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onAdd(form);
    setForm({
      brand: "",
      model: "",
      year: "",
      displacement: "",
      mileage: "",
      color: "",
      registrationDate: "",
      licensePlate: "",
      vin: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter une moto">
      <div className="flex flex-col gap-4">
        <Select
          id="brand"
          label="Marque"
          placeholder="Sélectionnez une marque"
          options={brandOptions}
          value={form.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
        />
        <Input
          id="year"
          label="Année"
          placeholder="Ex: 2019"
          value={form.year}
          onChange={(e) => handleChange("year", e.target.value)}
        />
        <Select
          id="displacement"
          label="Cylindrée"
          placeholder="Sélectionnez une cylindrée"
          options={displacementOptions}
          value={form.displacement}
          onChange={(e) => handleChange("displacement", e.target.value)}
        />
        <Input
          id="mileage"
          label="Kilométrage"
          placeholder="Ex: 15000"
          value={form.mileage}
          onChange={(e) => handleChange("mileage", e.target.value)}
        />
        <Input
          id="color"
          label="Couleur"
          placeholder="Ex: Rouge, Bleu, Noir..."
          value={form.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />
        <Input
          id="registrationDate"
          type="date"
          label="Date de mise en circulation"
          value={form.registrationDate}
          onChange={(e) => handleChange("registrationDate", e.target.value)}
        />
        <Input
          id="licensePlate"
          label="Plaque d'immatriculation"
          placeholder="Ex: AB-123-CD"
          value={form.licensePlate}
          onChange={(e) => handleChange("licensePlate", e.target.value)}
        />
        <div>
          <Input
            id="vin"
            label="Numéro de série (VIN)"
            placeholder="Ex: VF1RJA00056789012"
            value={form.vin}
            onChange={(e) => handleChange("vin", e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-400">
            Disponible sur votre carte grise — champ E
          </p>
        </div>
        <div className="mt-2 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Ajouter ma moto
          </Button>
        </div>
      </div>
    </Modal>
  );
}
