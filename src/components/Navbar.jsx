import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setUserDropdown(false); }, [location]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
    }
  }

  function handleLogout() { logout(); navigate('/login'); }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
  ];
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: 'var(--nav-height)',
      background: scrolled ? 'rgba(250,249,246,0.97)' : 'rgba(250,249,246,0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition: 'border-color var(--transition), box-shadow var(--transition)',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
    }}>
      <div style={{
        maxWidth: 1260, margin: '0 auto', padding: '0 24px',
        height: '100%', display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0, marginRight: 4 }}>
          <div style={{
            width: 34, height: 34, background: 'var(--charcoal)', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>🛒</div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1 }}>
              Easy Groceries
            </div>
            <div style={{ fontSize: '0.58rem', color: 'var(--ink-muted)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 2 }}>
              Fresh &amp; Local
            </div>
          </div>
        </Link>

        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 380 }}>
          <div style={{ position: 'relative' }}>
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search products…"
              style={{
                width: '100%', padding: '8px 36px 8px 14px',
                border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem', outline: 'none', background: 'var(--white)',
                color: 'var(--ink)', fontFamily: 'var(--font-body)',
                transition: 'border-color var(--transition)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--ink)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button type="submit" style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--ink-muted)',
            }}>⌕</button>
          </div>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }} className="nav-desktop">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '6px 14px', borderRadius: 6, fontWeight: 500, fontSize: '0.88rem',
              color: isActive(link.to) ? 'var(--ink)' : 'var(--ink-mid)',
              background: isActive(link.to) ? 'var(--paper-dark)' : 'transparent',
              borderBottom: isActive(link.to) ? '2px solid var(--charcoal)' : '2px solid transparent',
              transition: 'all var(--transition)', textDecoration: 'none',
            }}
            onMouseEnter={e => { if (!isActive(link.to)) e.target.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { if (!isActive(link.to)) e.target.style.color = 'var(--ink-mid)'; }}
            >{link.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 'auto' }}>
          <Link to="/wishlist" style={{ position: 'relative', ...iconBtn }}>
            <span style={{ fontSize: 17, color: 'var(--ink-mid)' }}>♡</span>
            {wishlist.length > 0 && <span style={badgeStyle}>{wishlist.length}</span>}
          </Link>

          <Link to="/cart" style={{ position: 'relative', ...iconBtn }}>
            <span style={{ fontSize: 17, color: 'var(--ink-mid)' }}>🛒</span>
            {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
          </Link>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserDropdown(p => !p)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 12px 6px 8px',
                background: 'var(--paper-dark)', border: '1px solid var(--border)',
                borderRadius: 8, cursor: 'pointer',
                color: 'var(--ink)', fontWeight: 600, fontSize: '0.85rem',
                fontFamily: 'var(--font-body)', transition: 'background var(--transition)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--paper-dark)'}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: 6, background: 'var(--charcoal)',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {user.username[0].toUpperCase()}
                </div>
                <span style={{ maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.username}
                </span>
                <span style={{ fontSize: 9, color: 'var(--ink-muted)' }}>{userDropdown ? '▲' : '▼'}</span>
              </button>

              {userDropdown && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 160,
                  background: 'var(--white)', borderRadius: 10,
                  boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)',
                  overflow: 'hidden', animation: 'slideDown 0.15s ease', zIndex: 200,
                }}>
                  <Link to="/profile" style={dropItem}>My Profile</Link>
                  <Link to="/wishlist" style={dropItem}>Wishlist</Link>
                  <div style={{ height: 1, background: 'var(--border)' }} />
                  <button onClick={handleLogout} style={{ ...dropItem, border: 'none', width: '100%', textAlign: 'left', color: '#c00' }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '7px 18px', fontSize: '0.85rem' }}>
              Sign In
            </Link>
          )}

          <button onClick={() => setMenuOpen(p => !p)} className="hamburger" style={{
            background: 'none', border: 'none', fontSize: 20, cursor: 'pointer',
            color: 'var(--ink)', display: 'none', padding: 4,
          }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          background: 'var(--white)', borderTop: '1px solid var(--border)',
          padding: '12px 24px 18px', animation: 'slideDown 0.15s ease',
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              display: 'block', padding: '10px 0', color: 'var(--ink)',
              fontWeight: 500, borderBottom: '1px solid var(--border)', textDecoration: 'none',
            }}>{link.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

const iconBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 36, height: 36, borderRadius: 8,
  background: 'transparent', textDecoration: 'none',
  transition: 'background var(--transition)',
};

const badgeStyle = {
  position: 'absolute', top: -3, right: -3,
  background: 'var(--charcoal)', color: 'white',
  width: 16, height: 16, borderRadius: 4,
  fontSize: 10, fontWeight: 700,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '2px solid var(--paper)',
};

const dropItem = {
  display: 'block', padding: '10px 16px',
  color: 'var(--ink)', fontWeight: 500, fontSize: '0.85rem',
  textDecoration: 'none', cursor: 'pointer', background: 'none',
  fontFamily: 'var(--font-body)', transition: 'background var(--transition)',
};
