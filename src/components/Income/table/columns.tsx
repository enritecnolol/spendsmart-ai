"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Income } from "../../../types/types";

export const columns: ColumnDef<Income>[] = [
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "incomeFrequency",
    header: () => <div className="text-center">Frecuencia de ingreso</div>,
    cell: ({ row }) => {
      const incomeFrequency = String(row.getValue("incomeFrequency"));
      return <div className="text-center font-medium">{incomeFrequency}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
