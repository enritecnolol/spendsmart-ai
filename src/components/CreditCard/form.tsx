"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, useState } from "react";
import { CreditCard } from "../../types/types";

type CreditCardFormProps = {
  addCreditCard: (creditCard: CreditCard) => void;
};

const initialState: CreditCard = {
  name: "",
  totalDebt: 0,
  minimumPayment: 0,
  paymentDay: 1,
};

const CreditCardForm = ({ addCreditCard }: CreditCardFormProps) => {
  const [creditCard, setCreditCard] = useState<CreditCard>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setCreditCard({
      ...creditCard,
      [name]: value,
    });
  };

  const submitCreditCard = () => {
    addCreditCard(creditCard);
    setCreditCard(initialState);
  };

  return (
    <div className="flex flex-wrap gap-5">
      <div className="grid w-96 items-center gap-1.5">
        <Label htmlFor="name">
          Nombre <span className="text-red-600">*</span>
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Nombre"
          value={creditCard.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-48 items-center gap-1.5">
        <Label htmlFor="totalDebt">Deuda total</Label>
        <Input
          type="number"
          id="totalDebt"
          name="totalDebt"
          placeholder="Deuda total"
          value={creditCard.totalDebt}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-40 items-center gap-1.5">
        <Label htmlFor="minimumPayment">
          Pago mínimo <span className="text-red-600">*</span>
        </Label>
        <Input
          type="number"
          id="minimumPayment"
          name="minimumPayment"
          placeholder="Pago mínimo"
          value={creditCard.minimumPayment}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-40 items-center gap-1.5">
        <Label htmlFor="paymentDay">
          Dia de pago <span className="text-red-600">*</span>
        </Label>
        <Input
          type="number"
          id="paymentDay"
          name="paymentDay"
          placeholder="Dia de pago"
          value={creditCard.paymentDay}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center items-end">
        <Button onClick={submitCreditCard}>
          <Plus className="w-4 h-4 mr-2" /> Agregar
        </Button>
      </div>
    </div>
  );
};

export default CreditCardForm;
