"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, SignupData } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";

export function SignupForm() {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleChange = (field: keyof SignupData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canContinue =
    step === 1 &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setLoading(true);
    try {
      await signup(form);
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = step === 1 ? 50 : 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">JBF Motos ///</h2>
        </div>

        <div className="mb-6">
          <div className="relative h-0.5 w-full bg-gray-200 rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-center text-xs text-gray-400">
            Étape {step} sur 2
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {step === 1 && (
            <>
              <div className="text-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Créez votre compte
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Quelques informations pour commencer.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="firstName"
                  label="Prénom"
                  placeholder="Prénom"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                />
                <Input
                  id="lastName"
                  label="Nom"
                  placeholder="Nom"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                />
              </div>

              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="guy@don.fr"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />

              <div className="relative">
                <Input
                  id="password"
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  placeholder="8 caractères minimum"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Masquer" : "Afficher"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="xl"
                fullWidth
                disabled={!canContinue}
              >
                CONTINUER →
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Vos coordonnées
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Pour vous contacter si besoin.
                </p>
              </div>

              <AddressAutocomplete
                id="address"
                label="Adresse"
                placeholder="391 Rue de l'artisanat, 74330 Poisy"
                value={form.address}
                onChange={(value) => handleChange("address", value)}
              />

              <Input
                id="phone"
                label="Téléphone"
                placeholder="06 12 34 56 67"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Retour
              </button>

              <Button
                type="submit"
                variant="primary"
                size="xl"
                fullWidth
                disabled={loading}
              >
                {loading ? "Création..." : "CRÉER UN COMPTE"}
              </Button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Un email de confirmation vous sera envoyé.
              </p>
            </>
          )}
        </form>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Déjà un compte ?{" "}
            <Link
              href="/connexion"
              className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
