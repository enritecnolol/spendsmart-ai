"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CreditCard } from "../../../types/types";

export const columns: ColumnDef<CreditCard>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "totalDebt",
    header: () => <div className="text-right">Deuda total</div>,
    cell: ({ row }) => {
      const totalDebt = parseFloat(row.getValue("totalDebt"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalDebt);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "minimumPayment",
    header: () => <div className="text-right">Pago mínimo</div>,
    cell: ({ row }) => {
      const minimumPayment = parseFloat(row.getValue("minimumPayment"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(minimumPayment);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    
  },
  {
    accessorKey: "paymentDay",
    header: () => <div className="text-center">Dia de pago</div>,
    cell: ({ row }) => {
      const paymentDay = parseFloat(row.getValue("paymentDay"));
      return <div className="text-center font-medium">{paymentDay}</div>;
    },
  },
];
