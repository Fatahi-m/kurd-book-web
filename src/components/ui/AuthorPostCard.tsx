'use client';

import { AuthorPost } from '@/lib/types';
import { Heart, MessageCircle, Share2, BookOpen, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface AuthorPostCardProps {
  post: AuthorPost;
}

export default function AuthorPostCard({ post }: AuthorPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100">
            {/* Placeholder for avatar if image fails or is missing */}
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
              <span className="text-xs uppercase">{post.authorName.substring(0, 2)}</span>
            </div>
            {/* In a real app, use next/image with proper src */}
            {/* <Image src={post.authorAvatar} alt={post.authorName} fill className="object-cover" /> */}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{post.authorName}</h4>
            <p className="text-xs text-slate-500">{post.date}</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <p className="text-lg text-slate-800 leading-relaxed font-bilal dir-rtl text-right whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Image Attachment */}
      {post.image && (
        <div className="mt-3 relative h-64 w-full bg-slate-100">
          <Image 
            src={post.image} 
            alt="Post content" 
            fill 
            className="object-cover"
          />
        </div>
      )}

      {/* Book Link Badge */}
      {post.bookLink && (
        <div className="px-4 mt-3">
          <Link href={`/book/${post.bookLink.id}`} className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg p-2 hover:bg-amber-100 transition-colors group">
            <div className="bg-amber-200 p-1.5 rounded-md text-amber-700 group-hover:bg-amber-300 transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex-1 text-right">
              <p className="text-xs text-amber-600 font-medium">بەشێک لە کتێبی</p>
              <p className="text-sm font-bold text-slate-800">{post.bookLink.title}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Footer / Actions */}
      <div className="p-4 mt-2 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isLiked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
            <span>{likesCount}</span>
          </button>
          
          <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments}</span>
          </button>
        </div>

        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
