"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { PhoneInput } from "@/components/ui/phone-input";
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
    <div>
      <PageHeader title="Mon Profil" />

      <Card className="px-5 py-8 sm:px-8">
        <div className="flex justify-center mb-8">
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            size="xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="sm:col-span-2">
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
          <AddressAutocomplete
            id="address"
            label="Adresse"
            value={isEditing ? form.address : user.address}
            onChange={(value) => handleChange("address", value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
          <PhoneInput
            id="phone"
            label="Téléphone"
            value={isEditing ? form.phone : user.phone}
            onChange={(value) => handleChange("phone", value)}
            readOnly={!isEditing}
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
