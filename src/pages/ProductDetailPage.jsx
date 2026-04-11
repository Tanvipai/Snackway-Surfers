import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

function Stars({ rating }) {
  return <span className="stars" style={{ fontSize: 14 }}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find(p => p.id === Number(id));
  if (!product) return (
    <div className="empty-state" style={{ paddingTop: 120 }}>
      <div className="empty-icon">😕</div>
      <h3>Product not found</h3>
      <Link to="/shop" className="btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Back to Shop</Link>
    </div>
  );

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        <div className="page-container" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-muted)', fontSize: '0.82rem', flexWrap: 'wrap' }}>
          {[['/', 'Home'], ['/shop', 'Shop'], [`/shop?category=${product.category}`, product.category]].map(([to, label]) => (
            <span key={to} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link to={to} style={{ textDecoration: 'none', color: 'var(--ink-muted)' }}
                onMouseEnter={e => e.target.style.color = 'var(--ink)'}
                onMouseLeave={e => e.target.style.color = 'var(--ink-muted)'}
              >{label}</Link>
              <span>›</span>
            </span>
          ))}
          <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      <div className="page-container" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>

          {/* Image */}
          <div style={{ position: 'sticky', top: 76 }}>
            <div style={{
              background: 'var(--paper-dark)', border: '1px solid var(--border)',
              borderRadius: 14, overflow: 'hidden', height: 450,
            }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'flex'; e.target.parentElement.style.alignItems = 'center'; e.target.parentElement.style.justifyContent = 'center'; e.target.parentElement.style.fontSize = '130px'; e.target.parentElement.innerHTML = product.emoji; }} />
            </div>
          </div>

          {/* Info */}
          <div style={{ animation: 'slideUp 0.35s ease' }}>
            {/* Badges row */}
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 14 }}>
              <span className="tag">{product.category}</span>
              {product.badge && (
                <span style={{
                  padding: '2px 9px', borderRadius: 4, fontSize: '0.68rem', fontWeight: 700,
                  background: 'var(--charcoal)', color: 'white', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>{product.badge}</span>
              )}
              {!product.inStock && <span className="tag" style={{ background: '#f5f5f5', color: '#888' }}>Out of Stock</span>}
            </div>

            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)', fontSize: '1.9rem', lineHeight: 1.15, marginBottom: 12 }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
              <Stars rating={product.rating} />
              <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.9rem' }}>{product.rating}</span>
              <span style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--ink)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: 'var(--ink-muted)', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount && (
                <span style={{ background: 'var(--amber)', color: 'white', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>
                  -{discount}%
                </span>
              )}
            </div>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', marginBottom: 18 }}>{product.unit}</p>

            <div className="divider" />
            <p style={{ color: 'var(--ink-mid)', fontSize: '0.95rem', lineHeight: 1.72, marginBottom: 24 }}>{product.description}</p>

            {/* Qty */}
            {product.inStock && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <span style={{ fontWeight: 600, color: 'var(--ink-mid)', fontSize: '0.9rem' }}>Qty:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
                  <button onClick={() => setQty(q => Math.max(1,q-1))} style={qtyBtn}>−</button>
                  <span style={{ width: 46, textAlign: 'center', fontWeight: 700, color: 'var(--ink)' }}>{qty}</span>
                  <button onClick={() => setQty(q => q+1)} style={qtyBtn}>+</button>
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <button onClick={handleAdd} disabled={!product.inStock} className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '0.95rem', background: added ? '#2e2e2b' : undefined, opacity: !product.inStock ? 0.5 : 1 }}>
                {!product.inStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button onClick={() => toggleWishlist(product)} style={{
                padding: '12px 16px', border: '1.5px solid var(--border)',
                background: wishlisted ? '#fef0f0' : 'var(--white)',
                borderRadius: 6, cursor: 'pointer', fontSize: '1.2rem',
                transition: 'all var(--transition)',
                borderColor: wishlisted ? '#f0b0b0' : 'var(--border)',
              }}>
                {wishlisted ? '♥' : '♡'}
              </button>
            </div>

            {product.inStock && (
              <button className="btn-outline" onClick={() => { addToCart(product, qty); navigate('/cart'); }}
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Buy Now →
              </button>
            )}

            {/* Trust chips */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
              {['🚚 Free delivery over $30', '↩️ 24hr returns', '✓ Quality checked'].map(t => (
                <span key={t} className="tag" style={{ fontSize: '0.75rem' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 className="section-title">You Might Also Like</h2>
            <p className="section-subtitle">More from {product.category}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 18 }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const qtyBtn = {
  width: 38, height: 38, border: 'none', background: 'var(--paper)',
  cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)',
  transition: 'background var(--transition)', fontFamily: 'var(--font-body)',
};
