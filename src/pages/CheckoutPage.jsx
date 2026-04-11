import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaShoppingCart, FaUser, FaLock, FaTruck, FaUndo } from 'react-icons/fa';

const PAYMENT_METHODS = [
  { id: 'cod',  label: 'Cash on Delivery',   icon: '💵' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi',  label: 'UPI / Net Banking',   icon: '📱' },
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [payment, setPayment] = useState('cod');
  const [form, setForm] = useState({
    name: user?.username || '', email: user?.email || '',
    phone: '', address: '', city: '', zip: '', notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const delivery   = cartTotal >= 30 ? 0 : (cartTotal > 0 ? 4.99 : 0);
  const discount   = cartTotal > 50 ? +(cartTotal * 0.05).toFixed(2) : 0;
  const finalTotal = +(cartTotal + delivery - discount).toFixed(2);

  function set(f, v) { setForm(p => ({ ...p, [f]: v })); setErrors(e => ({ ...e, [f]: '' })); }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    if (payment === 'card') {
      if (!form.cardNum) e.cardNum = 'Required';
      if (!form.cardExp) e.cardExp = 'Required';
      if (!form.cardCvv) e.cardCvv = 'Required';
    }
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const orderId = 'EG-' + Date.now().toString(36).toUpperCase();
    const orders = JSON.parse(localStorage.getItem('eg_orders') || '[]');
    orders.unshift({
      id: orderId, date: new Date().toISOString(),
      items: cart, total: finalTotal, status: 'Processing',
      address: `${form.address}, ${form.city} ${form.zip}`,
    });
    localStorage.setItem('eg_orders', JSON.stringify(orders));
    setTimeout(() => {
      clearCart();
      navigate(`/order-confirmation?orderId=${orderId}&total=${finalTotal}`);
    }, 1200);
  }

  /* ── EMPTY CART ─────────────────────────────────────── */
  if (cart.length === 0) return (
    <div style={{
      height: '100vh', overflow: 'hidden',
      background: `url('/img/cart page/bg.png') center/cover no-repeat`,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      <style>{animCSS}</style>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,25,50,0.45)', pointerEvents: 'none' }} />
      <HeaderBar cartCount={0} />
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2, gap: 16,
      }}>
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 50, border: '2px solid rgba(255,255,255,0.2)',
        }}>🛒</div>
        <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 800, margin: 0,
          textShadow: '2px 2px 0 rgba(0,0,0,0.4)' }}>Nothing to checkout</h2>
        <button onClick={() => navigate('/shop')} style={goldBtn}>
          START SHOPPING →
        </button>
      </div>
      <BottomNav loaded={true} />
    </div>
  );

  /* ── CHECKOUT FORM ──────────────────────────────────── */
  return (
    <div style={{
      height: '100vh', overflow: 'hidden',
      background: `url('/img/cart page/bg.png') center/cover no-repeat`,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      <style>{animCSS}</style>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,25,50,0.45)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Flash overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9), rgba(20,40,80,0.6))',
        animation: 'coFade 0.7s 0.1s ease-out forwards',
        pointerEvents: 'none',
      }} />

      {/* ── HEADER ──────────────────────────────────────── */}
      <HeaderBar cartCount={cartCount} />

      {/* ── BODY ────────────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', gap: 24,
        position: 'relative', zIndex: 2,
        overflow: 'hidden',
        padding: '14px 28px 80px 28px',
        animation: loaded ? 'coFadeIn 0.5s 0.3s ease-out both' : 'none',
      }}>
        <form onSubmit={handleSubmit} style={{
          flex: 1, display: 'flex', gap: 24,
          height: '100%',
        }}>
          {/* ── LEFT: Form fields ──────────────────────── */}
          <div style={{
            flex: 1, overflowY: 'auto', overflowX: 'hidden',
            paddingRight: 8,
          }}>
            {/* Breadcrumb */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600,
              marginBottom: 16,
              animation: loaded ? 'coSlideDown 0.4s 0.4s ease-out both' : 'none',
            }}>
              <Link to="/cart" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Cart</Link>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>Checkout</span>
            </div>

            {/* Delivery Address */}
            <GlassCard title="📍 Delivery Address" loaded={loaded} delay={0.5}>
              <div style={grid2}>
                <FormField label="Full Name *" error={errors.name}>
                  <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} />
                </FormField>
                <FormField label="Phone *" error={errors.phone}>
                  <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} />
                </FormField>
              </div>
              <FormField label="Email" error={errors.email}>
                <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} />
              </FormField>
              <FormField label="Street Address *" error={errors.address}>
                <input style={inputStyle} value={form.address} onChange={e => set('address', e.target.value)} />
              </FormField>
              <div style={grid2}>
                <FormField label="City *" error={errors.city}>
                  <input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} />
                </FormField>
                <FormField label="ZIP Code *" error={errors.zip}>
                  <input style={inputStyle} value={form.zip} onChange={e => set('zip', e.target.value)} />
                </FormField>
              </div>
              <FormField label="Delivery Notes (optional)" error="">
                <textarea
                  style={{ ...inputStyle, minHeight: 56, resize: 'vertical' }}
                  value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
                />
              </FormField>
            </GlassCard>

            {/* Payment */}
            <GlassCard title="💳 Payment Method" loaded={loaded} delay={0.65}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: payment === 'card' ? 16 : 0 }}>
                {PAYMENT_METHODS.map(m => (
                  <label key={m.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                    background: payment === m.id
                      ? 'rgba(255, 215, 0, 0.12)'
                      : 'rgba(255,255,255,0.05)',
                    border: payment === m.id
                      ? '2px solid rgba(255,215,0,0.4)'
                      : '2px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.2s',
                  }}>
                    <input
                      type="radio" name="pay" value={m.id}
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      style={{ accentColor: '#FFD700' }}
                    />
                    <span style={{ fontSize: 20 }}>{m.icon}</span>
                    <span style={{
                      fontWeight: 700, fontSize: 14,
                      color: payment === m.id ? '#FFD700' : 'rgba(255,255,255,0.7)',
                    }}>{m.label}</span>
                  </label>
                ))}
              </div>
              {payment === 'card' && (
                <div style={{ animation: 'coSlideDown 0.2s ease', paddingTop: 4 }}>
                  <FormField label="Card Number" error={errors.cardNum}>
                    <input style={inputStyle} value={form.cardNum || ''} onChange={e => set('cardNum', e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19} />
                  </FormField>
                  <div style={grid2}>
                    <FormField label="Expiry" error={errors.cardExp}>
                      <input style={inputStyle} value={form.cardExp || ''} onChange={e => set('cardExp', e.target.value)} placeholder="MM/YY" maxLength={5} />
                    </FormField>
                    <FormField label="CVV" error={errors.cardCvv}>
                      <input style={inputStyle} value={form.cardCvv || ''} onChange={e => set('cardCvv', e.target.value)} placeholder="123" maxLength={3} type="password" />
                    </FormField>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* ── RIGHT: Order Summary ───────────────────── */}
          <div style={{
            width: 320, flexShrink: 0,
            animation: loaded ? 'coSlideLeft 0.5s 0.6s ease-out both' : 'none',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(14px)',
              borderRadius: 20,
              border: '2px solid rgba(218,180,100,0.3)',
              padding: '22px 20px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            }}>
              <h2 style={{
                color: '#FFD700', fontSize: 16, fontWeight: 900,
                margin: '0 0 18px', letterSpacing: 1,
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}>ORDER REVIEW</h2>

              {/* Item list */}
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 10,
                marginBottom: 16, maxHeight: 200, overflowY: 'auto',
              }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8, overflow: 'hidden',
                        background: 'rgba(255,255,255,0.1)', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <img src={item.image} alt={item.name} style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                        }} onError={e => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<span style="font-size:18px">${item.emoji}</span>`;
                        }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 12.5, color: '#fff' }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>×{item.qty}</div>
                      </div>
                    </div>
                    <span style={{
                      fontWeight: 800, fontSize: 13, color: '#FFD700', flexShrink: 0,
                    }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '14px 0', borderRadius: 1 }} />

              {/* Summary rows */}
              <SRow label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
              <SRow label="Delivery" value={delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}
                vc={delivery === 0 ? '#4CAF50' : undefined} />
              {discount > 0 && <SRow label="Discount (5%)" value={`-$${discount}`} vc="#FF6B6B" />}

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '14px 0', borderRadius: 1 }} />

              {/* Total */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 20,
              }}>
                <span style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>Total</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 900, fontSize: 24, color: '#FFD700',
                    textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
                    ${finalTotal.toFixed(2)}
                  </span>
                  <img src="/img/cart page/coin.png" alt="" style={{ width: 22, height: 22 }} />
                </div>
              </div>

              {/* Place Order button */}
              <button type="submit" disabled={loading} style={{
                ...goldBtn,
                width: '100%',
                opacity: loading ? 0.7 : 1,
              }}>
                {loading ? 'Placing Order…' : 'PLACE ORDER →'}
              </button>

              {/* Trust badges */}
              <div style={{
                display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16,
                fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <FaLock size={10} /> Secure
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <FaUndo size={10} /> Returns
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <FaTruck size={10} /> Fast
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <BottomNav loaded={loaded} />
    </div>
  );
}

/* ══════════ SUB-COMPONENTS ══════════════════════════════ */

function HeaderBar({ cartCount }) {
  return (
    <div style={{
      position: 'relative', zIndex: 10,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '8px 24px 0',
      minHeight: 70,
      animation: 'coSlideDown 0.5s 0.3s ease-out both',
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
              color: '#fff', fontSize: 11, fontWeight: 900,
              width: 20, height: 20, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(0,0,0,0.3)',
            }}>
              {cartCount}
            </div>
          )}
        </div>
        <span style={{ color: '#FFD700', fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>
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
      animation: loaded ? 'coSlideUp 0.5s 0.8s ease-out both' : 'none',
    }}>
      <Link to="/home" style={navItem}><FaHome size={24} /><span style={navLabel}>HOME</span></Link>
      <Link to="/cart" style={{ ...navItem, color: 'rgba(255,255,255,0.5)' }}><FaShoppingCart size={24} /><span style={navLabel}>CART</span></Link>
      <Link to="/profile" style={navItem}><FaUser size={22} /><span style={navLabel}>PROFILE</span></Link>
    </div>
  );
}

function GlassCard({ title, children, loaded, delay = 0 }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(14px)',
      borderRadius: 18,
      border: '2px solid rgba(255,255,255,0.12)',
      padding: '20px 22px',
      marginBottom: 16,
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      animation: loaded ? `coFadeIn 0.4s ${delay}s ease-out both` : 'none',
    }}>
      <h3 style={{
        color: '#FFD700', fontSize: 15, fontWeight: 800,
        margin: '0 0 16px', letterSpacing: 0.5,
        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}>{title}</h3>
      {children}
    </div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{
        display: 'block', color: 'rgba(255,255,255,0.65)',
        fontSize: 12, fontWeight: 700, marginBottom: 5, letterSpacing: 0.3,
      }}>{label}</label>
      {children}
      {error && (
        <p style={{
          color: '#FF6B6B', fontSize: 11, fontWeight: 600, marginTop: 3, margin: '3px 0 0',
        }}>{error}</p>
      )}
    </div>
  );
}

function SRow({ label, value, vc }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600 }}>{label}</span>
      <span style={{ fontWeight: 700, color: vc || '#fff', fontSize: 13 }}>{value}</span>
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

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 10,
  border: '2px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#fff',
  fontSize: 14, fontWeight: 600,
  fontFamily: "'Nunito', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

const goldBtn = {
  background: 'linear-gradient(to bottom, #FFD24D, #FFB020)',
  border: 'none', borderRadius: 14, padding: '13px 32px',
  color: '#fff', fontSize: 15, fontWeight: 800,
  boxShadow: '0 4px 0 #CC8800, 0 8px 20px rgba(0,0,0,0.2)',
  cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  letterSpacing: 1,
  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  transition: 'transform 0.1s, box-shadow 0.1s',
};

const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

/* ── Animation CSS ─────────────────────────────────────── */
const animCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

  @keyframes coFade {
    0%   { opacity: 1; }
    100% { opacity: 0; pointer-events: none; }
  }
  @keyframes coFadeIn {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes coSlideDown {
    0%   { opacity: 0; transform: translateY(-30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes coSlideUp {
    0%   { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes coSlideLeft {
    0%   { opacity: 0; transform: translateX(50px); }
    100% { opacity: 1; transform: translateX(0); }
  }

  /* Input focus glow */
  input:focus, textarea:focus {
    border-color: rgba(255, 215, 0, 0.5) !important;
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.15) !important;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
`;
