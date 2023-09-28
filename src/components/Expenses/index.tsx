"use client";

import ExpenseForm from "./form";
import { DataTable } from "../data-table";
import { Expense } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowUpRight, MoreVerticalIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import moneyFormatter from "@/lib/moneyFormatter";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectExpense, setExpense } from "@/app/store/slices/expenseSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const Expense = () => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useAppDispatch();
  const expense = useAppSelector(selectExpense);

  const {
    data: expenses,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get<Expense[]>(`/api/expense`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteExpense = useMutation({
    mutationFn: async (expense: Expense) => {
      const response = await axios.delete("/api/expense", {
        params: {
          _id: expense._id,
        },
      });
      return response;
    },
    onSuccess: () => refetch()
  });

  const columns: ColumnDef<Expense>[] = [
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const expense = row.original;
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
                <DropdownMenuItem onClick={() => handleEditExpense(expense)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteExpense(expense)}>
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const handleEditExpense = (expense: Expense) => {
    dispatch(setExpense(expense));
  };

  const handleSuccessEdited = async () => {
    dispatch(setExpense(null));
    refetch()
  };

  const handleDeleteExpense = (expense: Expense) => {
    dispatch(setExpense(expense));
    setOpenConfirmation(true);
  };

  const handleResetDelete = () => {
    dispatch(setExpense(null));
    setOpenConfirmation(false);
  };

  const handleContinueDelete = async () => {
    deleteExpense.mutate(expense as Expense);
    handleResetDelete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowUpRight className="h-7 w-7 mr-1" /> Gastos:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <ExpenseForm
            editExpenseData={expense}
            cleanEditExpense={handleSuccessEdited}
          />
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={expenses || []}
            isLoading={isFetching}
          />
        </div>
      </CardContent>
      <ConfirmationDialog
        open={openConfirmation}
        title="Esta seguro de eliminar este gasto?"
        description={
          expense
            ? `Ingreso: ${expense?.description} - monto: ${moneyFormatter(
                expense?.amount
              )}`
            : ""
        }
        onCancel={handleResetDelete}
        onContinue={handleContinueDelete}
      />
    </Card>
  );
};

export default Expense;
