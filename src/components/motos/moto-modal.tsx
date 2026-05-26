"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DISPLACEMENTS } from "@/lib/utils";
import { BRAND_NAMES, getModelsForBrand } from "@/lib/moto-catalog";
import { Moto } from "@/lib/types";

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

interface MotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MotoFormData) => void;
  moto?: Moto | null;
}

const OTHER_VALUE = "__autre__";

const brandOptions = [
  ...BRAND_NAMES.map((b) => ({ value: b, label: b })),
  { value: OTHER_VALUE, label: "Autre" },
];

const displacementOptions = DISPLACEMENTS.map((d) => ({
  value: String(d),
  label: `${d} cc`,
}));

function motoToForm(moto: Moto): MotoFormData {
  return {
    brand: moto.brand,
    model: moto.model,
    year: String(moto.year),
    displacement: String(moto.displacement),
    mileage: String(moto.mileage),
    color: moto.color || "",
    registrationDate: moto.registrationDate,
    licensePlate: moto.licensePlate,
    vin: moto.vin,
  };
}

const EMPTY_FORM: MotoFormData = {
  brand: "", model: "", year: "", displacement: "",
  mileage: "", color: "", registrationDate: "",
  licensePlate: "", vin: "",
};

export function MotoModal({ isOpen, onClose, onSubmit, moto }: MotoModalProps) {
  const isEdit = !!moto;
  const [form, setForm] = useState<MotoFormData>(EMPTY_FORM);
  const [brandIsOther, setBrandIsOther] = useState(false);
  const [modelIsOther, setModelIsOther] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (moto) {
        const f = motoToForm(moto);
        setForm(f);
        const knownBrand = BRAND_NAMES.includes(moto.brand);
        setBrandIsOther(!knownBrand);
        if (knownBrand) {
          const models = getModelsForBrand(moto.brand);
          setModelIsOther(!models.includes(moto.model));
        } else {
          setModelIsOther(true);
        }
      } else {
        setForm(EMPTY_FORM);
        setBrandIsOther(false);
        setModelIsOther(false);
      }
    }
  }, [isOpen, moto]);

  const models = brandIsOther ? [] : getModelsForBrand(form.brand);
  const modelOptions = [
    ...models.map((m) => ({ value: m, label: m })),
    { value: OTHER_VALUE, label: "Autre" },
  ];

  const handleBrandChange = (value: string) => {
    if (value === OTHER_VALUE) {
      setBrandIsOther(true);
      setModelIsOther(true);
      setForm((prev) => ({ ...prev, brand: "", model: "" }));
    } else {
      setBrandIsOther(false);
      setModelIsOther(false);
      setForm((prev) => ({ ...prev, brand: value, model: "" }));
    }
  };

  const handleModelChange = (value: string) => {
    if (value === OTHER_VALUE) {
      setModelIsOther(true);
      setForm((prev) => ({ ...prev, model: "" }));
    } else {
      setModelIsOther(false);
      setForm((prev) => ({ ...prev, model: value }));
    }
  };

  const handleChange = (field: keyof MotoFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Modifier la moto" : "Ajouter une moto"}
      className="max-w-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
        {/* Row 1: Marque + Modèle */}
        {brandIsOther ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Marque</label>
              <button
                type="button"
                onClick={() => {
                  setBrandIsOther(false);
                  setModelIsOther(false);
                  setForm((prev) => ({ ...prev, brand: "", model: "" }));
                }}
                className="text-xs text-primary-500 hover:text-primary-600 font-medium"
              >
                ← Liste
              </button>
            </div>
            <Input
              id="brand-custom"
              placeholder="Saisissez la marque"
              value={form.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
            />
          </div>
        ) : (
          <Select
            id="brand"
            label="Marque"
            placeholder="Sélectionnez"
            options={brandOptions}
            value={form.brand}
            onChange={(e) => handleBrandChange(e.target.value)}
          />
        )}

        {modelIsOther ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Modèle</label>
              {!brandIsOther && (
                <button
                  type="button"
                  onClick={() => {
                    setModelIsOther(false);
                    setForm((prev) => ({ ...prev, model: "" }));
                  }}
                  className="text-xs text-primary-500 hover:text-primary-600 font-medium"
                >
                  ← Liste
                </button>
              )}
            </div>
            <Input
              id="model-custom"
              placeholder="Saisissez le modèle"
              value={form.model}
              onChange={(e) => handleChange("model", e.target.value)}
            />
          </div>
        ) : (
          <Select
            id="model"
            label="Modèle"
            placeholder={form.brand ? "Sélectionnez" : "Marque d'abord"}
            options={modelOptions}
            value={form.model}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={!form.brand}
          />
        )}

        {/* Row 2: Année + Cylindrée */}
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
          placeholder="Sélectionnez"
          options={displacementOptions}
          value={form.displacement}
          onChange={(e) => handleChange("displacement", e.target.value)}
        />

        {/* Row 3: Kilométrage + Couleur */}
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
          placeholder="Ex: Rouge, Noir..."
          value={form.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />

        {/* Row 4: Date + Plaque */}
        <Input
          id="registrationDate"
          type="date"
          label="Mise en circulation"
          value={form.registrationDate}
          onChange={(e) => handleChange("registrationDate", e.target.value)}
        />
        <Input
          id="licensePlate"
          label="Plaque"
          placeholder="AB-123-CD"
          value={form.licensePlate}
          onChange={(e) => handleChange("licensePlate", e.target.value)}
        />

        {/* Row 5: VIN (full width) */}
        <div className="sm:col-span-2">
          <Input
            id="vin"
            label="N° de série (VIN)"
            placeholder="Ex: VF1RJA00056789012"
            value={form.vin}
            onChange={(e) => handleChange("vin", e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-400">
            Disponible sur votre carte grise — champ E
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEdit ? "Enregistrer" : "Ajouter ma moto"}
        </Button>
      </div>
    </Modal>
  );
}
