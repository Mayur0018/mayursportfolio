import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, Video, Calendar, PenTool, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import useAuthStore from '../../store/authStore';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('none');
  const userInfo = useAuthStore((state) => state.userInfo);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => api.post('/posts', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setContent('');
      setMediaUrl('');
      setMediaType('none');
      toast.success('Post published!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to post');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    mutation.mutate({ content, mediaUrl, mediaType });
  };

  if (!userInfo) return null;

  return (
    <div className="glass p-5 rounded-2xl border border-white/5 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] shrink-0">
            <div className="w-full h-full rounded-full bg-[#07111F] flex items-center justify-center text-xs font-bold text-white">
              {userInfo.username.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your latest project or update..."
            className="flex-1 bg-white/5 rounded-xl px-5 py-3 text-white text-sm outline-none focus:border-blue-500/30 transition-all resize-none min-h-[100px]"
          />
        </div>

        {mediaUrl && (
            <div className="relative mb-4 ml-16 rounded-xl overflow-hidden border border-white/10 max-w-md">
                {mediaType === 'image' ? (
                    <img src={mediaUrl} alt="Preview" className="w-full h-auto" />
                ) : (
                    <video src={mediaUrl} className="w-full h-auto" controls />
                )}
                <button 
                    type="button"
                    onClick={() => { setMediaUrl(''); setMediaType('none'); }}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                    <X size={16} />
                </button>
            </div>
        )}

        <div className="flex justify-between items-center ml-16 pt-3 border-t border-white/5">
          <div className="flex gap-2">
            <button 
                type="button"
                onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) { setMediaUrl(url); setMediaType('image'); }
                }}
                className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
            >
              <Image size={20} />
            </button>
            <button 
                type="button"
                onClick={() => {
                    const url = prompt('Enter video URL:');
                    if (url) { setMediaUrl(url); setMediaType('video'); }
                }}
                className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
            >
              <Video size={20} />
            </button>
          </div>
          <button
            type="submit"
            disabled={mutation.isPending || !content.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          >
            {mutation.isPending ? 'Posting...' : <><Send size={16} /> Post</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
