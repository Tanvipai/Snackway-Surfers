import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'rgba(255,255,255,0.7)', padding: '52px 0 24px' }}>
      <div className="page-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 36, marginBottom: 44 }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛒</div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'white' }}>Easy Groceries</div>
                <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>Fresh &amp; Local</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: 210 }}>
              Bringing the freshest produce and premium groceries right to your doorstep.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 14, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[{ to: '/', label: 'Home' }, { to: '/shop', label: 'Shop All' }, { to: '/cart', label: 'My Cart' }, { to: '/wishlist', label: 'Wishlist' }, { to: '/about', label: 'About' }].map(l => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color var(--transition)' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 14, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Categories</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[['fruits','Fruits'],['vegetables','Vegetables'],['dairy','Dairy'],['bakery','Bakery'],['beverages','Beverages'],['snacks','Snacks']].map(([id, label]) => (
                <li key={id}>
                  <Link to={`/shop?category=${id}`} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color var(--transition)' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 14, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['📍', '123 Green Street, Fresh City'],
                ['📞', '+1 (800) 123-4567'],
                ['✉️', 'hello@easygroceries.com'],
                ['🕐', 'Mon–Sat: 8am – 9pm'],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>© 2026 Easy Groceries. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Refunds'].map(t => (
              <span key={t} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
