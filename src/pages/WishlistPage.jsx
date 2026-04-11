import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function moveToCart(product) { addToCart(product, 1); toggleWishlist(product); navigate('/cart'); }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <div style={{ background: 'var(--charcoal)', padding: '80px 24px 32px' }}>
        <div className="page-container">
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.9rem', margin: 0 }}>Wishlist</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 5, fontSize: '0.85rem' }}>{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="page-container" style={{ padding: '36px 24px' }}>
        {wishlist.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♡</div>
            <h3>Nothing saved yet</h3>
            <p>Tap ♡ on any product to save it here.</p>
            <Link to="/shop" className="btn-primary" style={{ marginTop: 22, display: 'inline-flex' }}>Browse Products →</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
            {wishlist.map(product => (
              <div key={product.id} style={{
                background: 'var(--white)', border: '1px solid var(--border)',
                borderRadius: 12, overflow: 'hidden',
                transition: 'border-color var(--transition), box-shadow var(--transition)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink-muted)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Link to={`/product/${product.id}`}>
                  <div style={{ height: 140, background: 'var(--paper-dark)', overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                      onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'flex'; e.target.parentElement.style.alignItems = 'center'; e.target.parentElement.style.justifyContent = 'center'; e.target.parentElement.style.fontSize = '56px'; e.target.parentElement.innerHTML = product.emoji; }} />
                  </div>
                </Link>
                <div style={{ padding: '14px 16px 16px' }}>
                  <p style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 3 }}>{product.category}</p>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '0.92rem', marginBottom: 7, lineHeight: 1.3 }}>{product.name}</h3>
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginBottom: 14 }}>
                    <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>${product.price.toFixed(2)}</span>
                    {product.originalPrice && <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-primary" onClick={() => moveToCart(product)} disabled={!product.inStock}
                      style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '0.8rem', opacity: product.inStock ? 1 : 0.5 }}>
                      {product.inStock ? 'Move to Cart' : 'Out of Stock'}
                    </button>
                    <button onClick={() => toggleWishlist(product)} style={{
                      width: 34, height: 34, borderRadius: 6, border: '1.5px solid var(--border)',
                      background: 'none', cursor: 'pointer', fontSize: 15,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transition: 'background var(--transition)', color: '#999',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fff0f0'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    title="Remove">✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
