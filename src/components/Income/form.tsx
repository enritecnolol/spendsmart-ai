import { useState, ChangeEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Income } from "../../types/types";
import { IncomeFrequencyEnum } from "../../enum/enum";

const incomeFrequencyOption = [
  {
    display: "Semanal",
    value: IncomeFrequencyEnum.WEEKLY,
  },

  {
    display: "Quincenal",
    value: IncomeFrequencyEnum.BIWEEKLY,
  },
  {
    display: "Mensual",
    value: IncomeFrequencyEnum.MONTHLY,
  },
  {
    display: "Ocasional",
    value: IncomeFrequencyEnum.OCCASIONAL,
  },
];

const initialState: Income = {
  description: "",
  amount: 0,
  incomeFrequency: IncomeFrequencyEnum.MONTHLY,
};

type IncomeFormProps = {
  addIncome: (income: Income) => void;
};

const IncomeForm = ({ addIncome }: IncomeFormProps) => {
  const [income, setIncome] = useState<Income>(initialState);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const submitIncome = () => {
    addIncome(income);
    setIncome(initialState);
  };

  const handleSelectChange = (value: string) => {
    setIncome({
      ...income,
      incomeFrequency: value as IncomeFrequencyEnum,
    });
  };

  return (
    <div className="flex gap-x-5">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Descripción <span className="text-red-600">*</span></Label>
        <Input
          type="text"
          id="description"
          name="description"
          placeholder="Descripción"
          value={income.description}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-56 items-center gap-1.5">
        <Label htmlFor="incomeFrequency">Frecuencia de ingreso <span className="text-red-600">*</span></Label>
        <Select
          value={income.incomeFrequency}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona frecuencia" />
          </SelectTrigger>
          <SelectContent>
            {incomeFrequencyOption.map(({ display, value }) => {
              return (
                <SelectItem value={value} key={value}>
                  {display}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-56 items-center gap-1.5">
        <Label htmlFor="amount">Monto <span className="text-red-600">*</span></Label>
        <Input
          type="number"
          id="amount"
          placeholder="Monto"
          name="amount"
          min="0"
          value={income.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center items-end">
        <Button onClick={submitIncome}>
          <Plus className="w-4 h-4 mr-2" /> Agregar
        </Button>
      </div>
    </div>
  );
};

export default IncomeForm;
