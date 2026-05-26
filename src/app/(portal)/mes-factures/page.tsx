"use client";

import { mockInvoices } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";

export default function MesFacturesPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Mes Factures</h1>

      {mockInvoices.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <span className="text-4xl mb-4">📄</span>
          <p className="text-gray-500">Aucune facture pour le moment.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
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
