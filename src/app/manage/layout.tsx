
import { ReactNode } from "react";
import { UserFinancialSituationProvider } from "../../context/UserFinancialInfoContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <UserFinancialSituationProvider>{children}</UserFinancialSituationProvider>
  );
}
