import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, FileText, BarChart3, Trash2, CheckCircle, Activity, TrendingUp, MoreVertical, Settings } from 'lucide-react';

const MOCK_POSTS = [
    { id: 1, title: 'Designing the Future', author: 'Alex', status: 'Published', date: '2026-03-01', views: 2543 },
    { id: 2, title: 'Modern Relational DBs', author: 'Sarah', status: 'Published', date: '2026-02-28', views: 1821 },
    { id: 3, title: 'The Art of Writing', author: 'Jordan', status: 'Draft', date: '2026-02-25', views: 0 },
    { id: 4, title: 'AI Revolution 2026', author: 'Mike', status: 'Pending', date: '2026-02-20', views: 432 },
];
const MOCK_USERS = [
    { id: 1, name: 'Alex Rivera', email: 'alex@example.com', role: 'USER', status: 'Active', joined: '2026-01-15' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'USER', status: 'Active', joined: '2026-01-20' },
    { id: 3, name: 'Jordan Smith', email: 'jordan@example.com', role: 'ADMIN', status: 'Active', joined: '2025-12-10' },
    { id: 4, name: 'Damian Wayne', email: 'damian@example.com', role: 'USER', status: 'Banned', joined: '2026-02-05' },
];

const cardBase = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '1.75rem',
};

const StatCard = ({ title, value, icon: Icon, color, delta }) => (
    <div style={cardBase}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ padding: '10px', background: `${color}18`, borderRadius: '12px', border: `1px solid ${color}30` }}>
                <Icon size={20} style={{ color }} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} />{delta}
            </span>
        </div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>{title}</div>
        <div style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 900, color: '#fff' }}>{value}</div>
    </div>
);

const statusColor = { Published: '#4ade80', Draft: '#71717a', Pending: '#fbbf24', Active: '#4ade80', Banned: '#f87171', ADMIN: '#818cf8', USER: '#71717a' };

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posts');

    if (!user || user.role !== 'ADMIN') {
        navigate('/');
        return null;
    }

    const stats = [
        { title: 'Total Users', value: MOCK_USERS.length, icon: Users, color: '#6366f1', delta: '+12%' },
        { title: 'Active Stories', value: MOCK_POSTS.length, icon: FileText, color: '#a855f7', delta: '+4.2%' },
        { title: 'Total Reach', value: '12.5K', icon: BarChart3, color: '#ec4899', delta: '+31%' },
        { title: 'Platform Health', value: '98.4%', icon: Activity, color: '#4ade80', delta: '+0.1%' },
    ];

    const tabStyle = (active) => ({
        padding: '0.6rem 1.25rem',
        borderRadius: '10px',
        background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
        color: active ? '#818cf8' : '#71717a',
        border: active ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: '0.9rem',
        display: 'flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.2s',
    });

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '0.5rem' }}>
                        <LayoutDashboard size={36} style={{ color: '#6366f1' }} />
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
                            System <span style={{ color: '#6366f1' }}>Overview</span>
                        </h1>
                    </div>
                    <p style={{ color: '#71717a', fontWeight: 500 }}>Manage your platform, users, and content from one place.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#71717a', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Settings size={17} /> Settings
                    </div>
                    <div style={{ padding: '0.6rem 1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontWeight: 700, color: '#a1a1aa' }}>
                        March 2026
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>

            {/* Table box */}
            <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.75rem', padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                    <button style={tabStyle(activeTab === 'posts')} onClick={() => setActiveTab('posts')}>
                        <FileText size={16} /> Content
                    </button>
                    <button style={tabStyle(activeTab === 'users')} onClick={() => setActiveTab('users')}>
                        <Users size={16} /> Users
                    </button>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto', padding: '1.5rem' }}>
                    {activeTab === 'posts' ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                            <thead>
                                <tr>
                                    {['Title', 'Author', 'Status', 'Views', 'Date', 'Actions'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '0.6rem 1rem', fontSize: '0.7rem', fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_POSTS.map(p => (
                                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 700, color: '#e4e4e7', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</td>
                                        <td style={{ padding: '1rem', color: '#71717a', fontWeight: 500 }}>{p.author}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, background: `${statusColor[p.status]}22`, color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}40` }}>{p.status}</span>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 600 }}>{p.views.toLocaleString()}</td>
                                        <td style={{ padding: '1rem', color: '#52525b', fontSize: '0.85rem' }}>{p.date}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button style={{ padding: '6px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '8px', cursor: 'pointer', color: '#4ade80', display: 'flex' }}><CheckCircle size={15} /></button>
                                                <button style={{ padding: '6px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', cursor: 'pointer', color: '#f87171', display: 'flex' }}><Trash2 size={15} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                            <thead>
                                <tr>
                                    {['User', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '0.6rem 1rem', fontSize: '0.7rem', fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_USERS.map(u => (
                                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#818cf8', fontSize: '0.9rem', flexShrink: 0 }}>
                                                    {u.name[0]}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: '#e4e4e7' }}>{u.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#52525b' }}>{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, background: `${statusColor[u.role]}22`, color: statusColor[u.role], border: `1px solid ${statusColor[u.role]}40` }}>{u.role}</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, background: `${statusColor[u.status]}22`, color: statusColor[u.status], border: `1px solid ${statusColor[u.status]}40` }}>{u.status}</span>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#52525b', fontSize: '0.85rem' }}>{u.joined}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <button style={{ padding: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', color: '#71717a', display: 'flex' }}><MoreVertical size={15} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
