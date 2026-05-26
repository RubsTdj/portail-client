"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { StepMoto } from "@/components/prendre-rdv/step-moto";
import { StepService } from "@/components/prendre-rdv/step-service";
import { StepCreneau } from "@/components/prendre-rdv/step-creneau";
import { AddMotoModal, MotoFormData } from "@/components/motos/add-moto-modal";
import { mockMotos, mockServices } from "@/lib/mock-data";
import { Moto } from "@/lib/types";

const STEPS = [
  { label: "Moto" },
  { label: "Service" },
  { label: "Créneau" },
];

export default function PrendreRdvPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [motos, setMotos] = useState<Moto[]>(mockMotos);
  const [selectedMotoId, setSelectedMotoId] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isAddMotoOpen, setIsAddMotoOpen] = useState(false);

  const selectedMoto = motos.find((m) => m.id === selectedMotoId) || null;
  const selectedService =
    mockServices.find((s) => s.id === selectedServiceId) || null;

  const totalDuration = (() => {
    if (!selectedService) return 0;
    if (selectedService.hasSubOptions && selectedService.subOptions) {
      const subDuration = selectedService.subOptions
        .filter((s) => selectedSubOptions.includes(s.id))
        .reduce((acc, s) => acc + s.duration, 0);
      return subDuration || selectedService.duration;
    }
    return selectedService.duration;
  })();

  const canGoNext = () => {
    if (currentStep === 0) return selectedMotoId !== null;
    if (currentStep === 1) {
      if (!selectedServiceId) return false;
      if (
        selectedService?.hasSubOptions &&
        selectedService.subOptionsRequired &&
        selectedSubOptions.length === 0
      )
        return false;
      if (
        selectedService?.hasTextarea &&
        selectedService.textareaRequired &&
        !description.trim()
      )
        return false;
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAddMoto = (data: MotoFormData) => {
    const newMoto: Moto = {
      id: Math.max(...motos.map((m) => m.id), 0) + 1,
      brand: data.brand,
      model: data.brand,
      year: parseInt(data.year) || new Date().getFullYear(),
      registrationDate:
        data.registrationDate || new Date().toISOString().split("T")[0],
      mileage: parseInt(data.mileage) || 0,
      licensePlate: data.licensePlate,
      vin: data.vin,
      displacement: parseInt(data.displacement) || 0,
      color: data.color,
    };
    setMotos((prev) => [...prev, newMoto]);
    setSelectedMotoId(newMoto.id);
  };

  const handleToggleSubOption = (id: string) => {
    setSelectedSubOptions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push("/accueil")}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Retour"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">JBF Motos ///</h1>
        <span className="text-sm text-gray-400">
          Étape {currentStep + 1} sur {STEPS.length}
        </span>
      </div>

      <div className="mb-10">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>

      <div className="mb-10">
        {currentStep === 0 && (
          <StepMoto
            motos={motos}
            selectedMotoId={selectedMotoId}
            onSelect={setSelectedMotoId}
            onAddMoto={() => setIsAddMotoOpen(true)}
          />
        )}
        {currentStep === 1 && (
          <StepService
            services={mockServices}
            selectedServiceId={selectedServiceId}
            onSelect={(id) => {
              setSelectedServiceId(id);
              setSelectedSubOptions([]);
              setDescription("");
            }}
            selectedSubOptions={selectedSubOptions}
            onToggleSubOption={handleToggleSubOption}
            description={description}
            onDescriptionChange={setDescription}
          />
        )}
        {currentStep === 2 && selectedMoto && selectedService && (
          <StepCreneau
            moto={selectedMoto}
            service={selectedService}
            totalDuration={totalDuration}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Retour
          </button>
        ) : (
          <div />
        )}
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!canGoNext()}
        >
          Suivant →
        </Button>
      </div>

      <AddMotoModal
        isOpen={isAddMotoOpen}
        onClose={() => setIsAddMotoOpen(false)}
        onAdd={handleAddMoto}
      />
    </div>
  );
}
