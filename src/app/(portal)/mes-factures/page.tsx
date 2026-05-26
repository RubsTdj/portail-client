"use client";

import { PageHeader } from "@/components/layout/page-header";
import { mockInvoices } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { IconFileText } from "@/components/ui/icons";

export default function MesFacturesPage() {
  return (
    <div>
      <PageHeader title="Mes Factures" />

      {mockInvoices.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <IconFileText size={40} className="text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">Aucune facture pour le moment.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {mockInvoices.map((invoice) => (
            <Card key={invoice.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{invoice.label}</p>
                <p className="text-sm text-gray-500">{invoice.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {invoice.amount.toFixed(2)} €
                </p>
                <p className="text-xs text-emerald-500">
                  {invoice.status === "payee" ? "Payée" : "En attente"}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
