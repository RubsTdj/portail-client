"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ForgotPasswordForm() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8">
        {sent ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Email envoyé
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Si un compte existe avec cette adresse, vous recevrez un lien pour
              réinitialiser votre mot de passe.
            </p>
            <Link
              href="/connexion"
              className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Mot de passe oublié
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Entrez votre adresse email et nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading || !email.trim()}
              >
                {loading ? "Envoi..." : "Envoyer le lien"}
              </Button>
            </form>

            <div className="mt-5 text-center">
              <Link
                href="/connexion"
                className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
              >
                Retour à la connexion
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
