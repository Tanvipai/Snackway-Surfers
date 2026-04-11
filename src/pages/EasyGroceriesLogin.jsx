import { useState, useEffect } from "react";

// ── Inject keyframes + shared CSS once ────────────────────────────────────
const KEYFRAMES = `
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes shake  {
    0%,100% { transform: translateX(0) }
    20%     { transform: translateX(-8px) }
    40%     { transform: translateX(8px) }
    60%     { transform: translateX(-5px) }
    80%     { transform: translateX(5px) }
  }
  .card-scene {
    perspective: 900px;
    width: 340px;
    height: 330px;
    transition: height 0.5s ease;
  }
  .card-scene.signup-mode { height: 430px; }
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.75s cubic-bezier(0.4,0.2,0.2,1);
  }
  .card-inner.flipped { transform: rotateY(180deg); }
  .card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 18px;
    background-image:
      repeating-linear-gradient(180deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 3px, transparent 3px, transparent 8px),
      linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 40%, #2e2e2e 100%);
    box-shadow: 0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 26px 34px 22px;
    gap: 11px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .card-face.back-face { transform: rotateY(180deg); }
  .card-face.shake-it  { animation: shake 0.4s ease; }

  .eg-input {
    width: 100%;
    padding: 9px 14px;
    border-radius: 20px;
    border: 1px solid #888;
    background: linear-gradient(180deg, #c8c8c8 0%, #e0e0e0 100%);
    color: #444;
    font-size: 13px;
    outline: none;
    box-sizing: border-box;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.18);
    font-family: 'Georgia', serif;
    transition: border-color 0.2s;
  }
  .eg-input:focus { border-color: #99aabb; }

  .eg-btn {
    padding: 10px 44px;
    border-radius: 22px;
    border: none;
    background: linear-gradient(180deg, #888 0%, #555 50%, #444 100%);
    color: #e0e0e0;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Palatino Linotype', serif;
    letter-spacing: 3px;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
    transition: filter 0.15s, transform 0.1s;
    margin-top: 2px;
  }
  .eg-btn:hover  { filter: brightness(1.2); }
  .eg-btn:active { transform: scale(0.97); }

  .switch-link {
    color: #9ab8c8;
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    background: none;
    border: none;
    font-family: 'Georgia', serif;
    padding: 0;
  }
  .switch-link:hover { color: #c8dce8; }

  .eg-error   { color: #ff9090; font-size: 12px; text-align: center; min-height: 14px; }
  .eg-success { color: #88e888; font-size: 12px; text-align: center; min-height: 14px; }
`;

function injectStyles() {
  if (document.getElementById("eg-global-styles")) return;
  const tag = document.createElement("style");
  tag.id = "eg-global-styles";
  tag.textContent = KEYFRAMES;
  document.head.appendChild(tag);
}

// ── LocalStorage helpers ──────────────────────────────────────────────────
function getUsers() {
  try { return JSON.parse(localStorage.getItem("eg_users") || "{}"); }
  catch { return {}; }
}
function saveUser(username, password) {
  const users = getUsers();
  users[username.toLowerCase()] = password;
  localStorage.setItem("eg_users", JSON.stringify(users));
}
function validateLogin(username, password) {
  const users = getUsers();
  return users[username.toLowerCase()] === password;
}

