import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const IMAGES = [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
];

const PostCard = ({ post, index = 0 }) => {
    const imgSrc = IMAGES[index % IMAGES.length];
    const excerpt = (post.content || '').replace(/<[^>]+>/g, '').substring(0, 140);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'border-color 0.3s',
            }}
        >
            {/* Image */}
            <Link to={`/post/${post.id}`} style={{ display: 'block', overflow: 'hidden', height: '200px', flexShrink: 0, position: 'relative' }}>
                <img
                    src={imgSrc}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                }} />
            </Link>

            {/* Content */}
            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Meta */}
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={12} />
                        {post.author?.name || 'Anonymous'}
                    </span>
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: '1.15rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1.3,
                    margin: 0,
                }}>
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p style={{ fontSize: '0.9rem', color: '#71717a', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
                    {excerpt}...
                </p>

                {/* Footer */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto' }}>
                    <Link to={`/post/${post.id}`} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                    }}>
                        Read Article <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PostCard;
