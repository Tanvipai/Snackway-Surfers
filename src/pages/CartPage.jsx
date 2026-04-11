import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaHome, FaShoppingCart, FaUser, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const delivery = cartTotal >= 30 || cartTotal === 0 ? 0 : 4.99;
  const discount = cartTotal > 50 ? +(cartTotal * 0.05).toFixed(2) : 0;
  const finalTotal = +(cartTotal + delivery - discount).toFixed(2);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => { removeFromCart(id); setRemovingId(null); }, 300);
  };

  /* ── EMPTY CART STATE ─────────────────────────────── */
  if (cart.length === 0) return (
    <div style={{
      height: '100vh', overflow: 'hidden',
      background: `url('/img/cart page/cart_bg.png') center/cover no-repeat`,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      <style>{animationStyles}</style>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(50,100,160,0.45)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Top bar */}
      <TopBar />

      {/* Empty message */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2, gap: 16,
        animation: 'cartFadeIn 0.8s ease-out both',
      }}>
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 56, border: '3px solid rgba(255,255,255,0.3)',
          animation: 'cartBounce 2s ease-in-out infinite',
        }}>🛒</div>
        <h2 style={{
          color: '#fff', fontSize: 28, fontWeight: 800, margin: 0,
          textShadow: '2px 2px 0 rgba(0,0,0,0.4)',
        }}>Your cart is empty!</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 600, margin: 0 }}>
          Time to grab some snacks, surfer!
        </p>
        <button onClick={() => navigate('/shop')} style={{
          marginTop: 10,
          background: 'linear-gradient(to bottom, #FFB92E, #FF9400)',
          border: 'none', borderRadius: 14, padding: '12px 32px',
          color: '#fff', fontSize: 16, fontWeight: 800,
          boxShadow: '0 4px 0 #D07000, 0 8px 20px rgba(0,0,0,0.25)',
          cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
          letterSpacing: 1,
        }}>
          START SHOPPING →
        </button>
      </div>

      <BottomNav loaded={true} />
    </div>
  );

  /* ── CART WITH ITEMS ──────────────────────────────── */
  return (
    <div style={{
      height: '100vh', overflow: 'hidden',
      background: `url('/img/cart page/cart_bg.png') center/cover no-repeat`,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      <style>{animationStyles}</style>

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(50,100,160,0.45)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Top bar */}
      <TopBar loaded={loaded} />

      {/* ══════════ BODY ════════════════════════════════ */}
      <div style={{
        flex: 1, display: 'flex', gap: 20,
        position: 'relative', zIndex: 2,
        overflow: 'hidden',
        padding: '16px 20px 80px 20px',
        animation: loaded ? 'cartFadeIn 0.5s 0.3s ease-out both' : 'none',
      }}>

        {/* ── Items list ──────────────────────────────── */}
        <div style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingRight: 8,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 14,
            animation: loaded ? 'cartSlideDown 0.5s 0.4s ease-out both' : 'none',
          }}>
            <h1 style={{
              color: '#fff', fontSize: 26, fontWeight: 800, margin: 0,
              textShadow: '2px 2px 0 rgba(0,0,0,0.4)',
              letterSpacing: 1,
            }}>
              MY CART <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
                ({cartCount} item{cartCount !== 1 ? 's' : ''})
              </span>
            </h1>
            <button onClick={clearCart} style={{
              background: 'rgba(255,60,60,0.2)', border: '1.5px solid rgba(255,60,60,0.4)',
              borderRadius: 10, padding: '6px 14px', color: '#ff7070',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              fontFamily: "'Nunito', sans-serif",
            }}>
              CLEAR ALL
            </button>
          </div>

          {/* Cart items */}
          {cart.map((item, i) => (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: 16,
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '14px 16px',
              marginBottom: 12,
              display: 'flex', alignItems: 'center', gap: 14,
              backdropFilter: 'blur(6px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              animation: removingId === item.id
                ? 'cartItemRemove 0.3s forwards'
                : loaded ? `cartItemSlide 0.4s ${0.5 + i * 0.08}s ease-out both` : 'none',
              transition: 'transform 0.15s',
            }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseOut={e => e.currentTarget.style.transform = ''}>

              {/* Product image */}
              <div style={{
                width: 64, height: 64, borderRadius: 12, flexShrink: 0,
                background: '#f0ece4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)',
              }}>
                <img src={item.image} alt={item.name} style={{
                  width: '85%', height: '85%', objectFit: 'contain',
                }}
                  onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span style="font-size:32px">${item.emoji}</span>`; }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#14304D', fontSize: 15, fontWeight: 800, lineHeight: 1.2 }}>
                  {item.name}
                </div>
                <div style={{ color: '#7A95AD', fontSize: 12, fontWeight: 600, marginTop: 2 }}>
                  {item.unit}
                </div>
              </div>

              {/* Qty controls */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 0,
                background: '#f0ece4', borderRadius: 10,
                border: '1.5px solid rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}>
                <button onClick={() => updateQty(item.id, item.qty - 1)} style={qtyBtn}>
                  <FaMinus size={10} />
                </button>
                <span style={{
                  width: 36, textAlign: 'center', fontWeight: 800,
                  fontSize: 15, color: '#14304D',
                }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} style={qtyBtn}>
                  <FaPlus size={10} />
                </button>
              </div>

              {/* Price */}
              <div style={{ textAlign: 'right', minWidth: 65 }}>
                <div style={{ color: '#E08830', fontSize: 17, fontWeight: 900 }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
                {item.qty > 1 && (
                  <div style={{ color: '#9AB0C4', fontSize: 11, fontWeight: 600 }}>
                    ${item.price.toFixed(2)} ea.
                  </div>
                )}
              </div>

              {/* Remove button */}
              <button onClick={() => handleRemove(item.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#ccc', padding: 6, borderRadius: 8,
                transition: 'color 0.15s',
              }}
                onMouseOver={e => e.currentTarget.style.color = '#e04040'}
                onMouseOut={e => e.currentTarget.style.color = '#ccc'}>
                <FaTrash size={14} />
              </button>
            </div>
          ))}

          {/* Continue shopping link */}
          <button onClick={() => navigate('/shop')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 700,
            marginTop: 6, fontFamily: "'Nunito', sans-serif",
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}>
            ← Continue Shopping
          </button>
        </div>

        {/* ── Order Summary ───────────────────────────── */}
        <div style={{
          width: 300, flexShrink: 0,
          animation: loaded ? 'cartSlideLeft 0.5s 0.6s ease-out both' : 'none',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 20,
            border: '2px solid rgba(255,255,255,0.5)',
            padding: '22px 20px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          }}>
            <h2 style={{
              color: '#14304D', fontSize: 18, fontWeight: 900,
              margin: '0 0 18px', letterSpacing: 0.5,
            }}>ORDER SUMMARY</h2>

            <SRow label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
            <SRow label="Delivery" value={delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}
              vc={delivery === 0 ? '#4CAF50' : undefined} />
            {discount > 0 && <SRow label="Loyalty Discount (5%)" value={`-$${discount}`} vc="#e04040" />}

            {/* Delivery status bar */}
            {delivery === 0 && cartTotal > 0 ? (
              <div style={{
                background: 'rgba(76,175,80,0.12)', border: '1.5px solid rgba(76,175,80,0.3)',
                borderRadius: 10, padding: '8px 12px', marginTop: 14,
                fontSize: 12, fontWeight: 700, color: '#4CAF50',
              }}>✓ Free delivery unlocked!</div>
            ) : delivery > 0 && (
              <div style={{
                background: 'rgba(0,0,0,0.04)', borderRadius: 10, padding: '8px 12px',
                marginTop: 14, fontSize: 12, fontWeight: 600, color: '#7A95AD',
              }}>
                Add <strong style={{ color: '#E08830' }}>${(30 - cartTotal).toFixed(2)}</strong> more for free delivery
              </div>
            )}

            {/* Divider */}
            <div style={{ height: 1.5, background: 'rgba(0,0,0,0.08)', margin: '16px 0', borderRadius: 1 }} />

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <span style={{ fontWeight: 800, fontSize: 16, color: '#14304D' }}>Total</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 900, fontSize: 24, color: '#E08830' }}>${finalTotal.toFixed(2)}</span>
                <img src="/img/cart page/coin.png" alt="" style={{ width: 22, height: 22 }} />
              </div>
            </div>

            {/* Checkout button */}
            <button onClick={() => navigate('/checkout')} style={{
              width: '100%',
              background: 'linear-gradient(to bottom, #FFB92E, #FF9400)',
              border: 'none', borderRadius: 14, padding: '13px',
              color: '#fff', fontSize: 16, fontWeight: 800,
              boxShadow: '0 4px 0 #D07000, 0 8px 20px rgba(0,0,0,0.15)',
              cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
              letterSpacing: 0.5,
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = 'none'; }}
              onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 0 #D07000'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 0 #D07000'; }}>
              CHECKOUT →
            </button>

            {/* Trust badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 14, fontSize: 12, fontWeight: 600, color: '#9AB0C4' }}>
              <span>🔒 Secure</span>
              <span>↩️ Returns</span>
              <span>🚚 Fast</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav loaded={loaded} />
    </div>
  );
}

/* ══════════ SUB‑COMPONENTS ══════════════════════════════ */

function TopBar({ loaded = true }) {
  const { cartCount } = useCart();
  return (
    <div style={{
      position: 'relative', zIndex: 10,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '8px 24px 0',
      minHeight: 70,
      animation: loaded ? 'cartSlideDown 0.6s 0.1s ease-out both' : 'none',
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
        }}
      />
    </div>
  );
}

function BottomNav({ loaded }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      height: 62,
      background: 'rgba(15, 25, 45, 0.92)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 80,
      animation: loaded ? 'cartSlideUp 0.5s 0.8s ease-out both' : 'none',
    }}>
      <Link to="/home" style={navItem}><FaHome size={24} /><span style={navLabel}>HOME</span></Link>
      <Link to="/cart" style={{ ...navItem, color: '#FFD700' }}><FaShoppingCart size={24} /><span style={{ ...navLabel, borderBottom: '2px solid #FFD700', paddingBottom: 2 }}>CART</span></Link>
      <Link to="/profile" style={navItem}><FaUser size={22} /><span style={navLabel}>PROFILE</span></Link>
    </div>
  );
}

function SRow({ label, value, vc }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
      <span style={{ color: '#7A95AD', fontSize: 14, fontWeight: 600 }}>{label}</span>
      <span style={{ fontWeight: 700, color: vc || '#14304D', fontSize: 14 }}>{value}</span>
    </div>
  );
}

/* ── Shared styles ─────────────────────────────────────── */
const navItem = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  textDecoration: 'none', color: 'rgba(255,255,255,0.5)', gap: 4,
  transition: 'color 0.2s',
};
const navLabel = { fontSize: 11, fontWeight: 800, letterSpacing: 1.2 };

const qtyBtn = {
  width: 32, height: 32, border: 'none', background: 'transparent',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#14304D', fontSize: 12, fontWeight: 700,
};

/* ── Animation CSS ─────────────────────────────────────── */
const animationStyles = `
  @keyframes cartFadeIn {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes cartSlideDown {
    0%   { opacity: 0; transform: translateY(-40px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes cartSlideUp {
    0%   { opacity: 0; transform: translateY(50px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes cartSlideLeft {
    0%   { opacity: 0; transform: translateX(60px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes cartSlideRight {
    0%   { opacity: 0; transform: translateX(80px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes cartItemSlide {
    0%   { opacity: 0; transform: translateX(-30px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes cartItemRemove {
    0%   { opacity: 1; transform: translateX(0) scale(1); }
    100% { opacity: 0; transform: translateX(60px) scale(0.8); }
  }
  @keyframes cartBounce {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-12px); }
  }
`;
