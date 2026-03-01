import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, PlusCircle, LayoutDashboard, Feather } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <Feather size={28} style={{ color: '#6366f1' }} />
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#fff' }}>
                        Blogging <span style={{ color: '#818cf8' }}>Paradise</span>
                    </span>
                </Link>

                {/* Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/" style={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Home</Link>

                    {user ? (
                        <>
                            <Link to="/create" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a1a1aa', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>
                                <PlusCircle size={18} />
                                Create Post
                            </Link>
                            {user.role === 'ADMIN' && (
                                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a1a1aa', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>
                                    <LayoutDashboard size={18} />
                                    Admin
                                </Link>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e4e4e7', fontWeight: 500 }}>
                                    <User size={17} />
                                    <span>{user.name}</span>
                                </div>
                                <button onClick={handleLogout}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', display: 'flex', alignItems: 'center' }}
                                    title="Logout"
                                >
                                    <LogOut size={19} style={{ color: '#71717a' }} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link to="/login" style={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Login</Link>
                            <Link to="/register" style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '10px',
                                background: '#4f46e5',
                                color: '#fff',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                            }}>Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
