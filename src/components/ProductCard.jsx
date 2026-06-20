import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function Stars({ rating }) {
  return (
    <span className="stars">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

const BADGE_STYLES = {
  Sale: { bg: '#1c1c1a', color: '#fff' },
  Popular: { bg: '#c8821a', color: '#fff' },
  Organic: { bg: '#3a5a3a', color: '#fff' },
  Artisan: { bg: '#4a3a6a', color: '#fff' },
  New: { bg: '#1a3a5a', color: '#fff' },
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  const bs = product.badge ? BADGE_STYLES[product.badge] || BADGE_STYLES.New : null;

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color var(--transition), box-shadow var(--transition)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink-muted)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: 'var(--paper-dark)' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.fontSize = '60px'; e.target.parentElement.style.display = 'flex'; e.target.parentElement.style.alignItems = 'center'; e.target.parentElement.style.justifyContent = 'center'; e.target.parentElement.innerHTML = product.emoji; }}
          />

          {product.badge && bs && (
            <span style={{
              position: 'absolute', top: 10, left: 10,
              background: bs.bg, color: bs.color,
              padding: '3px 8px', borderRadius: 4,
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.5px',
            }}>{product.badge.toUpperCase()}</span>
          )}

          {discount && (
            <span style={{
              position: 'absolute', top: 10, right: product.badge ? 10 : 10,
              background: 'var(--amber)', color: 'white',
              padding: '3px 8px', borderRadius: 4,
              fontSize: '0.68rem', fontWeight: 700,
            }}>-{discount}%</span>
          )}

          {!product.inStock && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(250,249,246,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ background: 'var(--ink)', color: 'white', padding: '5px 12px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600 }}>
                Out of Stock
              </span>
            </div>
          )}

          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
            style={{
              position: 'absolute', bottom: 10, right: 10,
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 6,
              width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 15,
              transition: 'background var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = wishlisted ? '#ffe8e8' : 'var(--paper-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
            title={wishlisted ? 'Remove from wishlist' : 'Save'}
          >
            {wishlisted ? '♥' : '♡'}
          </button>
        </div>

        <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>
            {product.category}
          </p>
          <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: 6, lineHeight: 1.3, flex: 1 }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Stars rating={product.rating} />
            <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>({product.reviews})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: 12 }}>{product.unit}</p>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{
              width: '100%', padding: '9px 0',
              background: !product.inStock ? 'var(--paper-dark)' :
                          added ? '#1c1c1a' : 'var(--charcoal)',
              color: !product.inStock ? 'var(--ink-muted)' : 'white',
              border: 'none', borderRadius: 'var(--radius-sm)',
              fontWeight: 600, fontSize: '0.82rem',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              transition: 'background var(--transition)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.2px',
            }}
            onMouseEnter={e => { if (product.inStock && !added) e.target.style.background = 'var(--charcoal-mid)'; }}
            onMouseLeave={e => { if (product.inStock && !added) e.target.style.background = 'var(--charcoal)'; }}
          >
            {!product.inStock ? 'Out of Stock' : added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
