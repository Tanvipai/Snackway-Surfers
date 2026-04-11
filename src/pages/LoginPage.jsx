import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CSS = `
  .lp-scene { perspective: 900px; width: 360px; transition: height 0.5s ease; }
  .lp-scene.signup { height: 490px; }
  .lp-scene.login  { height: 360px; }
  .lp-inner {
    position: relative; width: 100%; height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.4,0.2,0.2,1);
  }
  .lp-inner.flipped { transform: rotateY(180deg); }
  .lp-face {
    position: absolute; inset: 0;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    border-radius: 14px;
    background: var(--charcoal);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    display: flex; flex-direction: column; align-items: center;
    padding: 32px 36px 28px; gap: 12px; box-sizing: border-box;
  }
  .lp-face.back { transform: rotateY(180deg); }
  @keyframes lp-shake {
    0%,100% { transform: translateX(0) }
    25%     { transform: translateX(-7px) }
    75%     { transform: translateX(7px) }
  }
  .lp-face.shake { animation: lp-shake 0.35s ease; }

  .lp-input {
    width: 100%; padding: 11px 15px;
    border-radius: 8px;
    border: 1.5px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.07);
    color: white; font-size: 13.5px; outline: none;
    box-sizing: border-box; font-family: var(--font-body);
    transition: border-color 0.18s, background 0.18s;
  }
  .lp-input::placeholder { color: rgba(255,255,255,0.35); }
  .lp-input:focus { border-color: var(--amber); background: rgba(255,255,255,0.1); }

  .lp-btn {
    width: 100%; padding: 12px; border-radius: 8px;
    border: none; background: var(--amber);
    color: white; font-size: 13px; font-weight: 700;
    font-family: var(--font-body); letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; transition: background 0.18s;
  }
  .lp-btn:hover { background: var(--amber-light); }

  .lp-link {
    color: rgba(255,255,255,0.45); font-size: 12.5px;
    cursor: pointer; text-decoration: underline; text-underline-offset: 3px;
    background: none; border: none; font-family: var(--font-body); padding: 0;
    transition: color 0.15s;
  }
  .lp-link:hover { color: rgba(255,255,255,0.85); }
  .lp-err { color: #ff9090; font-size: 12px; text-align: center; min-height: 14px; }
  .lp-ok  { color: #90e090; font-size: 12px; text-align: center; min-height: 14px; }
`;

const SLATS = 20;

