import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Trash2, Share2 } from 'lucide-react';
import axios from 'axios';

const FALLBACK_POST = {
    id: 1,
    title: 'Designing the Future of Mobile Interfaces',
    content: 'Explore how glassmorphism and micro-interactions are redefining the modern web experience for millions of users worldwide.\n\nThe rise of dark mode interfaces has changed how we think about visual hierarchy and color contrast. Designers now need to consider multiple color schemes and how components adapt across contexts.\n\nMicro-animations, once a luxury, have become an essential tool to communicate state changes and guide user attention. Well-timed feedback loops reduce cognitive load and increase overall engagement.',
    createdAt: new Date().toISOString(),
    author: { name: 'Alex Rivera' },
};

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/blogs/${id}`)
            .then(({ data }) => setPost(data))
            .catch(() => setPost(FALLBACK_POST))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Delete this post?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/');
        } catch (err) {
            alert('Could not delete this post.');
        }
    };

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem' }}>
            Loading Story…
        </div>
    );

    if (!post) return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span style={{ color: '#52525b', fontWeight: 700 }}>Story not found.</span>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#818cf8', fontWeight: 700 }}>← Return Home</button>
        </div>
    );

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ maxWidth: '780px', margin: '0 auto', padding: '3rem 1.5rem 6rem' }}
        >
            {/* Back button */}
            <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', fontWeight: 600, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                <ArrowLeft size={18} /> Back to Feed
            </button>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontFamily: 'Outfit, sans-serif', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                {post.title}
            </h1>

            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '42px', height: '42px', background: 'rgba(99,102,241,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99,102,241,0.2)', fontWeight: 700, fontSize: '1rem', color: '#818cf8' }}>
                        {post.author?.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <div style={{ fontSize: '0.7rem', color: '#52525b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Author</div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{post.author?.name}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#71717a', fontSize: '0.85rem' }}>
                        <Calendar size={15} />
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <button style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', cursor: 'pointer', color: '#a1a1aa', display: 'flex' }}>
                        <Share2 size={16} />
                    </button>
                    {(user?.id === post.authorId || user?.role === 'ADMIN') && (
                        <button onClick={handleDelete} style={{ padding: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px', cursor: 'pointer', color: '#f87171', display: 'flex' }}>
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Cover Image */}
            <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '2.5rem', height: '320px' }}>
                <img
                    src={`https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=70`}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* Content */}
            <div style={{ lineHeight: 1.85, fontSize: '1.05rem', color: '#d4d4d8' }}>
                {(post.content || '').split('\n').filter(Boolean).map((para, i) => (
                    <p key={i} style={{ marginBottom: '1.5rem' }}>{para}</p>
                ))}
            </div>

            {/* CTA bottom */}
            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem 2rem', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)', borderRadius: '20px' }}>
                <p style={{ color: '#52525b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', marginBottom: '0.75rem' }}>End of Story</p>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.25rem' }}>Ready to read more?</h3>
                <button onClick={() => navigate('/')} style={{ padding: '0.8rem 1.75rem', borderRadius: '12px', background: '#4f46e5', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>
                    Discover More Stories →
                </button>
            </div>
        </motion.article>
    );
};

export default PostDetail;
