import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:5000/api/blogs',
                { title, content, published: true },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Creating post failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', padding: '3rem 1.5rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <button onClick={() => navigate(-1)} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#71717a', fontWeight: 600, marginBottom: '3rem', fontSize: '0.95rem',
                }}>
                    <ArrowLeft size={18} /> Back to Feed
                </button>

                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'Outfit, sans-serif', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                        Create Your <span style={{ color: '#6366f1' }}>Masterpiece.</span>
                    </h1>
                    <p style={{ color: '#71717a', fontSize: '1.05rem', fontWeight: 500 }}>
                        Craft a story that resonates with the world.
                    </p>
                </header>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Title */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
                            Article Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. The Philosophy of Digital Minimalism"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            style={{
                                width: '100%', boxSizing: 'border-box',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px', padding: '1rem 1.25rem',
                                color: '#fff', fontSize: '1.2rem', fontWeight: 700,
                                fontFamily: 'Outfit, sans-serif', outline: 'none',
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
                            Your Story
                        </label>
                        <textarea
                            rows={14}
                            placeholder="Start typing your story here..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            style={{
                                width: '100%', boxSizing: 'border-box',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px', padding: '1.25rem',
                                color: '#e4e4e7', fontSize: '1rem', fontWeight: 500,
                                fontFamily: 'Inter, sans-serif', outline: 'none',
                                resize: 'vertical', lineHeight: 1.7,
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '0.8rem 1rem', color: '#f87171', fontWeight: 600 }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" disabled={loading} style={{
                            padding: '0.9rem 2rem', borderRadius: '14px',
                            background: '#4f46e5', color: '#fff',
                            fontWeight: 700, fontSize: '1rem', border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
                            opacity: loading ? 0.7 : 1,
                        }}>
                            <Send size={18} />
                            {loading ? 'Publishing…' : 'Publish Post'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreatePost;
