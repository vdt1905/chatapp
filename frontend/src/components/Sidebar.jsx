import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="py-2">
        {users.length === 0 ? (
          <div className="text-center text-neutral-500 py-8">No users found</div>
        ) : (
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-[#121212] transition-colors ${
                selectedUser?._id === user._id ? "bg-[#121212]" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-xl font-bold uppercase text-neutral-400">
                  {user.username ? user.username.charAt(0) : "?"}
                </div>
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full"></span>
                )}
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{user.username || "Unknown User"}</div>
                <div className="text-sm text-neutral-500 truncate">
                  {onlineUsers.includes(user._id) ? "Active now" : "Offline"}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
