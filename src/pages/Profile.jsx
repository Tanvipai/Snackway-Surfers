import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CHARACTERS = [
  { id: "jake", img: "/img/login/jake.png", name: "Jake" },
  { id: "tricky", img: "/img/login/tricky.png", name: "Tricky" },
  { id: "spike", img: "/img/login/spike.png", name: "Spike" },
  { id: "yutani", img: "/img/login/yutani.png", name: "Yutani" },
  { id: "fresh", img: "/img/login/fresh.png", name: "Fresh" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800&display=swap');

  @keyframes pp-fadeIn  { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
  @keyframes pp-slideIn { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pp-coinBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

  .pp-overlay {
    position:fixed;inset:0;z-index:999;
    display:flex;align-items:center;justify-content:center;
    animation:pp-fadeIn 0.4s ease;
  }
  .pp-overlay::before {
    content:'';position:absolute;inset:0;
    background:rgba(0,0,0,0.35);
  }

  .pp-card {
    position:relative;z-index:1;
    width:min(680px,90vw);
    background:linear-gradient(160deg,#1565C0 0%,#0D47A1 40%,#0a3880 100%);
    border-radius:24px;
    border:4px solid #4FC3F7;
    box-shadow:
      0 0 0 2px #1565C0,
      0 0 30px rgba(79,195,247,0.5),
      0 20px 60px rgba(0,0,0,0.6),
      inset 0 1px 0 rgba(255,255,255,0.15);
    padding:28px 28px 90px;
    animation:pp-fadeIn 0.45s ease;
    overflow:visible;
  }

  .pp-top {
    display:flex;align-items:center;gap:20px;
    background:linear-gradient(135deg,#1976D2,#1565C0);
    border-radius:16px;border:3px solid #4FC3F7;
    padding:16px 20px;margin-bottom:20px;
    box-shadow:inset 0 2px 8px rgba(0,0,0,0.3);
  }

  .pp-avatar-frame {
    width:100px;height:100px;flex-shrink:0;
    border-radius:16px;
    background:linear-gradient(135deg,#1565C0,#0D47A1);
    border:4px solid #4FC3F7;
    box-shadow:0 0 0 2px #1565C0, 0 4px 16px rgba(0,0,0,0.4);
    overflow:hidden;display:flex;align-items:center;justify-content:center;
  }
  .pp-avatar-frame img {
    width:100%;height:100%;object-fit:cover;
  }

  .pp-info { flex:1;min-width:0; }
  .pp-username {
    font-family:'Fredoka One',cursive;
    font-size:clamp(28px,5vw,42px);
    color:#FFD700;
    text-shadow:3px 3px 0 #8B4513,-1px -1px 0 #FF8C00,0 0 20px rgba(255,200,0,0.4);
    -webkit-text-stroke:1px #8B4513;
    line-height:1;margin-bottom:6px;
  }
  .pp-email {
    display:flex;align-items:center;gap:8px;
    font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;
    color:#E3F2FD;
  }

  .pp-actions { display:flex;flex-direction:column;gap:12px;margin-bottom:16px; }

  .pp-action-btn {
    display:flex;align-items:center;gap:14px;
    width:55%;padding:14px 20px;border-radius:12px;
    border:none;cursor:pointer;
    font-family:'Fredoka One',cursive;font-size:20px;
    letter-spacing:1px;color:#fff;
    transition:transform 0.12s,filter 0.15s;
    box-shadow:0 6px 0 rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.25);
    position:relative;overflow:hidden;
  }
  .pp-action-btn::after {
    content:'';position:absolute;inset:0;
    background:linear-gradient(180deg,rgba(255,255,255,0.12) 0%,transparent 60%);
    pointer-events:none;
  }
  .pp-action-btn:hover  { filter:brightness(1.1); }
  .pp-action-btn:active { transform:translateY(6px); box-shadow:0 0 0 rgba(0,0,0,0.3); }

  .pp-btn-order {
    background:linear-gradient(135deg,#1E88E5,#1565C0);
    border:3px solid #FFD700;
  }
  .pp-btn-order .pp-btn-icon {
    width:36px;height:36px;border-radius:8px;
    background:linear-gradient(135deg,#43A047,#2E7D32);
    display:flex;align-items:center;justify-content:center;
    font-size:20px;border:2px solid #81C784;flex-shrink:0;
  }
  .pp-btn-logout {
    background:linear-gradient(135deg,#E53935,#B71C1C);
    border:3px solid #FF5252;
  }
  .pp-btn-logout .pp-btn-icon {
    width:36px;height:36px;border-radius:50%;
    background:rgba(0,0,0,0.2);
    display:flex;align-items:center;justify-content:center;
    font-size:18px;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;
  }

  .pp-coins {
    position:absolute;bottom:-20px;left:20px;
    font-size:52px;line-height:1;
    animation:pp-coinBob 2.5s ease-in-out infinite;
    filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5));
    z-index:5;
  }

  .pp-menu-btn {
    position:absolute;top:-16px;right:-16px;z-index:10;
    width:54px;height:54px;border-radius:14px;
    background:linear-gradient(135deg,#1E88E5,#1565C0);
    border:3px solid #FFD700;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;
    cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.4);
    transition:filter 0.15s;
  }
  .pp-menu-btn:hover { filter:brightness(1.2); }
  .pp-menu-bar { width:24px;height:3px;border-radius:2px;background:#FFD700; }

  .pp-dropdown {
    position:absolute;top:54px;right:0;z-index:20;
    background:linear-gradient(135deg,#1565C0,#0D47A1);
    border:3px solid #4FC3F7;border-radius:14px;
    padding:10px;display:flex;flex-direction:column;gap:8px;
    box-shadow:0 8px 24px rgba(0,0,0,0.5);
    animation:pp-slideIn 0.2s ease;min-width:170px;
  }
  .pp-dropdown-btn {
    padding:10px 16px;border-radius:10px;
    background:linear-gradient(135deg,#1976D2,#1565C0);
    border:2px solid #4FC3F7;
    color:#fff;font-family:'Fredoka One',cursive;font-size:15px;
    cursor:pointer;text-align:left;transition:all 0.15s;
    box-shadow:0 3px 8px rgba(0,0,0,0.25);
  }
  .pp-dropdown-btn:hover { background:linear-gradient(135deg,#42A5F5,#1E88E5); transform:translateX(-3px); }

  .pp-modal-bg {
    position:fixed;inset:0;z-index:300;
    background:rgba(0,0,0,0.7);
    display:flex;align-items:center;justify-content:center;
    animation:pp-fadeIn 0.2s ease;
  }
  .pp-modal {
    background:linear-gradient(160deg,#1565C0,#0D47A1);
    border:4px solid #4FC3F7;border-radius:20px;
    padding:28px 32px;width:min(380px,88vw);
    box-shadow:0 0 40px rgba(79,195,247,0.4), 0 20px 50px rgba(0,0,0,0.6);
    animation:pp-fadeIn 0.25s ease;
  }
  .pp-modal-title {
    font-family:'Fredoka One',cursive;font-size:22px;
    color:#FFD700;text-shadow:2px 2px 0 #8B4513;
    margin-bottom:18px;text-align:center;
  }
  .pp-modal-input {
    width:100%;padding:12px 16px;border-radius:12px;
    border:2px solid #4FC3F7;
    background:rgba(255,255,255,0.1);
    color:#fff;font-family:'Nunito',sans-serif;font-size:15px;font-weight:700;
    outline:none;box-sizing:border-box;margin-bottom:12px;
    transition:border-color 0.2s;
  }
  .pp-modal-input::placeholder { color:rgba(255,255,255,0.45); }
  .pp-modal-input:focus { border-color:#FFD700; }
  .pp-modal-row { display:flex;gap:10px;margin-top:6px; }
  .pp-modal-save {
    flex:1;padding:11px;border-radius:12px;
    background:linear-gradient(135deg,#43A047,#2E7D32);
    border:2px solid #81C784;color:#fff;
    font-family:'Fredoka One',cursive;font-size:16px;
    cursor:pointer;transition:filter 0.15s;
  }
  .pp-modal-save:hover { filter:brightness(1.1); }
  .pp-modal-cancel {
    flex:1;padding:11px;border-radius:12px;
    background:rgba(255,255,255,0.08);
    border:2px solid rgba(255,255,255,0.25);color:#fff;
    font-family:'Fredoka One',cursive;font-size:16px;
    cursor:pointer;transition:filter 0.15s;
  }
  .pp-modal-cancel:hover { background:rgba(255,255,255,0.16); }
  .pp-modal-msg { font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;text-align:center;min-height:18px;margin-bottom:4px; }
  .pp-modal-err { color:#FF5252; }
  .pp-modal-ok  { color:#69F0AE; }

  .pp-back {
    position:absolute;top:14px;left:18px;z-index:210;
    padding:6px 16px;border-radius:20px;
    border:2px solid rgba(255,255,255,0.4);
    background:rgba(0,0,0,0.45);color:#fff;
    font-family:'Fredoka One',cursive;font-size:14px;
    cursor:pointer;transition:background 0.2s;
  }
  .pp-back:hover { background:rgba(0,0,0,0.7); }
`;

function injectCSS() {
  if (document.getElementById("pp-styles")) return;
  const s = document.createElement("style");
  s.id = "pp-styles"; s.textContent = CSS;
  document.head.appendChild(s);
}

export default function ProfilePage() {
  useEffect(() => { injectCSS(); }, []);

  const navigate = useNavigate();
  const { user, logout, changeUsername, changePassword } = useAuth();

  const username = user?.username || "Guest";
  const charId = user?.charId || "jake";
  const email = user?.email || null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [msg, setMsg] = useState({ text: "", ok: false });

  const charData = CHARACTERS.find(c => c.id === charId);

  function onBack() {
    navigate('/home');
  }

  function onLogout() {
    logout();
    navigate('/login');
  }

  function openModal(type) {
    setModal(type); setMenuOpen(false);
    setInputA(""); setInputB(""); setMsg({ text: "", ok: false });
  }
  function closeModal() {
    setModal(null); setInputA(""); setInputB(""); setMsg({ text: "", ok: false });
  }

  async function handleSaveUsername() {
    const newU = inputA.trim();
    if (!newU) { setMsg({ text: "Enter a new username.", ok: false }); return; }
    if (newU.toLowerCase() === username.toLowerCase()) { setMsg({ text: "Same as current username.", ok: false }); return; }
    if (!inputB) { setMsg({ text: "Enter your current password.", ok: false }); return; }
    const result = await changeUsername(newU, inputB);
    if (!result.ok) { setMsg({ text: result.error || "Could not update username.", ok: false }); return; }
    setMsg({ text: "Username updated!", ok: true });
    setTimeout(() => { closeModal(); onLogout(); }, 1500);
  }

  async function handleSavePassword() {
    if (!inputA) { setMsg({ text: "Enter current password.", ok: false }); return; }
    if (!inputB) { setMsg({ text: "Enter new password.", ok: false }); return; }
    if (inputB.length < 6) { setMsg({ text: "New password too short (min 6).", ok: false }); return; }
    const result = await changePassword(inputA, inputB);
    if (!result.ok) { setMsg({ text: result.error || "Could not update password.", ok: false }); return; }
    setMsg({ text: "Password updated!", ok: true });
    setTimeout(() => closeModal(), 1500);
  }

  return (
    <div
      className="pp-overlay"
      onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
      style={{
        backgroundImage: `url('/img/Seaside_train_station_with_ducks.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button className="pp-back" onClick={onBack}>← Back</button>

      <div className="pp-card" onClick={e => e.stopPropagation()}>

        <div style={{ position: "absolute", top: -16, right: -16, zIndex: 10 }}>
          <div className="pp-menu-btn"
            onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}>
            <div className="pp-menu-bar" />
            <div className="pp-menu-bar" />
            <div className="pp-menu-bar" />
          </div>
          {menuOpen && (
            <div className="pp-dropdown" onClick={e => e.stopPropagation()}>
              <button className="pp-dropdown-btn" onClick={() => openModal("username")}>✏️ Change Username</button>
              <button className="pp-dropdown-btn" onClick={() => openModal("password")}>🔒 Change Password</button>
            </div>
          )}
        </div>

        <div className="pp-top">
          <div className="pp-avatar-frame">
            {charData?.img
              ? <img src={charData.img} alt={charData.name} />
              : <span style={{ fontSize: 48 }}>🧍</span>
            }
          </div>
          <div className="pp-info">
            <div className="pp-username">{username}</div>
            {email && (
              <div className="pp-email">
                <span>✉️</span>
                {email}
              </div>
            )}
          </div>
        </div>

        <div className="pp-actions">
          <button className="pp-action-btn pp-btn-order">
            <div className="pp-btn-icon">🛒</div>
            Order History
          </button>
          <button className="pp-action-btn pp-btn-logout" onClick={onLogout}>
            <div className="pp-btn-icon">⏻</div>
            Logout
          </button>
        </div>



      </div>

      {modal && (
        <div className="pp-modal-bg" onClick={closeModal}>
          <div className="pp-modal" onClick={e => e.stopPropagation()}>
            <div className="pp-modal-title">
              {modal === "username" ? "✏️ Change Username" : "🔒 Change Password"}
            </div>

            {modal === "username" ? (
              <>
                <input className="pp-modal-input" type="text"
                  placeholder="New username" value={inputA}
                  onChange={e => setInputA(e.target.value)} autoFocus />
                <input className="pp-modal-input" type="password"
                  placeholder="Current password" value={inputB}
                  onChange={e => setInputB(e.target.value)} />
              </>
            ) : (
              <>
                <input className="pp-modal-input" type="password"
                  placeholder="Current password" value={inputA}
                  onChange={e => setInputA(e.target.value)} autoFocus />
                <input className="pp-modal-input" type="password"
                  placeholder="New password" value={inputB}
                  onChange={e => setInputB(e.target.value)} />
              </>
            )}

            <div className={`pp-modal-msg ${msg.ok ? "pp-modal-ok" : "pp-modal-err"}`}>
              {msg.text}
            </div>

            <div className="pp-modal-row">
              <button className="pp-modal-save"
                onClick={modal === "username" ? handleSaveUsername : handleSavePassword}>
                Save
              </button>
              <button className="pp-modal-cancel" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}