import { Fragment, ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
