import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import axios from '../lib/axios';

const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem 0.9rem 3rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            login(data.user, data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: '100%', maxWidth: '440px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: '28px',
                    padding: '2.5rem 2rem',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Glow */}
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: 'rgba(99,102,241,0.15)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

                {/* Icon */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '14px', background: 'rgba(99,102,241,0.1)', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <LogIn size={30} style={{ color: '#6366f1' }} />
                    </div>
                </div>

                <h2 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 900, marginBottom: '0.5rem' }}>Welcome Back.</h2>
                <p style={{ textAlign: 'center', color: '#71717a', marginBottom: '2rem', fontWeight: 500 }}>Log in to continue your journey.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#52525b', pointerEvents: 'none' }} />
                        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#52525b', pointerEvents: 'none' }} />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
                    </div>

                    {error && (
                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '0.8rem 1rem', color: '#f87171', fontSize: '0.9rem', fontWeight: 600 }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading} style={{
                        marginTop: '0.5rem', padding: '0.9rem', borderRadius: '14px',
                        background: loading ? '#3730a3' : '#4f46e5',
                        color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
                    }}>
                        {loading ? 'Signing In…' : 'Sign In Now'} {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#71717a', fontWeight: 500 }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#818cf8', fontWeight: 700, textDecoration: 'none' }}>Create One</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
