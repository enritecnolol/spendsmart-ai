"use client";

import { ArrowDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import IncomeForm from "./form";
import { Income } from "@/types/types";
import { DataTable } from "../data-table";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const Income = () => {
  const { userId } = useAuth();
  const [editIncome, setEditIncome] = useState<Income | null>(null)

  const { data: incomes, isLoading, refetch } = useQuery({
    queryKey: ["income", userId],
    queryFn: async () => {
      const response = await axios.get<Income[]>(`/api/income`);
      return response.data;
    },
  });

  const columns: ColumnDef<Income>[] = [
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const income = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleEditIncome(income)}
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDeleteIncome(income)}>
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const handleEditIncome = (income: Income) => {
    setEditIncome(income);
  };

  const handleSuccessEdited = () => {
    setEditIncome(null)
    refetch()
  }

  const handleDeleteIncome = (income: Income) => {
    console.log("Delete Income: ", income)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowDownLeft className="h-7 w-7 mr-1" /> Ingresos:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <IncomeForm editIncomeData={editIncome} cleanEditIncome={handleSuccessEdited}/>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={incomes || []}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Income;
