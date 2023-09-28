import CreditCard from "./CreditCard";
import Expense from "./Expenses";
import Income from "./Income";

const FormsContainer = () => {
  return (
    <div className="relative h-full overflow-y-auto flex-[5] p-8 flex flex-col gap-y-4">
      <Income />
      <Expense />
      <CreditCard />
    </div>
  );
};

export default FormsContainer;