function inject() {
  if (document.getElementById('lp-css')) return;
  const s = document.createElement('style'); s.id = 'lp-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

function Rule({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
    </div>
  );
}

export default function LoginPage() {
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { inject(); }, []);
  useEffect(() => { if (user) navigate('/'); }, [user, navigate]);

  const [isSignup, setIsSignup] = useState(false);
  const [lUser, setLUser] = useState(''); const [lPass, setLPass] = useState('');
  const [lErr, setLErr] = useState(''); const [lShake, setLShake] = useState(false);
  const [sUser, setSUser] = useState(''); const [sEmail, setSEmail] = useState('');
  const [sPass, setSPass] = useState(''); const [sPass2, setSPass2] = useState('');
  const [sErr, setSErr] = useState(''); const [sOk, setSOk] = useState('');
  const [sShake, setSShake] = useState(false);
  const [shutterOpen, setShutterOpen] = useState(false);

  function shake(set) { set(true); setTimeout(() => set(false), 400); }
  function openStore() { setShutterOpen(true); setTimeout(() => navigate('/'), 1600); }

  function handleLogin() {
    if (!lUser.trim() || !lPass) { setLErr('Please fill in all fields.'); shake(setLShake); return; }
    const r = login(lUser.trim(), lPass);
    if (r.ok) { setLErr(''); openStore(); }
    else { setLErr(r.error); shake(setLShake); }
  }
  function handleSignup() {
    setSErr(''); setSOk('');
    if (!sUser.trim() || !sPass || !sPass2) { setSErr('Please fill in all fields.'); shake(setSShake); return; }
    if (sPass !== sPass2) { setSErr('Passwords do not match.'); shake(setSShake); return; }
    if (sPass.length < 4) { setSErr('Password needs at least 4 characters.'); shake(setSShake); return; }
    const r = signup(sUser.trim(), sEmail, sPass);
    if (!r.ok) { setSErr(r.error); shake(setSShake); return; }
    setSOk('Account created! Opening store…');
    setTimeout(() => openStore(), 900);
  }

  return (
    <div style={{
      position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: '#f0ede6', zIndex: 0 }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Shutter */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '108%',
          display: 'flex', flexDirection: 'column',
          transform: shutterOpen ? 'translateY(-102%)' : 'translateY(0)',
          transition: shutterOpen ? 'transform 1.5s cubic-bezier(0.77,0,0.18,1)' : 'none',
        }}>
          {Array.from({ length: SLATS }).map((_, i) => (
            <div key={i} style={{
              flex: 1, minHeight: 28,
              background: `linear-gradient(180deg, ${i % 2 === 0 ? '#2a2a27' : '#1c1c1a'} 0%, ${i % 2 === 0 ? '#1c1c1a' : '#151513'} 100%)`,
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }} />
          ))}
          <div style={{
            height: 28, background: '#0f0f0e',
            borderTop: '3px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 80px',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 6px rgba(200,130,26,0.5)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 6px rgba(200,130,26,0.5)' }} />
          </div>
        </div>
      </div>

      {/* Flip Card */}
      <div className={`lp-scene ${isSignup ? 'signup' : 'login'}`} style={{ position: 'relative', zIndex: 2 }}>
        <div className={`lp-inner${isSignup ? ' flipped' : ''}`}>

          {/* LOGIN */}
          <div className={`lp-face front${lShake ? ' shake' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ width: 32, height: 32, background: 'var(--amber)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛒</div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.05rem', fontWeight: 700 }}>Easy Groceries</div>
                <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>Fresh &amp; Local</div>
              </div>
            </div>
            <Rule label="Sign In" />
            <input className="lp-input" type="text" placeholder="Username"
              value={lUser} onChange={e => setLUser(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} autoComplete="username" />
            <input className="lp-input" type="password" placeholder="Password"
              value={lPass} onChange={e => setLPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} autoComplete="current-password" />
            <div className="lp-err">{lErr}</div>
            <button className="lp-btn" onClick={handleLogin}>Login</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>New here?</span>
              <button className="lp-link" onClick={() => { setIsSignup(true); setLErr(''); }}>Create account</button>
            </div>
          </div>

          {/* SIGNUP */}
          <div className={`lp-face back${sShake ? ' shake' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ width: 32, height: 32, background: 'var(--amber)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛒</div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.05rem', fontWeight: 700 }}>Easy Groceries</div>
                <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>Fresh &amp; Local</div>
              </div>
            </div>
            <Rule label="Create Account" />
            <input className="lp-input" type="text" placeholder="Username *"
              value={sUser} onChange={e => setSUser(e.target.value)} autoComplete="username" />
            <input className="lp-input" type="email" placeholder="Email (optional)"
              value={sEmail} onChange={e => setSEmail(e.target.value)} autoComplete="email" />
            <input className="lp-input" type="password" placeholder="Password *"
              value={sPass} onChange={e => setSPass(e.target.value)} autoComplete="new-password" />
            <input className="lp-input" type="password" placeholder="Confirm Password *"
              value={sPass2} onChange={e => setSPass2(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignup()} autoComplete="new-password" />
            {sErr ? <div className="lp-err">{sErr}</div> : sOk ? <div className="lp-ok">{sOk}</div> : <div style={{ minHeight: 14 }} />}
            <button className="lp-btn" onClick={handleSignup}>Create Account</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>Have an account?</span>
              <button className="lp-link" onClick={() => { setIsSignup(false); setSErr(''); setSOk(''); }}>Sign in</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
