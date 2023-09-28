"use client";

import { ArrowDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import IncomeForm from "./form";
import { Income } from "@/types/types";
import { DataTable } from "../data-table";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useEffect, useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import moneyFormatter from "../../lib/moneyFormatter";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { selectIncome, setIncome } from "../../app/store/slices/incomeSlice";

const Income = () => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useAppDispatch()
  const income = useAppSelector(selectIncome);

  const {
    data: incomes,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["incomes"],
    queryFn: async () => {
      const response = await axios.get<Income[]>(`/api/income`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income])

  const deleteIncome = useMutation({
    mutationFn: async (income: Income) => {
      const response = await axios.delete("/api/income", {
        params: {
          _id: income._id,
        }
      });
      return response;
    },
    onSuccess: () => refetch()
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
        return (
          <div className="text-right font-medium">{moneyFormatter(amount)}</div>
        );
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
                <DropdownMenuItem onClick={() => handleEditIncome(income)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteIncome(income)}>
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
    dispatch(setIncome(income));
  };

  const handleSuccessEdited = async () => {
    dispatch(setIncome(null));
    refetch()
  };

  const handleDeleteIncome = (income: Income) => {
    dispatch(setIncome(income));
    setOpenConfirmation(true);
  };

  const handleResetDelete = () => {
    dispatch(setIncome(null));
    setOpenConfirmation(false);
  }

  const handleContinueDelete = async () => {
    deleteIncome.mutate(income as Income);
    handleResetDelete()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowDownLeft className="h-7 w-7 mr-1" /> Ingresos:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <IncomeForm
            editIncomeData={income}
            cleanEditIncome={handleSuccessEdited}
          />
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={incomes || []}
            isLoading={isFetching}
          />
        </div>
      </CardContent>
      <ConfirmationDialog
        open={openConfirmation}
        title="Esta seguro de eliminar este ingreso?"
        description={
          income
            ? `Ingreso: ${
                income?.description
              } - monto: ${moneyFormatter(income?.amount)}`
            : ""
        }
        onCancel={handleResetDelete}
        onContinue={handleContinueDelete}
      />
    </Card>
  );
};

export default Income;
