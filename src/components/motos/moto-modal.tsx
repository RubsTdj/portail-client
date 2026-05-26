"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { VinInput } from "@/components/ui/vin-input";
import { DISPLACEMENTS } from "@/lib/utils";
import { BRAND_NAMES, getModelsForBrand } from "@/lib/moto-catalog";
import { Moto } from "@/lib/types";
import { validateVin } from "@/lib/moto-validation";

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

const REQUIRED_FIELDS: { key: keyof MotoFormData; label: string }[] = [
  { key: "brand", label: "Marque" },
  { key: "model", label: "Modèle" },
  { key: "year", label: "Année" },
  { key: "displacement", label: "Cylindrée" },
  { key: "mileage", label: "Kilométrage" },
  { key: "registrationDate", label: "Date de mise en circulation" },
  { key: "licensePlate", label: "Plaque d'immatriculation" },
  { key: "vin", label: "N° de série (VIN)" },
];

export function MotoModal({ isOpen, onClose, onSubmit, moto }: MotoModalProps) {
  const isEdit = !!moto;
  const [form, setForm] = useState<MotoFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof MotoFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [brandIsOther, setBrandIsOther] = useState(false);
  const [modelIsOther, setModelIsOther] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
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
    clearError("brand");
  };

  const handleModelChange = (value: string) => {
    if (value === OTHER_VALUE) {
      setModelIsOther(true);
      setForm((prev) => ({ ...prev, model: "" }));
    } else {
      setModelIsOther(false);
      setForm((prev) => ({ ...prev, model: value }));
    }
    clearError("model");
  };

  const handleChange = (field: keyof MotoFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const clearError = (field: keyof MotoFormData) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof MotoFormData, string>> = {};

    for (const { key, label } of REQUIRED_FIELDS) {
      if (!form[key]?.trim()) {
        newErrors[key] = `${label} est requis`;
      }
    }

    if (form.year && (isNaN(Number(form.year)) || Number(form.year) < 1900 || Number(form.year) > new Date().getFullYear() + 1)) {
      newErrors.year = "Année invalide";
    }

    if (form.mileage && isNaN(Number(form.mileage))) {
      newErrors.mileage = "Saisissez uniquement des chiffres";
    }

    if (form.vin) {
      const vinResult = validateVin(form.vin, parseInt(form.year) || 0);
      if (vinResult.error) {
        newErrors.vin = vinResult.error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (!validate()) return;
    onSubmit(form);
    onClose();
  };

  const hasErrors = submitted && Object.keys(errors).length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Modifier la moto" : "Ajouter une moto"}
      className="max-w-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
        {brandIsOther ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Marque *</label>
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
              error={submitted ? errors.brand : undefined}
            />
          </div>
        ) : (
          <Select
            id="brand"
            label="Marque *"
            placeholder="Sélectionnez"
            options={brandOptions}
            value={form.brand}
            onChange={(e) => handleBrandChange(e.target.value)}
            error={submitted ? errors.brand : undefined}
          />
        )}

        {modelIsOther ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Modèle *</label>
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
              error={submitted ? errors.model : undefined}
            />
          </div>
        ) : (
          <Select
            id="model"
            label="Modèle *"
            placeholder={form.brand ? "Sélectionnez" : "Marque d'abord"}
            options={modelOptions}
            value={form.model}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={!form.brand}
            error={submitted ? errors.model : undefined}
          />
        )}

        <Input
          id="year"
          label="Année *"
          placeholder="Ex: 2019"
          value={form.year}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(0, 4);
            handleChange("year", v);
          }}
          error={submitted ? errors.year : undefined}
        />
        <Select
          id="displacement"
          label="Cylindrée *"
          placeholder="Sélectionnez"
          options={displacementOptions}
          value={form.displacement}
          onChange={(e) => {
            handleChange("displacement", e.target.value);
          }}
          error={submitted ? errors.displacement : undefined}
        />

        <Input
          id="mileage"
          label="Kilométrage *"
          placeholder="Ex: 15000"
          value={form.mileage}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            handleChange("mileage", v);
          }}
          error={submitted ? errors.mileage : undefined}
        />
        <Input
          id="color"
          label="Couleur"
          placeholder="Ex: Rouge, Noir..."
          value={form.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />

        <Input
          id="registrationDate"
          type="date"
          label="Mise en circulation *"
          value={form.registrationDate}
          onChange={(e) => handleChange("registrationDate", e.target.value)}
          error={submitted ? errors.registrationDate : undefined}
        />
        <Input
          id="licensePlate"
          label="Plaque *"
          placeholder="AB-123-CD"
          value={form.licensePlate}
          onChange={(e) => handleChange("licensePlate", e.target.value.toUpperCase())}
          error={submitted ? errors.licensePlate : undefined}
        />

        <div className="sm:col-span-2">
          <VinInput
            id="vin"
            label="N° de série (VIN) *"
            value={form.vin}
            onChange={(value) => handleChange("vin", value)}
            year={parseInt(form.year) || 0}
            error={submitted ? errors.vin : undefined}
          />
        </div>
      </div>

      {hasErrors && (
        <p className="mt-3 text-xs text-red-500 text-center">
          Veuillez remplir tous les champs obligatoires (*) avant de valider.
        </p>
      )}

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
