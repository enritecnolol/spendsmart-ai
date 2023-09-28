"use client";

import { CreditCardIcon, MoreVerticalIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CreditCardForm from "./form";
import { CreditCard } from "@/types/types";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  selectCreditCard,
  setCreditCard,
} from "@/app/store/slices/creditCardSlice";
import ConfirmationDialog from "../ConfirmationDialog";
import moneyFormatter from "@/lib/moneyFormatter";

const CreditCard = () => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useAppDispatch();
  const creditCard = useAppSelector(selectCreditCard);

  const {
    data: creditCards,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["creditCards"],
    queryFn: async () => {
      const response = await axios.get<CreditCard[]>(`/api/credit-card`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditCard]);

  const deleteCreditCard = useMutation({
    mutationFn: async (creditCard: CreditCard) => {
      const response = await axios.delete("/api/credit-card", {
        params: {
          _id: creditCard._id,
        },
      });
      return response;
    },
    onSuccess: () => refetch(),
  });

  const columns: ColumnDef<CreditCard>[] = [
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const creditCard = row.original;
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
                  onClick={() => handleEditCreditCard(creditCard)}
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteCreditCard(creditCard)}
                >
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const handleEditCreditCard = (creditCard: CreditCard) => {
    dispatch(setCreditCard(creditCard));
  };

  const handleSuccessEdited = async () => {
    dispatch(setCreditCard(null));
    refetch();
  };

  const handleDeleteCreditCard = (creditCard: CreditCard) => {
    dispatch(setCreditCard(creditCard));
    setOpenConfirmation(true);
  };

  const handleResetDelete = () => {
    dispatch(setCreditCard(null));
    setOpenConfirmation(false);
  };

  const handleContinueDelete = async () => {
    deleteCreditCard.mutate(creditCard as CreditCard);
    handleResetDelete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCardIcon className="h-7 w-7 mr-1" /> Tarjeta de crédito:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <CreditCardForm
            editCreditCardData={creditCard}
            cleanEditCreditCard={handleSuccessEdited}
          />
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={creditCards || []}
            isLoading={isFetching}
          />
        </div>
      </CardContent>
      <ConfirmationDialog
        open={openConfirmation}
        title="Esta seguro de eliminar este gasto?"
        description={
          creditCard
            ? `Tarjeta: ${creditCard?.name} - monto: ${moneyFormatter(
                creditCard?.totalDebt
              )}`
            : ""
        }
        onCancel={handleResetDelete}
        onContinue={handleContinueDelete}
      />
    </Card>
  );
};

export default CreditCard;
