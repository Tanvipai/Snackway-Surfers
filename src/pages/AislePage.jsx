import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';

/* ── Confetti colour palette ──────────────────────────── */
const CONFETTI_COLORS = ['#FFD600', '#FF4081', '#00E676', '#2979FF', '#FF6D00', '#AA00FF', '#FFD700', '#00BCD4'];

export default function AislePage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      height: '100vh', width: '100vw', overflow: 'hidden',
      background: `url('/img/cart page/tunnel_bg.jpg') center/cover no-repeat`,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>

      {/* ── Animations & Fonts ──────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

        @keyframes aisleSlideDown {
          0%   { opacity: 0; transform: translateY(-40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes aisleSlideUp {
          0%   { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes overlayFade {
          0%   { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        @keyframes tunnelPulse {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.5; }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(-10vh) rotate(0deg); opacity: 0.9; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.2; }
        }
        @keyframes imgFlyIn {
          0%   { opacity: 0; transform: scale(0.5) translateY(40px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .aisle-image {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)) contrast(1.05) saturate(1.1);
        }
        /* Lustre effect on hover */
        .aisle-image:hover {
          filter: drop-shadow(0 15px 30px rgba(255,255,255,0.4)) contrast(1.1) saturate(1.2) brightness(1.15);
          transform: scale(1.03) !important;
          z-index: 10 !important;
        }
      `}</style>

      {/* ── Warm orange overlay ───────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(180,80,20,0.3) 0%, rgba(60,30,10,0.45) 100%)',
        animation: 'tunnelPulse 6s ease-in-out infinite',
      }} />

      {/* ── Confetti particles ───────────────────────── */}
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${3 + Math.random() * 94}%`,
          top: '-4%',
          width: `${5 + Math.random() * 8}px`,
          height: `${5 + Math.random() * 8}px`,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          animation: `confettiFall ${4 + Math.random() * 7}s ${Math.random() * 5}s linear infinite`,
          zIndex: 1, pointerEvents: 'none', opacity: 0.75,
        }} />
      ))}

      {/* ── Flash overlay on load ─────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9), rgba(120,60,20,0.5))',
        animation: 'overlayFade 0.7s 0.1s ease-out forwards',
        pointerEvents: 'none',
      }} />

      {/* ══════════ TOP BAR ══════════════════════════════ */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 18px',
        background: 'rgba(30, 75, 120, 0.78)',
        borderBottom: '2px solid rgba(255,255,255,0.25)',
        animation: loaded ? 'aisleSlideDown 0.6s ease-out both' : 'none',
      }}>
        {/* Timer pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(0,0,0,0.28)', borderRadius: 22,
          padding: '4px 12px 4px 4px',
          border: '1.5px solid rgba(255,255,255,0.18)',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>⏱️</div>
          <div style={{ lineHeight: 1, textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: 17, fontWeight: 800 }}>15</div>
            <div style={{ color: '#C5DCF0', fontSize: 10, fontWeight: 800 }}>MINS</div>
          </div>
        </div>

        {/* Logo */}
        <img
          src="/img/subway surfers assets/logo.png" alt="Logo"
          style={{
            position: 'absolute', left: '50%', top: -8,
            transform: 'translateX(-50%)',
            height: 95, objectFit: 'contain',
            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.45))',
          }}
        />

        {/* Total / Items pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.22)', borderRadius: 22,
          padding: '6px 14px',
          border: '1.5px solid rgba(255,255,255,0.35)',
          backdropFilter: 'blur(4px)',
        }}>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 800, letterSpacing: 0.5 }}>TOTAL/ITEMS</span>
          <img src="/img/cart page/coin.png" alt="" style={{ width: 24, height: 24 }} />
        </div>
      </div>

      {/* ══════════ TITLE ═══════════════════════════════ */}
      <div style={{
        textAlign: 'center', position: 'relative', zIndex: 2,
        padding: '16px 0 0',
        animation: loaded ? 'aisleSlideDown 0.6s 0.5s ease-out both' : 'none',
      }}>
        <h1 style={{
          color: '#fff', fontSize: 38, fontWeight: 900,
          letterSpacing: 4, textTransform: 'uppercase',
          textShadow: '3px 3px 0 rgba(0,0,0,0.5), 0 0 20px rgba(255,160,0,0.2)',
          margin: 0, lineHeight: 1,
          fontFamily: "'Nunito', 'Segoe UI', sans-serif",
        }}>
          CHOOSE YOUR AISLE
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600,
          margin: '8px 0 0', letterSpacing: 1,
          textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
        }}>
          Tap a category & start shopping
        </p>
      </div>

      {/* ══════════ CATEGORY IMAGES (Exactly like reference) ═══════════════════════ */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2,
        padding: '10px 0 60px',
      }}>
        <div style={{
          position: 'relative',
          width: 1000,
          height: 520,
          transform: 'scale(1)', // adjust globally if needed
        }}>

          <img
            src="/img/aisles/dairy.png" alt="Dairy"
            className="aisle-image aisle-dairy"
            onClick={() => navigate('/shop?category=dairy')}
            style={{ position: 'absolute', top: 30, left: -10, width: 260, animation: loaded ? 'imgFlyIn 0.5s 0.4s ease-out both' : 'none', zIndex: 1 }}
          />
          <img
            src="/img/aisles/beverages.png" alt="Beverages"
            className="aisle-image aisle-beverages"
            onClick={() => navigate('/shop?category=beverages')}
            style={{ position: 'absolute', top: 20, left: 700, width: 340, animation: loaded ? 'imgFlyIn 0.5s 0.5s ease-out both' : 'none', zIndex: 2 }}
          />
          <img
            src="/img/aisles/fruits.png" alt="Fruits"
            className="aisle-image aisle-fruits"
            onClick={() => navigate('/shop?category=fruits')}
            style={{ position: 'absolute', top: 290, left: -60, width: 350, animation: loaded ? 'imgFlyIn 0.5s 0.6s ease-out both' : 'none', zIndex: 3 }}
          />
          <img
            src="/img/aisles/snacks.png" alt="Snacks"
            className="aisle-image aisle-snacks"
            onClick={() => navigate('/shop?category=snacks')}
            style={{ position: 'absolute', top: 20, left: 245, width: 440, animation: loaded ? 'imgFlyIn 0.5s 0.7s ease-out both' : 'none', zIndex: 3 }}
          />
          <img
            src="/img/aisles/cereal.png" alt="Cereals"
            className="aisle-image aisle-cereal"
            onClick={() => navigate('/shop?category=bakery')}
            style={{ position: 'absolute', top: 225, left: 730, width: 320, animation: loaded ? 'imgFlyIn 0.5s 0.8s ease-out both' : 'none', zIndex: 5 }}
          />
          <img
            src="/img/aisles/veggies.png" alt="Veggies"
            className="aisle-image aisle-veggies"
            onClick={() => navigate('/shop?category=vegetables')}
            style={{ position: 'absolute', top: 230, left: 320, width: 400, animation: loaded ? 'imgFlyIn 0.5s 0.9s ease-out both' : 'none', zIndex: 6 }}
          />

        </div>
      </div>

      {/* ── Character ──────────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: 65, right: -15, zIndex: 20,
        pointerEvents: 'none',
        animation: loaded ? 'imgFlyIn 0.6s 1.2s ease-out both' : 'none',
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
      }}>
        <img src="/img/cart page/shopchar_nobg.png" alt="Character"
          style={{ height: 260 }}
          onError={e => { e.target.src = '/img/subway surfers assets/char.png'; }} />
      </div>

      {/* ══════════ BOTTOM NAV BAR ═══════════════════════ */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        height: 60, background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(12px)',
        borderTop: '1.5px solid rgba(255,255,255,0.3)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 90,
        animation: loaded ? 'aisleSlideUp 0.5s 1.0s ease-out both' : 'none',
      }}>
        <Link to="/home" style={navItem}><FaHome size={24} /><span style={navLabel}>HOME</span></Link>
        <Link to="/cart" style={{ ...navItem, color: '#3A8BCD' }}><FaShoppingCart size={24} /><span style={navLabel}>CART</span></Link>
        <Link to="/profile" style={navItem}><FaUser size={22} /><span style={navLabel}>PROFILE</span></Link>
      </div>
    </div>
  );
}

/* ── Nav styles ────────────────────────────────────────── */
const navItem = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  textDecoration: 'none', color: '#8A9EAE', gap: 3,
};
const navLabel = { fontSize: 12, fontWeight: 800, letterSpacing: 0.5 };
