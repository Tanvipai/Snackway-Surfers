import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';

/* ── Category config ──────────────────────────────────── */
const AISLES = [
  { id: '', label: 'All' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'bakery', label: 'Cereal' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'vegetables', label: 'Veggies' },
  { id: 'beverages', label: 'Beverages' },
];

/* ── Card border colours (rotating) ───────────────────── */
const CARD_BORDERS = [
  'rgba(218, 180, 100, 0.7)',
  'rgba(180, 200, 220, 0.6)',
  'rgba(218, 180, 100, 0.7)',
  'rgba(180, 200, 220, 0.6)',
  'rgba(218, 180, 100, 0.7)',
  'rgba(180, 200, 220, 0.6)',
];

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get('category') || '';
  const { addToCart, cartCount } = useCart();

  const items = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCat) list = list.filter(p => p.category === activeCat);
    return list;
  }, [activeCat]);

  function toggleCat(id) {
    const p = new URLSearchParams(params);
    if (id) p.set('category', id); else p.delete('category');
    setParams(p);
  }

  return (
    <div style={{
      height: '100vh', width: '100vw', overflow: 'hidden',
      background: `url('/img/cart page/bg.png') center/cover no-repeat`,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>

      {/* ── Animations & Fonts ──────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

        @keyframes shopFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes shopSlideDown {
          0%   { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shopSlideUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoBounceIn {
          0%   { opacity: 0; transform: translateX(-50%) scale(1.8); }
          50%  { opacity: 1; transform: translateX(-50%) scale(0.92); }
          70%  { transform: translateX(-50%) scale(1.06); }
          100% { transform: translateX(-50%) scale(1); }
        }
        @keyframes cardPopIn {
          0%   { opacity: 0; transform: scale(0.8) translateY(16px); }
          70%  { opacity: 1; transform: scale(1.02) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes overlayFade {
          0%   { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        @keyframes charSlideIn {
          0%   { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes cartBounce {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        .shop-card:hover {
          transform: translateY(-2px) !important;
          box-shadow:
            0 0 12px rgba(255, 215, 0, 0.3),
            0 0 24px rgba(255, 215, 0, 0.1),
            0 6px 16px rgba(0,0,0,0.25) !important;
          border-color: rgba(255, 215, 0, 0.5) !important;
        }
        .add-btn:hover {
          background: linear-gradient(to bottom, #ffd36e, #ffb020) !important;
          transform: translateY(-1px);
        }
        .add-btn:active {
          transform: translateY(2px) !important;
          box-shadow: none !important;
        }
        .aisle-tab:hover {
          background: rgba(255,255,255,0.25) !important;
          transform: translateY(-1px);
        }

        /* Scrollbar */
        .product-grid::-webkit-scrollbar { width: 5px; }
        .product-grid::-webkit-scrollbar-track { background: transparent; }
        .product-grid::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
      `}</style>

      {/* ── Dark tint overlay ──────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10, 25, 50, 0.45)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Flash overlay on load ──────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9), rgba(20,40,80,0.6))',
        animation: 'overlayFade 0.7s 0.1s ease-out forwards',
        pointerEvents: 'none',
      }} />

      {/* ══════════ LOGO AREA ═══════════════════════════ */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '8px 24px 0',
        minHeight: 70,
        animation: 'shopSlideDown 0.5s 0.3s ease-out both',
      }}>
        {/* Cart icon – top right */}
        <Link to="/cart" style={{
          position: 'absolute', right: 24, top: 12,
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)',
          borderRadius: 20,
          padding: '8px 16px',
          border: '2px solid rgba(218,180,100,0.5)',
          textDecoration: 'none',
          cursor: 'pointer',
          animation: 'shopFadeIn 0.5s 0.8s ease-out both',
          transition: 'background 0.2s',
        }}>
          <div style={{ position: 'relative' }}>
            <FaShoppingCart size={24} color="#FFD700" />
            {cartCount > 0 && (
              <div style={{
                position: 'absolute', top: -8, right: -10,
                background: 'linear-gradient(135deg, #FF4444, #CC2222)',
                color: '#fff',
                fontSize: 11, fontWeight: 900,
                width: 20, height: 20,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(0,0,0,0.3)',
                animation: 'cartBounce 0.3s ease',
              }}>
                {cartCount}
              </div>
            )}
          </div>
          <span style={{
            color: '#FFD700', fontSize: 14, fontWeight: 800, letterSpacing: 1,
          }}>
            {cartCount}
          </span>
        </Link>

        {/* Centre logo */}
        <img
          src="/img/subway surfers assets/logo.png" alt="Logo"
          style={{
            height: 80, objectFit: 'contain',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
            animation: 'logoBounceIn 0.8s 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
          }}
        />
      </div>

      {/* ══════════ AISLES HORIZONTAL BAR ═══════════════ */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 8,
        padding: '10px 60px',
        marginTop: 8,
        animation: 'shopFadeIn 0.5s 0.6s ease-out both',
      }}>
        {AISLES.map(a => {
          const on = activeCat === a.id;
          return (
            <button
              key={a.id}
              className="aisle-tab"
              onClick={() => toggleCat(a.id)}
              style={{
                background: on
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(255, 255, 255, 0.08)',
                border: on
                  ? '2px solid rgba(255,255,255,0.7)'
                  : '2px solid rgba(255,255,255,0.2)',
                borderRadius: 10,
                padding: '8px 22px',
                color: on ? '#fff' : 'rgba(255,255,255,0.75)',
                fontSize: 14,
                fontWeight: on ? 900 : 700,
                fontFamily: "'Nunito', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: 0.5,
                backdropFilter: 'blur(4px)',
                textTransform: 'capitalize',
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      {/* ══════════ MAIN CONTENT AREA ═══════════════════ */}
      <div style={{
        flex: 1, display: 'flex', position: 'relative', zIndex: 1,
        overflow: 'hidden',
        paddingBottom: 66,
      }}>

        {/* ── Product grid (3 columns) ─────────────────── */}
        <div
          className="product-grid"
          style={{
            flex: 1,
            padding: '16px 40px',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
            alignContent: 'start',
            animation: 'shopFadeIn 0.5s 0.7s ease-out both',
          }}
        >
          {items.map((item, i) => {
            const borderColor = CARD_BORDERS[i % CARD_BORDERS.length];

            return (
              <div
                key={item.id}
                className="shop-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 14,
                  border: `2px solid ${borderColor}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                  padding: '14px 16px',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  animation: `cardPopIn 0.4s ${0.8 + i * 0.06}s ease-out both`,
                  minHeight: 150,
                }}
              >
                {/* Image + name row */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1 }}>
                  <img
                    src={item.image} alt={item.name}
                    style={{
                      width: 60, height: 60,
                      objectFit: 'contain',
                      filter: 'drop-shadow(1px 2px 4px rgba(0,0,0,0.2))',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{
                      color: '#fff', fontSize: 14,
                      fontWeight: 800, lineHeight: 1.3,
                      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}>
                      {item.name}
                    </div>
                    <div style={{
                      color: 'rgba(255,255,255,0.55)', fontSize: 11.5,
                      fontWeight: 600, marginTop: 2,
                    }}>
                      {item.unit}
                    </div>
                    {item.description && (
                      <div style={{
                        color: 'rgba(255,255,255,0.62)', fontSize: 10.5,
                        fontWeight: 600, marginTop: 2,
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {item.description.split('.')[0] + '.'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price + ADD row */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginTop: 10,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{
                      color: '#FFD700', fontSize: 17, fontWeight: 900,
                      textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }}>
                      ₹{item.price.toFixed(2)}
                    </span>
                    <img
                      src="/img/cart page/coin.png" alt=""
                      style={{ width: 16, height: 16 }}
                    />
                  </div>
                  <button
                    className="add-btn"
                    onClick={e => { e.stopPropagation(); addToCart(item); }}
                    style={{
                      background: 'linear-gradient(to bottom, #FFD24D, #FFB020)',
                      border: 'none', borderRadius: 8,
                      padding: '5px 18px', color: '#fff',
                      fontSize: 13, fontWeight: 900,
                      boxShadow: '0 3px 0 #CC8800, 0 4px 8px rgba(0,0,0,0.2)',
                      cursor: 'pointer',
                      fontFamily: "'Nunito', sans-serif",
                      letterSpacing: 1,
                      transition: 'transform 0.15s, box-shadow 0.15s',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    }}
                  >
                    ADD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════ BOTTOM NAV BAR ═════════════════════ */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        height: 62,
        background: 'rgba(15, 25, 45, 0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 80,
        animation: 'shopSlideUp 0.5s 1.0s ease-out both',
      }}>
        <Link to="/home" style={navItem}>
          <FaHome size={24} />
          <span style={navLabel}>HOME</span>
        </Link>
        <Link to="/cart" style={{ ...navItem, color: '#FFD700' }}>
          <FaShoppingCart size={24} />
          <span style={{ ...navLabel, borderBottom: '2px solid #FFD700', paddingBottom: 2 }}>CART</span>
        </Link>
        <Link to="/profile" style={navItem}>
          <FaUser size={22} />
          <span style={navLabel}>PROFILE</span>
        </Link>
      </div>
    </div>
  );
}

/* ── Shared nav link styles ──────────────────────────── */
const navItem = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  textDecoration: 'none', color: 'rgba(255,255,255,0.5)', gap: 4,
  transition: 'color 0.2s',
};
const navLabel = {
  fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
};
