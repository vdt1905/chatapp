import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { LogOut, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
  const { authUser, logout } = useAuthStore();
  const { selectedUser, isSidebarOpen, setIsSidebarOpen } = useChatStore();

  return (
    <div className="h-[100dvh] flex bg-black overflow-hidden relative w-full">
      {/* Sidebar - Dynamically visible */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-[#262626] flex-col transition-all duration-300 ${selectedUser ? "hidden" : "flex"} ${!isSidebarOpen ? "md:hidden" : "md:flex"}`}>
        <div className="p-4 border-b border-[#262626] flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">{authUser?.username}</h1>
          <button onClick={logout} className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors">
            <LogOut className="w-5 h-5 text-neutral-400 hover:text-white" />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex-col ${!selectedUser ? "hidden md:flex" : "flex"}`}>
        {!selectedUser ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative">
            {!isSidebarOpen && (
              <button
                className="absolute top-4 left-4 hidden md:block p-2 hover:bg-[#1a1a1a] rounded-full text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div className="w-24 h-24 mb-6 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-4xl">💬</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
            <p className="text-neutral-500">Send private photos and messages to a friend or group.</p>
          </div>
        ) : (
          <ChatContainer />
        )}
      </div>
    </div>
  );
};

export default Home;
