import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaBell, FaHeart, FaComment, FaUserPlus, FaEnvelope, FaAt, FaCheckCircle } from "react-icons/fa";
import api from "../api/api";
import { formatDistanceToNow } from "date-fns";

export default function Notifications() {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await api.get('/notifications');
      return data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => api.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <FaHeart className="text-pink-500" />;
      case 'comment': return <FaComment className="text-blue-500" />;
      case 'follow': return <FaUserPlus className="text-green-500" />;
      case 'message': return <FaEnvelope className="text-purple-500" />;
      case 'mention': return <FaAt className="text-orange-500" />;
      default: return <FaBell className="text-slate-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-2xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 mt-1">Stay updated with your social activity.</p>
        </div>
        <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-500/10">
          <FaCheckCircle />
          Mark all as read
        </button>
      </header>

      <div className="space-y-3">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification: any) => (
            <motion.div
              key={notification._id}
              className={`glass p-4 rounded-2xl border transition-all cursor-pointer ${notification.isRead ? 'border-white/5 opacity-70' : 'border-blue-500/20 bg-blue-500/[0.02]'}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => !notification.isRead && markAsReadMutation.mutate(notification._id)}
            >
              <div className="flex gap-4">
                <div className="shrink-0 mt-1 text-lg">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-800 border border-white/10">
                      {notification.sender.avatar ? (
                        <img src={notification.sender.avatar} alt={notification.sender.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] font-bold">
                          {notification.sender.name.substring(0, 1)}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-200">{notification.sender.name}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {notification.message}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 font-medium">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </div>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 self-center"></div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 glass rounded-3xl border border-white/5">
            <FaBell className="mx-auto text-4xl text-slate-700 mb-4" />
            <p className="text-slate-500 font-medium">No notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
