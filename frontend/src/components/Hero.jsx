import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div style={{
            position: 'relative',
            padding: '7rem 2rem 5rem',
            textAlign: 'center',
            overflow: 'hidden',
            maxWidth: '1280px',
            margin: '0 auto',
        }}>
            {/* Background glow blobs */}
            <div style={{
                position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
                width: '700px', height: '400px', pointerEvents: 'none', zIndex: 0,
            }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '350px', height: '350px', background: 'rgba(99,102,241,0.25)', borderRadius: '50%', filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '350px', height: '350px', background: 'rgba(168,85,247,0.2)', borderRadius: '50%', filter: 'blur(100px)' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <div style={{
                    display: 'inline-block',
                    padding: '0.3rem 1rem',
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    borderRadius: '100px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: '#818cf8',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                }}>
                    The Future of Blogging
                </div>

                <h1 style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    marginBottom: '1.5rem',
                    color: '#fff',
                }}>
                    Share Your Stories<br />
                    <span style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        In A New Reality
                    </span>
                </h1>

                <p style={{
                    fontSize: '1.15rem',
                    color: '#a1a1aa',
                    maxWidth: '560px',
                    margin: '0 auto 2.5rem',
                    lineHeight: 1.7,
                    fontWeight: 500,
                }}>
                    Welcome to the world's most elegant blogging platform. Design, write, and grow your audience with an interface built for tomorrow.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/create" style={{
                        padding: '0.9rem 2rem',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                        textDecoration: 'none',
                        boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
                        display: 'inline-block',
                    }}>
                        ✍️ Start Writing
                    </Link>
                    <a href="#feed" style={{
                        padding: '0.9rem 2rem',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                        textDecoration: 'none',
                        display: 'inline-block',
                    }}>
                        Explore Feed
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
