import React, { useState, useEffect } from 'react';
import { Code2, Server, Database, Network, Globe, Mail, Linkedin, Github, Plus, Edit2, Trash2, Save, X, Lock, LogOut, ChevronDown, ArrowRight, Zap, Shield, Clock, Users, Moon, Sun, Search, Tag, Share2, MessageSquare, Rss, Twitter, Facebook, Link2 } from 'lucide-react';

const LoginModal = ({ showLoginModal, setShowLoginModal, password, setPassword, loginError, setLoginError, handleLogin }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold dark:text-white">Admin Access</h2>
          </div>
          <button onClick={() => {
            setShowLoginModal(false);
            setPassword('');
            setLoginError('');
          }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
            <X className="w-6 h-6 dark:text-white" />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Enter your GitHub Personal Access Token</p>
        <div className="space-y-4">
          <div className="relative">
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
              placeholder="Enter GitHub token"
              autoFocus
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
          </div>
          {loginError && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg animate-shake">
              <X className="w-4 h-4" />
              <span>{loginError}</span>
            </div>
          )}
          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Login
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Need a token? Create one at: GitHub Settings → Developer settings → Personal access tokens → Generate new token (classic) with 'repo' scope
          </p>
        </div>
      </div>
    </div>
  );
};

const GitHubSetupModal = ({ onClose, onSave }) => {
  const [config, setConfig] = useState({
    owner: '',
    repo: '',
    branch: 'main'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">GitHub Repository Setup</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
            <X className="w-6 h-6 dark:text-white" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">GitHub Username/Organization</label>
            <input
              type="text"
              value={config.owner}
              onChange={(e) => setConfig({...config, owner: e.target.value})}
              placeholder="your-username"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Repository Name</label>
            <input
              type="text"
              value={config.repo}
              onChange={(e) => setConfig({...config, repo: e.target.value})}
              placeholder="my-blog"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Branch</label>
            <input
              type="text"
              value={config.branch}
              onChange={(e) => setConfig({...config, branch: e.target.value})}
              placeholder="main"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
          <button
            onClick={() => onSave(config)}
            disabled={!config.owner || !config.repo}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Configuration
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Blog posts will be stored in /content/blog/ directory as markdown files
          </p>
        </div>
      </div>
    </div>
  );
};

const ShareModal = ({ blog, onClose }) => {
  const blogUrl = `https://yourwebsite.com/blog/${blog.id}`;
  const shareText = `Check out: ${blog.title}`;

  const copyLink = () => {
    navigator.clipboard.writeText(blogUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold dark:text-white">Share Post</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
            <X className="w-6 h-6 dark:text-white" />
          </button>
        </div>
        <div className="space-y-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all"
          >
            <Twitter className="w-6 h-6 text-blue-500" />
            <span className="font-semibold dark:text-white">Share on Twitter</span>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all"
          >
            <Facebook className="w-6 h-6 text-blue-600" />
            <span className="font-semibold dark:text-white">Share on Facebook</span>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all"
          >
            <Linkedin className="w-6 h-6 text-blue-700" />
            <span className="font-semibold dark:text-white">Share on LinkedIn</span>
          </a>
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all"
          >
            <Link2 className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <span className="font-semibold dark:text-white">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentsSection = ({ blogId, darkMode }) => {
  const [comments, setComments] = useState([
    { id: 1, author: 'John Doe', text: 'Great article! Very insightful.', date: '2025-02-11' },
    { id: 2, author: 'Jane Smith', text: 'Thanks for sharing this knowledge.', date: '2025-02-10' }
  ]);
  const [newComment, setNewComment] = useState({ author: '', text: '' });

  const addComment = () => {
    if (newComment.author && newComment.text) {
      setComments([...comments, {
        id: Date.now(),
        author: newComment.author,
        text: newComment.text,
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewComment({ author: '', text: '' });
    }
  };

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        Comments ({comments.length})
      </h3>
      
      <div className="space-y-4 mb-8">
        {comments.map(comment => (
          <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold dark:text-white">{comment.author}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="font-bold dark:text-white">Leave a Comment</h4>
        <input
          type="text"
          placeholder="Nilesh Nerlekar"
          value={newComment.author}
          onChange={(e) => setNewComment({...newComment, author: e.target.value})}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        />
        <textarea
          placeholder="Your Comment"
          value={newComment.text}
          onChange={(e) => setNewComment({...newComment, text: e.target.value})}
          rows="4"
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        />
        <button
          onClick={addComment}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [shareModalBlog, setShareModalBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [githubConfig, setGithubConfig] = useState(() => {
    const saved = localStorage.getItem('githubConfig');
    return saved ? JSON.parse(saved) : { owner: '', repo: '', branch: 'main' };
  });
  
  const [blogs, setBlogs] = useState([]);
  
  const [isWriting, setIsWriting] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'professional',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (githubConfig.owner && githubConfig.repo) {
      loadBlogsFromGitHub();
    }
  }, [githubConfig]);

  const skills = [
    { icon: <Server className="w-8 h-8" />, name: "Infrastructure Management", desc: "Enterprise server deployment & optimization", color: "from-blue-500 to-cyan-500" },
    { icon: <Network className="w-8 h-8" />, name: "Network Administration", desc: "Advanced networking & telecommunications", color: "from-purple-500 to-pink-500" },
    { icon: <Database className="w-8 h-8" />, name: "System Integration", desc: "Seamless multi-platform coordination", color: "from-green-500 to-emerald-500" },
    { icon: <Code2 className="w-8 h-8" />, name: "Automation & Scripting", desc: "Intelligent process automation", color: "from-orange-500 to-red-500" }
  ];

  const stats = [
    { icon: <Zap className="w-6 h-6" />, value: "99.9%", label: "Uptime" },
    { icon: <Shield className="w-6 h-6" />, value: "500+", label: "Issues Resolved" },
    { icon: <Clock className="w-6 h-6" />, value: "24/7", label: "Support" },
    { icon: <Users className="w-6 h-6" />, value: "50+", label: "Locations" }
  ];

  const loadBlogsFromGitHub = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/content/blog?ref=${githubConfig.branch}`
      );
      
      if (!response.ok) {
        console.log('No blog posts found yet or directory does not exist');
        setBlogs([]);
        return;
      }

      const files = await response.json();
      const blogPromises = files
        .filter(file => file.name.endsWith('.md'))
        .map(async (file) => {
          const contentResponse = await fetch(file.download_url);
          const content = await contentResponse.text();
          return parseFrontMatter(content, file.name);
        });

      const loadedBlogs = await Promise.all(blogPromises);
      setBlogs(loadedBlogs.filter(Boolean));
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const parseFrontMatter = (content, filename) => {
    const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (!match) return null;

    const frontMatter = match[1];
    const body = match[2];
    
    const metadata = {};
    frontMatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim();
        if (key.trim() === 'tags') {
          metadata[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map(t => t.trim());
        } else {
          metadata[key.trim()] = value.replace(/['"]/g, '');
        }
      }
    });

    return {
      id: filename.replace('.md', ''),
      title: metadata.title || 'Untitled',
      excerpt: metadata.excerpt || '',
      content: body.trim(),
      category: metadata.category || 'professional',
      tags: metadata.tags || [],
      date: metadata.date || new Date().toISOString().split('T')[0],
      readTime: metadata.readTime || '5 min',
      views: parseInt(metadata.views) || 0
    };
  };

  const createFrontMatter = (blog) => {
    return `---
title: "${blog.title}"
excerpt: "${blog.excerpt}"
category: ${blog.category}
tags: [${blog.tags.join(', ')}]
date: ${blog.date}
readTime: ${blog.readTime}
views: ${blog.views || 0}
---

${blog.content}`;
  };

  const handleLogin = () => {
    if (!githubToken) {
      setLoginError('Please enter a GitHub token');
      return;
    }
    
    if (!githubConfig.owner || !githubConfig.repo) {
      setShowLoginModal(false);
      setShowSetupModal(true);
      return;
    }

    setIsAuthenticated(true);
    setShowLoginModal(false);
    setLoginError('');
  };

  const handleSaveConfig = (config) => {
    setGithubConfig(config);
    localStorage.setItem('githubConfig', JSON.stringify(config));
    setShowSetupModal(false);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setGithubToken('');
    setIsWriting(false);
    setEditingBlog(null);
  };

  const saveToGitHub = async (blog) => {
    if (!githubToken || !githubConfig.owner || !githubConfig.repo) {
      alert('Please configure GitHub settings first');
      return;
    }

    try {
      setLoading(true);
      const filename = `${blog.id}.md`;
      const path = `content/blog/${filename}`;
      const content = createFrontMatter(blog);
      const encodedContent = btoa(unescape(encodeURIComponent(content)));

      let sha = null;
      try {
        const existingFile = await fetch(
          `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${path}?ref=${githubConfig.branch}`,
          {
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );
        if (existingFile.ok) {
          const data = await existingFile.json();
          sha = data.sha;
        }
      } catch (e) {
        console.log('File does not exist yet, will create new');
      }

      const response = await fetch(
        `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `${sha ? 'Update' : 'Create'} blog post: ${blog.title}`,
            content: encodedContent,
            branch: githubConfig.branch,
            ...(sha && { sha })
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save to GitHub');
      }

      await loadBlogsFromGitHub();
      return true;
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      alert('Failed to save to GitHub. Please check your token and try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteFromGitHub = async (blogId) => {
    if (!githubToken || !githubConfig.owner || !githubConfig.repo) {
      alert('Please configure GitHub settings first');
      return;
    }

    try {
      setLoading(true);
      const filename = `${blogId}.md`;
      const path = `content/blog/${filename}`;

      const existingFile = await fetch(
        `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${path}?ref=${githubConfig.branch}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!existingFile.ok) {
        throw new Error('File not found');
      }

      const data = await existingFile.json();

      const response = await fetch(
        `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${path}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Delete blog post: ${blogId}`,
            sha: data.sha,
            branch: githubConfig.branch
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete from GitHub');
      }

      await loadBlogsFromGitHub();
      return true;
    } catch (error) {
      console.error('Error deleting from GitHub:', error);
      alert('Failed to delete from GitHub. Please check your token and try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    const blog = editingBlog ? {
      ...newBlog,
      id: editingBlog.id,
      date: editingBlog.date,
      views: editingBlog.views
    } : {
      ...newBlog,
      id: `post-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      readTime: Math.ceil(newBlog.content.split(' ').length / 200) + ' min',
      views: 0
    };

    const success = await saveToGitHub(blog);
    if (success) {
      setIsWriting(false);
      setEditingBlog(null);
      setNewBlog({ title: '', excerpt: '', content: '', category: 'professional', tags: [] });
      setActiveSection('blog');
    }
  };

  const handleEdit = (blog) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setNewBlog({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags || []
    });
    setEditingBlog(blog);
    setIsWriting(true);
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteFromGitHub(id);
    }
  };

  const addTag = () => {
    if (tagInput && !newBlog.tags.includes(tagInput)) {
      setNewBlog({...newBlog, tags: [...newBlog.tags, tagInput]});
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setNewBlog({...newBlog, tags: newBlog.tags.filter(t => t !== tag)});
  };

  const filteredBlogs = blogs
    .filter(blog => filterCategory === 'all' || blog.category === filterCategory)
    .filter(blog => 
      searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const generateRSS = () => {
    const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Your IT Blog</title>
    <description>IT Infrastructure insights and experiences</description>
    <link>https://yourwebsite.com</link>
    ${blogs.map(blog => `
    <item>
      <title>${blog.title}</title>
      <description>${blog.excerpt}</description>
      <link>https://yourwebsite.com/blog/${blog.id}</link>
      <pubDate>${blog.date}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;
    
    const blob = new Blob([rssContent], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feed.xml';
    a.click();
  };

  const renderHome = () => (
    <div className="space-y-0">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 opacity-70"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        
        <div className="relative text-center space-y-8 px-4 animate-fade-in-up z-10">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl mb-4 shadow-2xl animate-float">
            <Server className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            IT Infrastructure
            <br />
            <span className="text-6xl md:text-7xl">Professional</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Building <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">robust, scalable</span> technology solutions that power modern businesses
          </p>
          <div className="flex gap-4 justify-center pt-6 flex-wrap">
            <button 
              onClick={() => setActiveSection('about')} 
              className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              Learn More 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setActiveSection('contact')} 
              className="px-10 py-4 border-3 border-gray-800 dark:border-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-bold hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-800 hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              Get in Touch
            </button>
          </div>
          <div className="pt-8 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-400 mx-auto" />
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center text-white transform hover:scale-110 transition-all">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4 dark:text-white">Core Expertise</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-16">Specialized skills that drive technological excellence</p>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className={`inline-block p-4 bg-gradient-to-br ${skill.color} rounded-xl mb-4 text-white transform group-hover:scale-110 transition-transform`}>
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">{skill.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Me</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-gray-100 dark:border-gray-700">
        <div className="prose prose-lg max-w-none">
          <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            I'm an IT infrastructure professional with extensive experience in supporting enterprise technology ecosystems. 
            My expertise spans infrastructure management, telecommunications systems, and cross-functional technical coordination.
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Currently working in IT support, I specialize in managing complex technical environments including phone systems, 
            server infrastructure, and hardware deployments across multiple locations. I'm passionate about automation, 
            process improvement, and building solutions that make technology more reliable and accessible.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all">
          <h3 className="text-5xl font-bold mb-3">5+</h3>
          <p className="text-blue-100 text-lg font-medium">Years Experience</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all">
          <h3 className="text-5xl font-bold mb-3">100+</h3>
          <p className="text-purple-100 text-lg font-medium">Projects Completed</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all">
          <h3 className="text-5xl font-bold mb-3">24/7</h3>
          <p className="text-pink-100 text-lg font-medium">Support Coverage</p>
        </div>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      {loading && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          Loading from GitHub...
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Insights, experiences, and technical deep-dives</p>
          {githubConfig.owner && githubConfig.repo && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Connected to: {githubConfig.owner}/{githubConfig.repo}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={generateRSS}
            className="flex items-center gap-2 px-6 py-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl font-bold hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all"
          >
            <Rss className="w-5 h-5" /> RSS Feed
          </button>
          {isAuthenticated ? (
            <button 
              onClick={() => setIsWriting(true)}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" /> Write New Post
            </button>
          ) : (
            <button 
              onClick={() => setShowSetupModal(true)}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <Github className="w-5 h-5" /> Setup GitHub
            </button>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-lg"
          />
        </div>
      </div>
      
      <div className="flex gap-4 mb-12 flex-wrap">
        <button 
          onClick={() => setFilterCategory('all')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
            filterCategory === 'all' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All ({blogs.length})
        </button>
        <button 
          onClick={() => setFilterCategory('professional')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
            filterCategory === 'professional' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Professional ({blogs.filter(b => b.category === 'professional').length})
        </button>
        <button 
          onClick={() => setFilterCategory('personal')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
            filterCategory === 'personal' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Personal ({blogs.filter(b => b.category === 'personal').length})
        </button>
      </div>

      {blogs.length === 0 && !loading ? (
        <div className="text-center py-20">
          <Server className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No blog posts yet</h3>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            {isAuthenticated ? 'Start writing your first post!' : 'Setup GitHub to start blogging'}
          </p>
          {isAuthenticated ? (
            <button 
              onClick={() => setIsWriting(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Write First Post
            </button>
          ) : (
            <button 
              onClick={() => setShowSetupModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Setup GitHub
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-8">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                    blog.category === 'professional' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                  }`}>
                    {blog.category.toUpperCase()}
                  </span>
                  <h2 
                    onClick={() => setSelectedBlog(blog)}
                    className="text-4xl font-bold mb-4 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all cursor-pointer"
                  >
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed mb-4">{blog.excerpt}</p>
                  
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, idx) => (
                        <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blog.readTime}
                    </span>
                    <span>•</span>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.views} views</span>
                  </div>
                </div>
                <div className="flex gap-3 ml-4">
                  <button 
                    onClick={() => setShareModalBlog(blog)}
                    className="p-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all transform hover:scale-110"
                  >
                    <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                  {isAuthenticated && (
                    <>
                      <button 
                        onClick={() => handleEdit(blog)} 
                        className="p-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all transform hover:scale-110"
                      >
                        <Edit2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)} 
                        className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all transform hover:scale-110"
                      >
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setSelectedBlog(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-bold mb-4 dark:text-white">{selectedBlog.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{selectedBlog.date}</span>
                  <span>•</span>
                  <span>{selectedBlog.readTime}</span>
                  <span>•</span>
                  <span>{selectedBlog.views} views</span>
                </div>
              </div>
              <button onClick={() => setSelectedBlog(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-6 h-6 dark:text-white" />
              </button>
            </div>
            <div className="p-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedBlog.content}</p>
              <CommentsSection blogId={selectedBlog.id} darkMode={darkMode} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBlogEditor = () => (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {editingBlog ? 'Edit Post' : 'Write New Post'}
        </h1>
        <button 
          onClick={() => {
            setIsWriting(false);
            setEditingBlog(null);
            setNewBlog({ title: '', excerpt: '', content: '', category: 'professional', tags: [] });
          }}
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
        >
          <X className="w-7 h-7 dark:text-white" />
        </button>
      </div>

      <div className="space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 border border-gray-100 dark:border-gray-700">
        <div>
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">CATEGORY</label>
          <select 
            value={newBlog.category}
            onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg font-semibold"
          >
            <option value="professional">Professional</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">TITLE</label>
          <input 
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
            placeholder="Enter an engaging title..."
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-2xl font-bold"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">EXCERPT</label>
          <input 
            type="text"
            value={newBlog.excerpt}
            onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
            placeholder="Write a compelling summary..."
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">TAGS</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add tags (press Enter)..."
              className="flex-1 px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
            <button onClick={addTag} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {newBlog.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">CONTENT</label>
          <textarea 
            value={newBlog.content}
            onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
            placeholder="Share your story, insights, or technical knowledge..."
            rows="18"
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg leading-relaxed"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            onClick={handlePublish}
            disabled={!newBlog.title || !newBlog.excerpt || !newBlog.content || loading}
            className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-5 h-5" /> {loading ? 'Saving...' : (editingBlog ? 'Update Post' : 'Publish to GitHub')}
          </button>
          <button 
            onClick={() => {
              setIsWriting(false);
              setEditingBlog(null);
              setNewBlog({ title: '', excerpt: '', content: '', category: 'professional', tags: [] });
            }}
            className="px-10 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const ContactForm = () => {
    const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
    
    const handleSubmit = () => {
      alert('Message sent! (In a real site, this would send an email)');
      setContactData({ name: '', email: '', message: '' });
    };

    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-10 shadow-lg border border-gray-200 dark:border-gray-600">
        <h3 className="text-3xl font-bold mb-8 dark:text-white">Send a Message</h3>
        <div className="space-y-5">
          <input 
            type="text" 
            placeholder="Nilesh Nerlekar" 
            value={contactData.name}
            onChange={(e) => setContactData({...contactData, name: e.target.value})}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg" 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            value={contactData.email}
            onChange={(e) => setContactData({...contactData, email: e.target.value})}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg" 
          />
          <textarea 
            placeholder="Your Message" 
            rows="6" 
            value={contactData.message}
            onChange={(e) => setContactData({...contactData, message: e.target.value})}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg" 
          />
          <button 
            onClick={handleSubmit}
            className="w-full px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Send Message
          </button>
        </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get in Touch</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400">
          Let's collaborate and build something amazing together
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <a href="mailto:your.email@example.com" className="group flex flex-col items-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <span className="font-bold text-lg dark:text-white">Email</span>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mb-4 group-hover:scale-110 transition-transform">
            <Linkedin className="w-8 h-8 text-white" />
          </div>
          <span className="font-bold text-lg dark:text-white">LinkedIn</span>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div className="p-4 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mb-4 group-hover:scale-110 transition-transform">
            <Github className="w-8 h-8 text-white" />
          </div>
          <span className="font-bold text-lg dark:text-white">GitHub</span>
        </a>
      </div>

      <ContactForm />
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors ${darkMode ? 'dark' : ''}`}>
      {showLoginModal && <LoginModal 
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        password={githubToken}
        setPassword={setGithubToken}
        loginError={loginError}
        setLoginError={setLoginError}
        handleLogin={handleLogin}
      />}

      {showSetupModal && <GitHubSetupModal onClose={() => setShowSetupModal(false)} onSave={handleSaveConfig} />}

      {shareModalBlog && <ShareModal blog={shareModalBlog} onClose={() => setShareModalBlog(null)} />}
      
      <nav className={`bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-all ${scrollY > 50 ? 'py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center gap-3 text-2xl font-bold cursor-pointer group"
              onClick={() => { setActiveSection('home'); setIsWriting(false); }}
            >
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">YourName</span>
            </div>
            <div className="flex items-center gap-8">
              {['home', 'about', 'blog', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => { setActiveSection(section); setIsWriting(false); }}
                  className={`font-bold capitalize transition-all relative ${
                    activeSection === section 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  )}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <Lock className="w-4 h-4" /> Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        {isWriting ? renderBlogEditor() : 
         activeSection === 'home' ? renderHome() :
         activeSection === 'about' ? renderAbout() :
         activeSection === 'blog' ? renderBlog() :
         renderContact()}
      </main>

      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-300 text-lg">© 2025 Nilesh Nerlekar. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Built with passion for technology and innovation</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;