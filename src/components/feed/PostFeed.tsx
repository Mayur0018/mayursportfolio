import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import api from '../../api/api';
import useAuthStore from '../../store/authStore';

const PostFeed = () => {
  const queryClient = useQueryClient();
  const userInfo = useAuthStore((state) => state.userInfo);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await api.get('/posts');
      return data;
    },
  });

  const likeMutation = useMutation({
    mutationFn: (postId) => api.put(`/posts/${postId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass p-5 rounded-2xl border border-white/5 animate-pulse">
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/5" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-white/5 rounded w-1/4" />
                <div className="h-3 bg-white/5 rounded w-1/6" />
              </div>
            </div>
            <div className="h-20 bg-white/5 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {posts?.map((post) => (
        <article key={post._id} className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] shrink-0">
                <div className="w-full h-full rounded-full bg-[#07111F] flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                  {post.user.avatar ? (
                    <img src={post.user.avatar} alt={post.user.username} className="w-full h-full object-cover" />
                  ) : (
                    post.user.username.substring(0, 2).toUpperCase()
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{post.user.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span>@{post.user.username}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            <button className="text-slate-600 hover:text-white p-1 rounded-lg transition-all">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {post.content}
          </p>

          {post.mediaUrl && (
            <div className="rounded-xl overflow-hidden border border-white/10 mb-4 bg-slate-900/50">
              {post.mediaType === 'video' ? (
                <video src={post.mediaUrl} controls className="w-full h-auto max-h-[500px]" />
              ) : (
                <img src={post.mediaUrl} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
              )}
            </div>
          )}

          <div className="flex items-center gap-6 pt-4 border-t border-white/5">
            <button 
              onClick={() => userInfo && likeMutation.mutate(post._id)}
              className={`flex items-center gap-2 text-xs font-medium transition-all ${post.likes.includes(userInfo?._id) ? 'text-pink-500' : 'text-slate-500 hover:text-pink-500'}`}
            >
              <Heart size={18} className={post.likes.includes(userInfo?._id) ? 'fill-current' : ''} />
              {post.likes.length}
            </button>
            <button className="flex items-center gap-2 text-slate-500 hover:text-blue-400 text-xs font-medium transition-all">
              <MessageSquare size={18} />
              0
            </button>
            <button className="flex items-center gap-2 text-slate-500 hover:text-green-400 text-xs font-medium transition-all">
              <Share2 size={18} />
              0
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostFeed;
