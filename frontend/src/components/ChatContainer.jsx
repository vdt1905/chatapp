import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Send, ArrowLeft, Menu, MoreVertical, X, Check } from "lucide-react";

const ChatContainer = () => {
  const { messages, getMessages, selectedUser, setSelectedUser, sendMessage, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages, isSidebarOpen, setIsSidebarOpen, deleteMessage, editMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const [text, setText] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await sendMessage({ message: text.trim() });
    setText("");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-black">
      {/* Chat Header */}
      <div className="p-4 border-b border-[#262626] flex items-center gap-4 bg-black z-10">
        <button
          className="hidden md:block p-2 -ml-2 hover:bg-[#1a1a1a] rounded-full text-neutral-400 hover:text-white transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          className="md:hidden p-2 -ml-2 hover:bg-[#1a1a1a] rounded-full text-neutral-400 hover:text-white transition-colors"
          onClick={() => setSelectedUser(null)}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-lg font-bold uppercase text-neutral-400">
          {selectedUser.username.charAt(0)}
        </div>
        <div>
          <h2 className="font-bold text-white tracking-tight">{selectedUser.username}</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {isMessagesLoading ? (
          <div className="h-full flex items-center justify-center text-neutral-500">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-neutral-500 flex-col gap-2">
            <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-3xl">
              👋
            </div>
            <p className="text-center font-medium">Say hi to {selectedUser.username}</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isSelf = msg.senderId === authUser._id;
            return (
              <div key={idx} className={`flex ${isSelf ? "justify-end" : "justify-start"} mb-2 group relative`}>
                
                {isSelf && editingMessageId !== msg._id && (
                  <div className="flex items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity mr-2 relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === msg._id ? null : msg._id)}
                      className="p-1 px-2 text-neutral-500 hover:text-white rounded-full hover:bg-[#1a1a1a] transition-colors"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === msg._id && (
                      <div className="absolute right-0 top-8 bg-[#1a1a1a] border border-[#262626] rounded-lg shadow-lg py-1 z-50 w-32 border-white/10">
                        <button
                          onClick={() => {
                            setEditingMessageId(msg._id);
                            setEditText(msg.message);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#262626] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteMessage(msg._id);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#262626] transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                    isSelf
                      ? "bg-white text-black rounded-br-none"
                      : "bg-[#262626] text-white rounded-bl-none"
                  }`}
                >
                  {editingMessageId === msg._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="bg-transparent border-b border-black text-black px-1 focus:outline-none w-full"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          if (editText.trim() !== msg.message && editText.trim() !== "") {
                            editMessage(msg._id, editText.trim());
                          }
                          setEditingMessageId(null);
                        }}
                        className="p-1 hover:bg-neutral-200 rounded text-black transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingMessageId(null)}
                        className="p-1 hover:bg-neutral-200 rounded text-black transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-[15px] leading-relaxed break-words">{msg.message}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-[#262626] bg-black">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-transparent border border-[#262626] rounded-full px-5 py-3 focus:outline-none focus:border-neutral-500 text-white placeholder-neutral-500 transition-colors"
            placeholder="Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="p-3 bg-white text-black hover:bg-neutral-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
