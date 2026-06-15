import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPaperPlane, FaSearch, FaEllipsisV, FaCircle } from "react-icons/fa";
import api from "../api/api";
import useAuthStore from "../store/authStore";
import { io } from "socket.io-client";
import { formatDistanceToNow } from "date-fns";

const SOCKET_URL = "http://localhost:5001";

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [message, setMessage] = useState("");

  const userInfo = useAuthStore((state) => state.userInfo);
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const { data: conversations, isLoading: isConvLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const { data } = await api.get('/chat/conversations');
      return data;
    },
    enabled: !!userInfo,
  });

  const { data: messages, isLoading: isMsgLoading } = useQuery({
    queryKey: ['messages', selectedUser?._id],
    queryFn: async () => {
      const { data } = await api.get(`/chat/${selectedUser._id}`);
      return data;
    },
    enabled: !!selectedUser,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data: any) => api.post('/chat', data),
    onSuccess: (newMsg) => {
      queryClient.setQueryData(['messages', selectedUser._id], (old: any) => [...(old || []), newMsg.data]);
      setMessage("");
    },
  });

  useEffect(() => {
    if (userInfo) {
      const newSocket = io(SOCKET_URL);
      newSocket.emit('join', userInfo._id);

      newSocket.on('new_message', (msg) => {
        if (selectedUser && msg.sender._id === selectedUser._id) {
          queryClient.setQueryData(['messages', selectedUser._id], (old: any) => [...(old || []), msg]);
        }
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [userInfo, selectedUser, queryClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      sendMessageMutation.mutate({
        receiverId: selectedUser._id,
        content: message,
      });
    }
  };

  return (
    <div className="pt-20 h-screen flex flex-col md:flex-row max-w-7xl mx-auto overflow-hidden">
      {/* Sidebar - Conversations List */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col bg-slate-900/20 ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-white/5">
          <h1 className="text-xl font-bold text-white mb-4">Messages</h1>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/30 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isConvLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 animate-pulse rounded-xl" />)}
            </div>
          ) : conversations?.length > 0 ? (
            conversations.map((conv: any) => (
              <div 
                key={conv.user._id}
                onClick={() => setSelectedUser(conv.user)}
                className={`p-4 flex gap-3 hover:bg-white/5 cursor-pointer transition-all border-l-2 ${selectedUser?._id === conv.user._id ? 'bg-blue-500/5 border-blue-500' : 'border-transparent'}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-white/10">
                    {conv.user.avatar ? <img src={conv.user.avatar} alt={conv.user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold">{conv.user.name.substring(0, 1)}</div>}
                  </div>
                  <FaCircle className="absolute bottom-0 right-0 text-green-500 border-2 border-[#07111F] text-[10px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-slate-200 truncate">{conv.user.name}</h3>
                    <span className="text-[10px] text-slate-500">{conv.lastMessage ? formatDistanceToNow(new Date(conv.lastMessage.createdAt), { addSuffix: false }) : ''}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{conv.lastMessage?.content || 'Start a conversation'}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-slate-500 text-sm">No conversations found.</div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col bg-[#07111F] ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between glass">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedUser(null)} className="md:hidden p-2 text-slate-400">
                  <FaSearch /> {/* Reusing an icon for back button for now */}
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-white/10">
                  {selectedUser.avatar ? <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold">{selectedUser.name.substring(0, 1)}</div>}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{selectedUser.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white p-2">
                <FaEllipsisV />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/10">
              {isMsgLoading ? (
                <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" /></div>
              ) : (
                messages?.map((msg: any) => (
                  <div key={msg._id} className={`flex ${msg.sender._id === userInfo?._id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3 text-sm ${msg.sender._id === userInfo?._id ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'}`}>
                      <p>{msg.content}</p>
                      <div className={`text-[9px] mt-1.5 font-medium ${msg.sender._id === userInfo?._id ? 'text-blue-100' : 'text-slate-500'}`}>
                        {format(new Date(msg.createdAt), 'HH:mm')}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/5 bg-slate-900/30">
              <form onSubmit={handleSend} className="flex gap-3">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-slate-800/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/30 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  className="w-12 h-12 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/20"
                >
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center opacity-50">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-3xl mb-4 border border-white/5">
              <FaEnvelope className="text-slate-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-300">Your Messages</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xs">Select a conversation from the sidebar to start chatting with other developers.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Add format import
import { format } from "date-fns";
import { FaEnvelope } from "react-icons/fa";
