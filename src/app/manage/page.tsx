import NavBar from "@/components/NavBar";
import Expense from "@/components/Expenses";
import Income from "@/components/Income";

const ManagePage = () => {
  return (
    <main className="h-screen">
      <NavBar />
      <div className="flex w-full h-[calc(100vh-4rem)] bg-gray-50">
        <div className="h-full overflow-y-auto flex-[5] p-8 flex flex-col gap-y-4">
          <Income />
          <Expense />
        </div>
        <div className="flex-[3] bg-white">algo2</div>
      </div>
    </main>
  );
};

export default ManagePage;
