import React, { useState, useEffect } from 'react';
import { SeoHead } from '../components/SeoHead';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../services/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { BlogPost, SAMPLE_POSTS } from '../lib/sampleData';
import { LogIn, LogOut, Plus, Trash2, Edit3, Settings, Play } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<BlogPost>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user && user.email === 'mandaraoilmill@gmail.com') {
        fetchPosts();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'posts');
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
     try {
       await signOut(auth);
     } catch (e) {
       console.error(e);
     }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) {
      alert("Missing required fields");
      return;
    }
    
    // Auto-generate focus keyword & meta from title if empty
    const postToSave = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      metaTitle: form.metaTitle || form.title,
      metaDescription: form.metaDescription || form.content.substring(0, 150),
      focusKeyword: form.focusKeyword || '',
      category: form.category || 'General',
      publishedAt: form.publishedAt || Date.now(),
      authorId: user.uid
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'posts', editingId), postToSave);
      } else {
        await addDoc(collection(db, 'posts'), postToSave);
      }
      setForm({});
      setEditingId(null);
      fetchPosts();
    } catch (error) {
       try {
          handleFirestoreError(error, editingId ? OperationType.UPDATE : OperationType.CREATE, `posts/${editingId}`);
       } catch (e: any) {
          alert('Error: ' + e.message);
       }
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete this post?")) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
    } catch (error) {
       handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    }
  };

  const seedDatabase = async () => {
     if(!confirm("Inject sample posts into the database?")) return;
     try {
        for(let p of SAMPLE_POSTS) {
           await addDoc(collection(db, 'posts'), { ...p, authorId: user.uid });
        }
        fetchPosts();
        alert("Seeded 3 posts!");
     } catch (e) {
        console.error(e);
        alert("Seed failed. See console.");
     }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
        <SeoHead title="Admin Login" description="Admin area login" />
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel</h2>
          <button 
            onClick={login}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <LogIn className="w-4 h-4 mr-2" /> Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (user.email !== 'mandaraoilmill@gmail.com') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
         <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
           <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h2>
           <p className="text-gray-600 mb-6">You do not have permission to access the admin panel.</p>
           <button onClick={logout} className="text-sm text-gray-500 hover:underline">Logout</button>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-8">
       <SeoHead title="Admin Dashboard" description="Admin management" />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center">
                <Settings className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">Content & SEO Admin</h1>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{user.email}</span>
                <button onClick={logout} className="text-gray-500 hover:text-red-600" title="Logout">
                   <LogOut className="h-5 w-5" />
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Form Editor */}
             <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center border-b pb-2">
                   {editingId ? <Edit3 className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                   {editingId ? 'Edit Post' : 'Create New SEO Post'}
                </h2>
                
                <form onSubmit={handleSave} className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-medium text-gray-700">Title</label>
                         <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" 
                                value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} required/>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700">URL Slug</label>
                         <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" 
                                value={form.slug || ''} onChange={e => setForm({...form, slug: e.target.value})} placeholder="e.g. car-loan-tips" required/>
                      </div>
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
                      <textarea rows={10} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 font-mono text-sm"
                                value={form.content || ''} onChange={e => setForm({...form, content: e.target.value})} required></textarea>
                   </div>

                   <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                      <h3 className="font-semibold text-blue-800 text-sm">SEO Meta Data</h3>
                      
                      <div>
                         <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                         <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" 
                                value={form.metaTitle || ''} onChange={e => setForm({...form, metaTitle: e.target.value})}/>
                      </div>
                      
                      <div>
                         <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                         <textarea rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" 
                                value={form.metaDescription || ''} onChange={e => setForm({...form, metaDescription: e.target.value})}></textarea>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Focus Keyword</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" 
                                   value={form.focusKeyword || ''} onChange={e => setForm({...form, focusKeyword: e.target.value})}/>
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" 
                                   value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})}/>
                         </div>
                      </div>
                   </div>

                   <div className="flex justify-end gap-3 pt-4">
                      {editingId && (
                         <button type="button" onClick={() => { setForm({}); setEditingId(null); }} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Cancel
                         </button>
                      )}
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                         {editingId ? 'Update Post' : 'Publish Post'}
                      </button>
                   </div>
                </form>
             </div>

             {/* Post List */}
             <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                   <div className="flex justify-between items-center mb-4 border-b pb-2">
                       <h2 className="text-lg font-bold">Published Posts ({posts.length})</h2>
                       <button onClick={seedDatabase} title="Seed 3 sample posts" className="p-1 hover:bg-green-100 text-green-600 rounded">
                           <Play size={18} />
                       </button>
                   </div>
                   
                   <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                      {posts.length === 0 ? (
                         <p className="text-gray-500 text-sm">No posts yet. Write one or hit the play button to seed sample posts.</p>
                      ) : (
                         posts.map(post => (
                            <div key={post.id} className="p-3 border border-gray-100 rounded-lg hover:border-blue-300 transition-colors bg-gray-50 group">
                               <div className="font-semibold text-gray-900 line-clamp-1">{post.title}</div>
                               <div className="text-xs text-gray-500 mb-2">{post.slug}</div>
                               <div className="flex justify-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => { setForm(post); setEditingId(post.id!); }} className="text-xs text-blue-600 hover:underline">Edit</button>
                                  <button onClick={() => handleDelete(post.id!)} className="text-xs text-red-600 hover:underline">Delete</button>
                               </div>
                            </div>
                         ))
                      )}
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
