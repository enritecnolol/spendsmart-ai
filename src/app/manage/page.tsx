import NavBar from "@/components/NavBar";
import FormsContainer from "@/components/FormsContainer";

const ManagePage = () => {
  return (
    <main className="h-screen">
      <NavBar />
      <div className="flex w-full h-[calc(100vh-4rem)] bg-gray-50">
        <FormsContainer />
        <div className="flex-[3] bg-white">algo2</div>
      </div>
    </main>
  );
};

export default ManagePage;
