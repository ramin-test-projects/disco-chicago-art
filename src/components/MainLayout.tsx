import { ReactNode } from "react";
import { Navigation } from "./Navigation";

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col h-screen">
    <div className="flex-shrink-0 flex-grow-0">
      <Navigation />
    </div>
    <main className="flex-auto bg-slate-100">{children}</main>
  </div>
);
