"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { mockUser } from "@/lib/mock-data";

export default function MonProfilPage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(mockUser);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setUser(form);
    setIsEditing(false);
  };

  return (
    <div className="mx-auto max-w-4xl py-4 lg:py-0">
      <h1 className="mb-6 text-2xl lg:text-3xl font-bold text-gray-900">Mon Profil</h1>

      <Card className="px-4 py-6 sm:px-8 sm:py-10">
        <div className="flex justify-center mb-8">
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            size="xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Input
            id="firstName"
            label="Prénom"
            value={isEditing ? form.firstName : user.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
          <Input
            id="lastName"
            label="Nom"
            value={isEditing ? form.lastName : user.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="mt-4 sm:mt-6">
          <Input
            id="email"
            label="Email"
            type="email"
            value={isEditing ? form.email : user.email}
            onChange={(e) => handleChange("email", e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <AddressAutocomplete
            id="address"
            label="Adresse"
            value={isEditing ? form.address : user.address}
            onChange={(value) => handleChange("address", value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
          <Input
            id="phone"
            label="Téléphone"
            value={isEditing ? form.phone : user.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="mt-8 flex justify-center">
          {isEditing ? (
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setForm(user);
                  setIsEditing(false);
                }}
              >
                Annuler
              </Button>
              <Button variant="primary" onClick={handleSave}>
                ENREGISTRER
              </Button>
            </div>
          ) : (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              MODIFIER
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
