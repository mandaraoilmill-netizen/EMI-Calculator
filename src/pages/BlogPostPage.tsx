import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SeoHead } from '../components/SeoHead';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../services/firebase';
import { BlogPost, SAMPLE_POSTS } from '../lib/sampleData';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug), limit(1));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          setPost({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost);
        } else {
          // Check sample posts
          const sample = SAMPLE_POSTS.find(p => p.slug === slug);
          if (sample) setPost(sample);
          else setPost(null);
        }
      } catch (error) {
        console.error("Using fallback data due to error", error);
        const sample = SAMPLE_POSTS.find(p => p.slug === slug);
        setPost(sample || null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post completely not found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline">Return to Blog</Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.metaTitle || post.title,
    "description": post.metaDescription,
    "author": {
      "@type": "Person",
      "name": "EMI Calculator Expert"
    },
    "datePublished": new Date(post.publishedAt || Date.now()).toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "EMI Calculators Inc",
      "logo": {
        "@type": "ImageObject",
        "url": import.meta.env.VITE_APP_URL ? `${import.meta.env.VITE_APP_URL}/logo.png` : ""
      }
    }
  };

  return (
    <article className="w-full bg-white pb-24">
      <SeoHead 
        title={post.metaTitle || post.title}
        description={post.metaDescription}
        keywords={post.focusKeyword}
        schema={articleSchema}
        canonical={`/blog/${post.slug}`}
      />

      <div className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blog
          </Link>
          <div className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3 text-center">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex justify-center items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="prose prose-blue prose-lg w-full max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
      </div>
    </article>
  );
}
