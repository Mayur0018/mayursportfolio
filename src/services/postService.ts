import connectMongo from '../lib/mongodb';
import Post from '../models/Post';

export async function getPostsService() {
  await connectMongo();
  return Post.find({}).sort({ createdAt: -1 }).populate('user', 'name username avatar');
}

export async function createPostService(userId: string, data: { content: string; mediaUrl?: string; mediaType?: string; }) {
  await connectMongo();
  const post = await Post.create({ user: userId, content: data.content, mediaUrl: data.mediaUrl || '', mediaType: data.mediaType || 'none' });
  return post;
}

export async function likePostService(postId: string, userId: string) {
  await connectMongo();
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');
  const existing = post.likes.find((id: any) => id.toString() === userId);
  if (existing) {
    // unlike
    post.likes = post.likes.filter((id: any) => id.toString() !== userId);
  } else {
    post.likes.push(userId as any);
  }
  await post.save();
  return post;
}
