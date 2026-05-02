import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { BlogPost, SAMPLE_POSTS } from '../lib/sampleData';
import { Calendar } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, 'posts'), orderBy('publishedAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
        
        // Use sample posts if db is empty
        if (fetchedPosts.length === 0) {
          setPosts(SAMPLE_POSTS);
        } else {
          setPosts(fetchedPosts);
        }
      } catch (error) {
         console.error("Using fallback data due to error", error);
         setPosts(SAMPLE_POSTS);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "EMI & Loan Finance Blog",
    "url": `${import.meta.env.VITE_APP_URL || "https://www.emi-calculator.com"}/blog`,
    "description": "Expert advice, guides, and tips on managing loans and reducing EMIs."
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 w-full">
      <SeoHead 
        title="Finance & Loan Insights Blog | EMI Calculators"
        description="Read expert guides on personal finance, home loans, car loans, and smart ways to reduce your EMI."
        keywords="loan guide blog, financial planning, tips to reduce emi"
        schema={schema}
        canonical="/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Finance Insights & Loan Guides</h1>
          <p className="mt-4 text-xl text-gray-600">Actionable advice to help you manage debt and save money.</p>
        </div>

        {loading ? (
          <div className="flex justify-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-sm font-medium text-blue-600 mb-2">{post.category}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {post.metaDescription || post.content.substring(0, 120) + '...'}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-auto pt-4 border-t border-gray-50">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
