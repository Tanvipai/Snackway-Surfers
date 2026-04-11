import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  'Processing': { bg: '#fff8e6', color: '#a06000' },
  'Shipped':    { bg: '#e8eeff', color: '#2244cc' },
  'Delivered':  { bg: '#eefaf2', color: '#1a6a3a' },
  'Cancelled':  { bg: '#fff0f0', color: '#b00000' },
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const orders = (() => { try { return JSON.parse(localStorage.getItem('eg_orders') || '[]'); } catch { return []; } })();

  function handleLogout() { logout(); navigate('/login'); }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Header */}
      <div style={{ background: 'var(--charcoal)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: '0 auto 14px',
          fontFamily: 'var(--font-heading)',
        }}>
          {user?.username?.[0]?.toUpperCase() || '?'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.5rem', margin: 0 }}>{user?.username}</h1>
        {user?.email && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: 6 }}>{user.email}</p>}
      </div>

      <div className="page-container" style={{ padding: '0 24px 56px', marginTop: -24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, alignItems: 'start' }}>

          {/* Sidebar */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, position: 'sticky', top: 76 }}>
            {[
              { label: '📋 My Orders', active: true },
              { label: '🤍 Wishlist', to: '/wishlist' },
              { label: '🛒 Shop', to: '/shop' },
            ].map(item => item.to ? (
              <Link key={item.label} to={item.to} style={{ display: 'block', padding: '10px 12px', borderRadius: 8, color: 'var(--ink-mid)', fontWeight: 500, fontSize: '0.88rem', textDecoration: 'none', marginBottom: 2, transition: 'background var(--transition)' }}
                onMouseEnter={e => e.target.style.background = 'var(--paper-dark)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >{item.label}</Link>
            ) : (
              <div key={item.label} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--paper-dark)', color: 'var(--ink)', fontWeight: 700, fontSize: '0.88rem', marginBottom: 2 }}>
                {item.label}
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />
            <button onClick={handleLogout} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8,
              border: 'none', background: 'none', color: '#b00', fontWeight: 600, fontSize: '0.88rem',
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'background var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fff0f0'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              🚪 Logout
            </button>
          </div>

          {/* Orders */}
          <div>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)', fontSize: '1.2rem', marginBottom: 22 }}>Order History</h2>

              {orders.length === 0 ? (
                <div className="empty-state" style={{ padding: '36px 0' }}>
                  <div className="empty-icon">📦</div>
                  <h3>No orders yet</h3>
                  <p>Your past orders will appear here.</p>
                  <Link to="/shop" className="btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Start Shopping</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {orders.map(order => {
                    const sc = STATUS_COLORS[order.status] || STATUS_COLORS['Processing'];
                    return (
                      <div key={order.id} style={{ border: '1.5px solid var(--border)', borderRadius: 10, padding: '18px 20px', transition: 'border-color var(--transition)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ink-muted)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                          <div>
                            <p style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '0.92rem', color: 'var(--ink)', marginBottom: 3 }}>{order.id}</p>
                            <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{new Date(order.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: 5, fontSize: '0.75rem', fontWeight: 700 }}>{order.status}</span>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>${Number(order.total).toFixed(2)}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                          {order.items.slice(0, 5).map(item => (
                            <span key={item.id} style={{ background: 'var(--paper-dark)', padding: '3px 9px', borderRadius: 4, fontSize: '0.75rem', color: 'var(--ink-mid)' }}>
                              {item.emoji} {item.name} ×{item.qty}
                            </span>
                          ))}
                          {order.items.length > 5 && <span style={{ background: 'var(--paper-dark)', padding: '3px 9px', borderRadius: 4, fontSize: '0.75rem', color: 'var(--ink-muted)' }}>+{order.items.length - 5} more</span>}
                        </div>
                        {order.address && <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: 8 }}>📍 {order.address}</p>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
