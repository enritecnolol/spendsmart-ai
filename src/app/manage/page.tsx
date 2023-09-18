import NavBar from "@/components/NavBar";
import Expense from "@/components/Expenses";

const ManagePage = () => {
  return (
    <main className="h-screen">
      <NavBar />
      <div className="flex w-full h-[calc(100vh-10rem)]">
        <div className="h-full overflow-y-scroll flex-[5]">
          <Expense />
        </div>
        <div className="flex-[3]">algo2</div>
      </div>
    </main>
  );
};

export default ManagePage;
