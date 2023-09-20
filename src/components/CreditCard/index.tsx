"use client"

import { CreditCardIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CreditCardForm from "./form";
import { CreditCard } from "@/types/types";
import { useContext } from "react";
import { DataTable } from "../data-table";
import { columns } from "./table/columns";
import FinancialSituationContext from "@/context/UserFinancialInfoContext";

const CreditCard = () => {
  const { financialSituation, setFinancialSituation } = useContext(FinancialSituationContext);

  const addCreditCard = (creditCard: CreditCard) => {
    const newFinancialSituation = {
      ...financialSituation,
      creditCards: [...financialSituation.creditCards, creditCard]
    }
    setFinancialSituation(newFinancialSituation);
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
          <CreditCardForm addCreditCard={addCreditCard} />
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={financialSituation.creditCards} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCard;
