import { Link } from 'react-router-dom';

const TEAM = [
  { name: 'Sarah Green', role: 'Founder & CEO', emoji: '👩‍💼', bio: 'Former farmer turned entrepreneur, bringing farm-fresh produce to urban tables.' },
  { name: 'James Roots', role: 'Head of Sourcing', emoji: '👨‍🌾', bio: 'Builds relationships with 50+ local farms to ensure the freshest supply chain.' },
  { name: 'Mia Fresh', role: 'Delivery Manager', emoji: '👩‍🚀', bio: 'Ensures your order arrives within hours, fresh and perfectly packed.' },
];

const MILESTONES = [
  { year: '2020', label: 'Founded', desc: 'Started with 3 farm partners and 50 products.' },
  { year: '2021', label: 'Growth', desc: 'Expanded to 5 cities and 500+ happy customers.' },
  { year: '2023', label: 'Online', desc: 'Launched our online store for seamless shopping.' },
  { year: '2026', label: 'Today', desc: '30+ curated products, delivered fresh daily.' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1a4d2e 0%, #2d7a4f 60%, #4caf80 100%)',
        padding: '120px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
          <span style={{ background: 'rgba(244,196,48,0.2)', color: '#f4c430', padding: '6px 18px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', border: '1px solid rgba(244,196,48,0.3)', display: 'inline-block', marginBottom: 22 }}>
            🌿 OUR STORY
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.15, marginBottom: 20 }}>
            Fresh Food. Real People.<br />Local Roots.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1.08rem', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 36px' }}>
            Easy Groceries was born from a simple belief: everyone deserves access to fresh, affordable, quality food — delivered with care right to their door.
          </p>
          <Link to="/shop" className="btn-gold" style={{ padding: '14px 34px', fontSize: '1rem' }}>
            🛒 Start Shopping
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <h2 className="section-title">Our Mission</h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 20 }}>
                We partner directly with local farms and producers to bring you the freshest groceries, cutting out middlemen so you get better quality at honest prices.
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: 1.8 }}>
                Every item in our store is hand-picked and quality-checked. We believe in transparency — you'll always know where your food comes from.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { emoji: '🌱', title: 'Locally Sourced', desc: '80% of our produce comes from farms within 100 miles' },
                { emoji: '🌍', title: 'Eco Friendly', desc: 'Minimal packaging, reusable bags, carbon-neutral delivery' },
                { emoji: '💚', title: 'Community First', desc: 'We support local farmers and fair trade practices' },
                { emoji: '🔬', title: 'Quality Tested', desc: 'Every product passes our freshness and safety checks' },
              ].map(item => (
                <div key={item.title} style={{
                  background: 'white', borderRadius: 18, padding: 22,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{item.emoji}</div>
                  <h4 style={{ fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6, fontSize: '0.95rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--green-dark)', padding: '72px 0' }}>
        <div className="page-container">
          <h2 className="section-title" style={{ color: 'white', textAlign: 'center' }}>Our Journey</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>Six years of growth, freshness, and community</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginTop: 16 }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} style={{
                textAlign: 'center', padding: '28px 20px',
                background: 'rgba(255,255,255,0.08)', borderRadius: 18,
                border: i === MILESTONES.length - 1 ? '2px solid rgba(244,196,48,0.5)' : '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700,
                  color: i === MILESTONES.length - 1 ? '#f4c430' : 'white', marginBottom: 8,
                }}>{m.year}</div>
                <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 8 }}>{m.label}</div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="page-container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Meet the Team</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>The passionate people behind your groceries</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {TEAM.map(member => (
              <div key={member.name} style={{
                background: 'white', borderRadius: 22, padding: '36px 28px', textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', fontSize: 42,
                  background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  {member.emoji}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-dark)', fontSize: '1.15rem', marginBottom: 4 }}>{member.name}</h3>
                <p style={{ color: 'var(--green-mid)', fontWeight: 600, fontSize: '0.82rem', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.role}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--cream-dark)', padding: '60px 0' }}>
        <div className="page-container" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <h2 className="section-title">Ready to Taste the Difference?</h2>
          <p className="section-subtitle">Browse our full range of fresh, quality groceries.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn-primary" style={{ padding: '13px 32px', fontSize: '1rem' }}>Shop Now →</Link>
            <Link to="/home" className="btn-outline" style={{ padding: '13px 32px', fontSize: '1rem' }}>Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
