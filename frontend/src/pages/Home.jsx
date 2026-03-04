import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import PostCard from '../components/PostCard';
import axios from '../lib/axios';

const FALLBACK = [
    { id: 1, title: 'Designing the Future of Mobile Interfaces', content: 'Explore how glassmorphism and micro-interactions are redefining the modern web experience for millions worldwide.', createdAt: new Date(), author: { name: 'Alex Rivera' } },
    { id: 2, title: 'Sustainable Architecture In The Urban Jungle', content: 'Discover innovative ways architects are integrating nature into high-rise developments in dense cities around the globe.', createdAt: new Date(), author: { name: 'Sarah Chen' } },
    { id: 3, title: 'The Rise of Autonomous AI Agents', content: 'Artificial Intelligence is no longer just a tool; it is becoming an autonomous partner in creative and technical processes.', createdAt: new Date(), author: { name: 'Jordan Smith' } },
];

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/blogs')
            .then(({ data }) => setPosts(data.length ? data : FALLBACK))
            .catch(() => setPosts(FALLBACK))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Fixed background orbs */}
            <div style={{ position: 'fixed', top: '-8rem', left: '-8rem', width: '450px', height: '450px', background: 'rgba(99,102,241,0.08)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: 0, right: '-8rem', width: '450px', height: '450px', background: 'rgba(168,85,247,0.08)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Hero */}
            <Hero />

            {/* Posts Section */}
            <section id="feed" style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
                {/* Section header */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Our Journal</span>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'Outfit, sans-serif', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
                            Latest Stories For <span style={{ color: '#6366f1' }}>Curious Minds.</span>
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#71717a', maxWidth: '320px', lineHeight: 1.65, margin: 0 }}>
                            Thought-provoking articles from creators around the globe.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '2.5rem' }} />

                {/* Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: '#52525b', fontWeight: 600, letterSpacing: '0.1em' }}>Loading stories…</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
                        {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
