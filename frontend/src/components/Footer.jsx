import React from 'react';
import { Feather } from 'lucide-react';

const Footer = () => (
    <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '4rem 2rem 2rem',
        textAlign: 'center',
        color: '#52525b',
        fontWeight: 500,
        fontSize: '0.9rem',
    }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Feather size={22} style={{ color: '#3f3f46' }} />
                <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#3f3f46' }}>Blogging Paradise</span>
            </div>

            <p style={{ maxWidth: '420px', lineHeight: 1.7 }}>
                The most elegant platform for the modern writer. Build your legacy, one word at a time.
            </p>

            <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['About Us', 'Privacy Policy', 'Contact', 'Careers'].map(link => (
                    <span key={link} style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = '#fff'}
                        onMouseLeave={e => e.target.style.color = '#52525b'}
                    >{link}</span>
                ))}
            </nav>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', width: '100%', maxWidth: '480px', display: 'flex', justifyContent: 'center' }}>
                <p style={{ color: '#3f3f46' }}>© 2026 Blogging Paradise. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
