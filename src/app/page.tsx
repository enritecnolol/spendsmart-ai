"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import { FolderInput, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function Home() {
  const { userId } = useAuth();

  return (
    <main className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">🤑 SpendSmart</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <p className="max-w-xl text-lg text-slate-600 mt-4">
            Una plataforma integral en línea diseñada para simplificar su vida
            financiera, administrar gastos y controlar deudas, todo envuelto en
            una interfaz fácil de usar para una experiencia agradable y fluida.
          </p>
          <div className="w-full mt-4 flex justify-center gap-4">
            {userId ? (
              <Link href="/manage">
                <Button>
                  Empecemos <FolderInput className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Fragment>
                <Link href="/sign-in">
                  <Button>
                    Inicio de sesión <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button>
                    Regístrate <UserPlus className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