// ── Sub-components ────────────────────────────────────────────────────────
function BrandHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
      <span style={{ fontSize: 24 }}>🛒</span>
      <span style={{
        color: "#c8d8e8", fontSize: 14,
        fontFamily: "'Palatino Linotype', Palatino, serif",
        fontVariant: "small-caps", letterSpacing: 2,
        textShadow: "0 1px 3px rgba(0,0,0,0.5)"
      }}>Easy Groceries</span>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
      <span style={{ color: "#888", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function EasyGroceriesLogin() {
  useEffect(() => { injectStyles(); }, []);

  const [isSignup, setIsSignup] = useState(false);

  // login
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginShake, setLoginShake] = useState(false);

  // signup
  const [signUser, setSignUser] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPass, setSignPass] = useState("");
  const [signPass2, setSignPass2] = useState("");
  const [signError, setSignError] = useState("");
  const [signSuccess, setSignSuccess] = useState("");
  const [signShake, setSignShake] = useState(false);

  // shutter
  const [shutterOpen, setShutterOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const SLATS = 22;

  function shake(setter) {
    setter(true);
    setTimeout(() => setter(false), 450);
  }

  function openShutter(username) {
    setLoggedInUser(username);
    setShutterOpen(true);
    setTimeout(() => { setLoggedIn(true); setAnimDone(true); }, 1800);
  }

  function handleLogin() {
    if (!loginUser.trim() || !loginPass) {
      setLoginError("Please fill in all fields.");
      shake(setLoginShake); return;
    }
    if (validateLogin(loginUser.trim(), loginPass)) {
      setLoginError("");
      openShutter(loginUser.trim());
    } else {
      setLoginError("Invalid username or password.");
      shake(setLoginShake);
    }
  }

  function handleSignup() {
    setSignError(""); setSignSuccess("");
    if (!signUser.trim() || !signPass || !signPass2) {
      setSignError("Please fill in all required fields.");
      shake(setSignShake); return;
    }
    if (signPass !== signPass2) {
      setSignError("Passwords do not match.");
      shake(setSignShake); return;
    }
    if (signPass.length < 4) {
      setSignError("Password needs at least 4 characters.");
      shake(setSignShake); return;
    }
    const users = getUsers();
    if (users[signUser.trim().toLowerCase()]) {
      setSignError("That username is already taken.");
      shake(setSignShake); return;
    }
    saveUser(signUser.trim(), signPass);
    setSignSuccess("Account created! Opening store…");
    setTimeout(() => openShutter(signUser.trim()), 900);
  }

  function handleLogout() {
    setLoggedIn(false); setAnimDone(false); setShutterOpen(false);
    setLoginUser(""); setLoginPass(""); setLoginError("");
    setSignUser(""); setSignEmail(""); setSignPass(""); setSignPass2("");
    setSignError(""); setSignSuccess(""); setLoggedInUser("");
    setIsSignup(false);
  }

  const PRODUCTS = [
    "🍎 Apples", "🥛 Milk", "🥦 Broccoli", "🍞 Bread",
    "🧀 Cheese", "🥚 Eggs", "🧅 Onions", "🍋 Lemons",
    "🥕 Carrots", "🧈 Butter", "🍇 Grapes", "🧃 Juice",
  ];

  return (
    <div style={S.root}>

      {/* ── Shutter background ── */}
      <div style={S.shutterBg}>
        <div style={S.wall} />
        <div style={{
          ...S.shutterPanel,
          transform: shutterOpen ? "translateY(-102%)" : "translateY(0%)",
          transition: shutterOpen
            ? "transform 1.6s cubic-bezier(0.77,0,0.18,1)"
            : "none",
        }}>
          {Array.from({ length: SLATS }).map((_, i) => (
            <div key={i} style={S.slat} />
          ))}
          <div style={S.shutterBottom}>
            <div style={S.bolt} />
            <div style={S.bolt} />
          </div>
        </div>
      </div>

      {/* ── Flip Card ── */}
      {!animDone && (
        <div className={`card-scene${isSignup ? " signup-mode" : ""}`}>
          <div className={`card-inner${isSignup ? " flipped" : ""}`}>

            {/* ══ LOGIN FACE ══ */}
            <div className={`card-face front-face${loginShake ? " shake-it" : ""}`}>
              <BrandHeader />
              <Divider label="Sign In" />

              <input className="eg-input" type="text" placeholder="Username"
                value={loginUser} onChange={e => setLoginUser(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                autoComplete="username" />
              <input className="eg-input" type="password" placeholder="Password"
                value={loginPass} onChange={e => setLoginPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                autoComplete="current-password" />

              <div className="eg-error">{loginError}</div>

              <button className="eg-btn" onClick={handleLogin}>LOGIN</button>

              <div style={S.switchRow}>
                <span style={S.muted}>New here?</span>
                <button className="switch-link"
                  onClick={() => { setIsSignup(true); setLoginError(""); }}>
                  Create an account
                </button>
              </div>
            </div>

            {/* ══ SIGNUP FACE ══ */}
            <div className={`card-face back-face${signShake ? " shake-it" : ""}`}>
              <BrandHeader />
              <Divider label="Create Account" />

              <input className="eg-input" type="text" placeholder="Username *"
                value={signUser} onChange={e => setSignUser(e.target.value)}
                autoComplete="username" />
              <input className="eg-input" type="email" placeholder="Email (optional)"
                value={signEmail} onChange={e => setSignEmail(e.target.value)}
                autoComplete="email" />
              <input className="eg-input" type="password" placeholder="Password *"
                value={signPass} onChange={e => setSignPass(e.target.value)}
                autoComplete="new-password" />
              <input className="eg-input" type="password" placeholder="Confirm Password *"
                value={signPass2} onChange={e => setSignPass2(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSignup()}
                autoComplete="new-password" />

              {signError && <div className="eg-error">{signError}</div>}
              {signSuccess && <div className="eg-success">{signSuccess}</div>}
              {!signError && !signSuccess && <div style={{ minHeight: 14 }} />}

              <button className="eg-btn" onClick={handleSignup}>SIGN UP</button>

              <div style={S.switchRow}>
                <span style={S.muted}>Already have one?</span>
                <button className="switch-link"
                  onClick={() => { setIsSignup(false); setSignError(""); setSignSuccess(""); }}>
                  Sign in
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Homepage ── */}
      {loggedIn && (
        <div style={S.homepage}>
          <div style={S.homepageInner}>
            <div style={{ fontSize: 54 }}>🛒</div>
            <h1 style={S.welcomeTitle}>Welcome, {loggedInUser}!</h1>
            <p style={S.welcomeSub}>Your shutter is open — start shopping.</p>
            <div style={S.productGrid}>
              {PRODUCTS.map(item => (
                <div key={item} style={S.productCard}>{item}</div>
              ))}
            </div>
            <button style={S.logoutBtn} onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Inline styles ─────────────────────────────────────────────────────────
const S = {
  root: {
    position: "relative", width: "100vw", height: "100vh", overflow: "hidden",
    fontFamily: "'Georgia', serif",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  shutterBg: { position: "absolute", inset: 0, zIndex: 0 },
  wall: {
    position: "absolute", inset: 0, zIndex: 0,
    background: "linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)",
  },
  shutterPanel: {
    position: "absolute", top: 0, left: 0, right: 0, height: "108%",
    zIndex: 2, display: "flex", flexDirection: "column",
  },
  slat: {
    flex: 1, minHeight: 26,
    background: "linear-gradient(180deg,#e0e0e0 0%,#c8c8c8 40%,#d8d8d8 60%,#b8b8b8 100%)",
    borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #a0a0a0",
    boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.08)",
  },
  shutterBottom: {
    height: 28, background: "linear-gradient(180deg,#bbb,#999)",
    borderTop: "3px solid #888",
    display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 90px",
  },
  bolt: {
    width: 10, height: 10, borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%,#ddd,#888)",
    border: "1px solid #666", boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
  },
  switchRow: { display: "flex", alignItems: "center", gap: 6 },
  muted: { color: "#777", fontSize: 12 },
  homepage: {
    position: "absolute", inset: 0, zIndex: 1,
    background: "linear-gradient(135deg,#f0f8f0 0%,#e8f4e8 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    animation: "fadeIn 0.6s ease", overflowY: "auto",
  },
  homepageInner: { textAlign: "center", padding: "40px 20px" },
  welcomeTitle: {
    fontFamily: "'Palatino Linotype', serif", color: "#2a5a2a",
    fontSize: 30, margin: "12px 0 6px",
  },
  welcomeSub: { color: "#558855", fontSize: 16, marginBottom: 28 },
  productGrid: {
    display: "grid", gridTemplateColumns: "repeat(4,1fr)",
    gap: 14, maxWidth: 540, margin: "0 auto 28px",
  },
  productCard: {
    background: "white", borderRadius: 12, padding: "16px 10px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
    fontSize: 13, color: "#333",
  },
  logoutBtn: {
    padding: "10px 32px", borderRadius: 20,
    border: "2px solid #2a5a2a", background: "transparent",
    color: "#2a5a2a", fontSize: 14, cursor: "pointer", letterSpacing: 1,
  },
};
