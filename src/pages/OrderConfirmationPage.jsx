import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId') || 'EG-UNKNOWN';
  const total   = params.get('total') || '0.00';
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const steps = ['Order Placed','Packing','On the Way','Delivered'];

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--paper)', paddingTop: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '84px 24px 40px',
    }}>
      <div style={{ maxWidth: 520, width: '100%', animation: visible ? 'slideUp 0.45s ease' : 'none' }}>

        {/* Check */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: 'var(--charcoal)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 36, color: 'white',
        }}>✓</div>

        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)', fontSize: '2rem', textAlign: 'center', marginBottom: 8 }}>
          Order Confirmed
        </h1>
        <p style={{ color: 'var(--ink-muted)', textAlign: 'center', marginBottom: 36, fontSize: '0.95rem' }}>
          Thank you for shopping with Easy Groceries. Your order is being prepared.
        </p>

        {/* Order info */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14, padding: '26px 28px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Order ID</p>
              <p style={{ fontWeight: 700, color: 'var(--ink)', fontFamily: 'monospace', fontSize: '1rem' }}>{orderId}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Total Paid</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--ink)' }}>${Number(total).toFixed(2)}</p>
            </div>
          </div>

          {/* Progress */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ position: 'absolute', top: 14, left: '12%', right: '12%', height: 2, background: 'var(--border)' }}>
              <div style={{ width: '33%', height: '100%', background: 'var(--charcoal)' }} />
            </div>
            {steps.map((step, i) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, position: 'relative', zIndex: 1, flex: 1 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', fontSize: 13,
                  background: i < 2 ? 'var(--charcoal)' : 'var(--border)',
                  color: i < 2 ? 'white' : 'var(--ink-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                }}>{i < 2 ? '✓' : i+1}</div>
                <span style={{ fontSize: '0.68rem', color: i < 2 ? 'var(--ink)' : 'var(--ink-muted)', fontWeight: i < 2 ? 600 : 400, textAlign: 'center', lineHeight: 1.3 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery ETA */}
        <div style={{ background: 'var(--amber-pale)', border: '1px solid rgba(200,130,26,0.2)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <span style={{ fontSize: 28 }}>🚚</span>
          <div>
            <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 2, fontSize: '0.9rem' }}>Estimated Delivery</p>
            <p style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '0.88rem' }}>Today, within 2 hours</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <Link to="/home" className="btn-primary">Continue Shopping</Link>
          <Link to="/profile" className="btn-outline">View Orders</Link>
        </div>
      </div>
    </div>
  );
}
