import NavBar from "@/components/NavBar";
import FormsContainer from "@/components/FormsContainer";
import ChatComponent from "@/components/ChatComponent";

const ManagePage = () => {
  return (
    <main className="h-screen">
      <NavBar />
      <div className="flex w-full h-[calc(100vh-4rem)] bg-gray-50">
        <FormsContainer />
        <div className="flex-[3] bg-white">
          <ChatComponent />
        </div>
      </div>
    </main>
  );
};

export default ManagePage;
