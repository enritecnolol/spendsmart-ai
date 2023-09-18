"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../../../types/types";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "dueDate",
    header: () => <div className="text-center">Dia vencimiento</div>,
    cell: ({ row }) => {
      const dueDate = parseFloat(row.getValue("dueDate"));
      return <div className="text-center font-medium">{dueDate}</div>;
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
