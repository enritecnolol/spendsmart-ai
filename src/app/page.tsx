import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
export default function Home() {
  return (
    <main className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">🤑 Spend Smart</h1>
          </div>
          <p className="max-w-xl text-lg text-slate-600 mt-4">
            A comprehensive online platform designed to simplify your financial life,
             managing expenses and controlling debts, all wrapped up in a user-friendly interface for a seamless and delightful experience.
          </p>
          <div className="w-full mt-4">
            <Button>
              Login to get Started! <LogIn className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
