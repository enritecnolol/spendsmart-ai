"use client";

import { ReactNode, createContext, useState } from "react";
import { TableAction } from "../types/types";

type TableActionsContent = {
  tableAction: TableAction | null;
  setTableAction: (tableAction: TableAction) => void;
  cleanTableAction: () => void;
};

const initialContext: TableActionsContent = {
  tableAction: {
    entity: null,
    data: null,
    action: null,
  },
  setTableAction: () => {},
  cleanTableAction: () => {},
};

const TableActionsContext = createContext<TableActionsContent>(initialContext);

type TableActionContextProps = {
  children: ReactNode;
};

export const TableActionsProvider = ({ children }: TableActionContextProps) => {
  const [tableAction, setTableAction] = useState<TableAction>({
    entity: null,
    data: null,
    action: null,
  });

  const cleanTableAction = () => {
    setTableAction(initialContext.tableAction as TableAction)
  }

  return (
    <TableActionsContext.Provider value={{ tableAction, setTableAction, cleanTableAction }}>
      {children}
    </TableActionsContext.Provider>
  );
};

export default TableActionsContext;
