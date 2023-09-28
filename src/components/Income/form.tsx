import { useState, ChangeEvent, useEffect, Fragment } from "react";
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
import { PenIcon, Plus } from "lucide-react";
import { Income } from "../../types/types";
import { IncomeFrequencyEnum } from "../../enum/enum";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
  editIncomeData: Income | null;
  cleanEditIncome: () => void;
};

const IncomeForm = ({
  editIncomeData = null,
  cleanEditIncome,
}: IncomeFormProps) => {
  const [income, setIncome] = useState<Income>(initialState);

  const isEditing = !!editIncomeData;

  const insertIncome = useMutation({
    mutationFn: async (income: Income) => {
      const response = await axios.post("/api/income", {
        income,
      });
      return response;
    },
    onSuccess: () => cleanEditIncome()
  });

  const updateIncome = useMutation({
    mutationFn: async (income: Income) => {
      const response = await axios.put("/api/income", {
        income,
      });
      return response;
    },
    onSuccess: () => cleanEditIncome()
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const submitIncome = async () => {
    if (editIncomeData) {
      updateIncome.mutate(income);
      cleanEditIncome();
    } else {
      insertIncome.mutate(income);
    }
    setIncome(initialState);
  };

  const handleSelectChange = (value: string) => {
    setIncome({
      ...income,
      incomeFrequency: value as IncomeFrequencyEnum,
    });
  };

  useEffect(() => {
    setIncome(editIncomeData ?? initialState);
  }, [editIncomeData]);

  return (
    <div className="flex gap-x-5">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">
          Descripción <span className="text-red-600">*</span>
        </Label>
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
        <Label htmlFor="incomeFrequency">
          Frecuencia de ingreso <span className="text-red-600">*</span>
        </Label>
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
        <Label htmlFor="amount">
          Monto <span className="text-red-600">*</span>
        </Label>
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
        <Button onClick={submitIncome} className={isEditing ? "bg-orange-500" : ""}>
          {isEditing ? (
            <Fragment>
              <PenIcon className="w-4 h-4 mr-2" /> Editar
            </Fragment>
          ) : (
            <Fragment>
              <Plus className="w-4 h-4 mr-2" /> Agregar
            </Fragment>
          )}
        </Button>
      </div>
    </div>
  );
};

export default IncomeForm;
