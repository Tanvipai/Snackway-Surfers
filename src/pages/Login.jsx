import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const shutterImg = "/img/login/shutter.png";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800&display=swap');

  @keyframes eg-fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes eg-shake   {
    0%,100%{transform:translateY(-8%) translateX(0)}
    20%{transform:translateY(-8%) translateX(-9px)}
    40%{transform:translateY(-8%) translateX(9px)}
    60%{transform:translateY(-8%) translateX(-5px)}
    80%{transform:translateY(-8%) translateX(5px)}
  }
  @keyframes eg-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes eg-slideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes eg-spinIn  { from{transform:rotateY(90deg) scale(0.5);opacity:0} to{transform:rotateY(0deg) scale(1);opacity:1} }
  @keyframes eg-pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(255,214,0,.7)} 50%{box-shadow:0 0 0 14px rgba(255,214,0,0)} }

  .eg-scene {
    perspective: 900px;
    position: relative; z-index: 10;
    transition: height 0.45s ease;
  }
  .eg-inner {
    position:relative; width:100%; height:100%;
    transform-style: preserve-3d;
    transition: transform 0.75s cubic-bezier(0.4,0.2,0.2,1);
  }
  .eg-inner.flipped { transform: rotateY(180deg); }

  .eg-face {
    position:absolute; inset:0;
    backface-visibility:hidden; -webkit-backface-visibility:hidden;
    border-radius: 40px;
    background: radial-gradient(ellipse at center, #ff8c00 0%, #ff5e00 100%);
    border: 10px solid #ffffff;
    box-shadow: 
      0 0 0 6px rgba(255, 255, 255, 0.4),
      0 12px 40px rgba(0,0,0,0.6),
      inset 0 0 60px rgba(200,80,0,0.9),
      inset 0 0 120px rgba(180,60,0,0.5),
      0 0 40px rgba(255,200,0,0.4);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    padding: 16px 28px; gap:10px;
    box-sizing:border-box; overflow:hidden;
  }
  .eg-face::before {
    content:''; position:absolute; inset:0;
    pointer-events:none;
    background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%),
                radial-gradient(ellipse at 50% 90%, rgba(255,180,0,0.7) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.3) 0%, transparent 40%),
                radial-gradient(circle at 10% 20%, rgba(255,255,255,0.2) 0%, transparent 30%),
                radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 30%);
  }
  .eg-face.back  { transform: rotateY(180deg); }
  .eg-face.shake { animation: eg-shake 0.4s ease; }
  .eg-inner:not(.flipped) .eg-face.back   { pointer-events: none; }
  .eg-inner.flipped .eg-face:not(.back)   { pointer-events: none; }

  .eg-input {
    width: 85%; padding: 12px 20px; border-radius: 30px;
    border: 2px solid rgba(139, 69, 19, 0.4);
    background: linear-gradient(180deg, rgba(200, 140, 80, 0.9) 0%, rgba(230, 170, 110, 0.9) 100%);
    color: #4a2c0f; font-size: 16px;
    font-family:'Cherry Bomb One', system-ui;
    outline: none; box-sizing: border-box;
    box-shadow: inset 0 3px 6px rgba(100, 50, 0, 0.4);
    transition: all 0.2s; position:relative; z-index:2;
  }
  .eg-input::placeholder { color: #8a5a3a; font-family: 'Cherry Bomb One', cursive, sans-serif; }
  .eg-input:focus { background: rgba(255, 210, 150, 0.95); border-color: #fff; }

  .eg-btn {
    padding: 10px 36px; border-radius: 34px; white-space: nowrap;
    border: 5px solid #ffffff;
    background: linear-gradient(180deg, #5de024 0%, #3ba710 100%);
    color: #ffffff; font-size: 22px; font-weight: bold;
    font-family: 'Fredoka One', cursive;
    letter-spacing: 2px; cursor: pointer;
    box-shadow: 0 8px 0 #287a07, 0 12px 20px rgba(0,0,0,0.4);
    transition: transform 0.1s, filter 0.15s; margin-top: 10px;
    text-shadow: 2px 2px 0 rgba(0,0,0,0.3); position:relative; z-index:2;
  }
  .eg-btn:hover  { filter: brightness(1.1); }
  .eg-btn:active { transform: translateY(8px); box-shadow: 0 0px 0 #287a07, 0 4px 6px rgba(0,0,0,0.4); margin-bottom: 8px;}

  .eg-err { color:#ffeaea; font-size:14px; text-shadow:1px 1px 2px rgba(255,0,0,0.5); text-align:center; min-height:18px; font-family:'Fredoka One',cursive,sans-serif; }
  .eg-ok  { color:#eaffea; font-size:14px; text-shadow:1px 1px 2px rgba(0,255,0,0.5); text-align:center; min-height:18px; font-family:'Fredoka One',cursive,sans-serif; }

  .eg-brand {
    color: #ffffff; font-size:32px;
    font-family:'Cherry Bomb One', system-ui;
    -webkit-text-stroke: 1.5px #a45a27;
    text-shadow: 
      2px 2px 0px #a45a27,
      4px 4px 0px #7a3a0f,
      0 6px 12px rgba(0,0,0,0.8),
      0 0 20px rgba(255,200,0,0.6),
      0 0 40px rgba(255,150,0,0.4);
    margin-bottom: 6px; position:relative; z-index:2; line-height: 1.1; text-align: center;
  }
  .eg-switch-row { display:flex; align-items:center; gap:6px; position:relative; z-index:2; margin-top: 4px;}
  .eg-muted { color:#ffe8d6; font-size:14px; font-family:'Fredoka One',cursive,sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); }
  .eg-link  {
    color:#ffffff; font-size:14px; cursor:pointer;
    text-decoration:underline; text-underline-offset:3px;
    background:none; border:none;
    font-family:'Fredoka One',cursive,sans-serif; padding:0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
  .eg-link:hover { color:#fffbe0; }

  /* ── Character selection ── */
  .cs-overlay {
    position:fixed; inset:0; z-index:30;
    background:rgba(20, 24, 34, 0.85); backdrop-filter: blur(4px);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    animation:eg-fadeIn 0.5s ease; padding:24px 16px;
  }
  .cs-title {
    font-family:'Fredoka One',cursive,sans-serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    margin-bottom: 12px;
    text-align: center;
    letter-spacing: 1px;
    display: flex; gap: 14px; justify-content: center;
    line-height: 1;
  }
  .cs-title .pick-your {
    color: #bbdefb;
    -webkit-text-stroke: 1.5px #0288d1;
    text-shadow: 0 0 10px #4fc3f7, 0 0 20px #0288d1, 2px 4px 6px rgba(0,0,0,0.6);
  }
  .cs-title .character {
    color: #ffe082;
    -webkit-text-stroke: 1.5px #e65100;
    text-shadow: 0 0 10px #ffb300, 0 0 20px #ff6f00, 2px 4px 6px rgba(0,0,0,0.6);
  }

  .cs-sub {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 28px;
    text-align: center;
    font-family: 'Nunito', sans-serif;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
  }
  
  .cs-grid {
    display:flex; justify-content:center; flex-wrap: wrap; gap: 12px; max-width:850px; width:100%; margin-bottom:28px;
  }
  .cs-card {
    border-radius:14px; padding:6px; padding-bottom: 12px;
    display:flex; flex-direction:column; align-items:center;
    cursor:pointer;
    background: linear-gradient(180deg, #4f5a6b 0%, #202636 100%);
    border: 3px solid #788599;
    box-shadow: 0 8px 16px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.15);
    transition: all .22s ease;
    animation: eg-spinIn .5s ease both;
    width: 145px;
    flex-shrink: 0;
    box-sizing: border-box;
  }
  .cs-card:hover { transform: translateY(-4px) scale(1.02); background: linear-gradient(180deg, #5f6b7e 0%, #2a3347 100%); }
  .cs-card.sel   {
    border-color: #e1f5fe;
    box-shadow: 0 0 18px #29b6f6, 0 0 35px #039be5, inset 0 2px 8px rgba(255,255,255,0.6);
    animation: eg-pulse-card 1.5s infinite;
  }

  @keyframes eg-pulse-card {
    0%,100% { box-shadow: 0 0 15px #29b6f6, 0 0 25px #039be5; border-color: #b3e5fc; }
    50% { box-shadow: 0 0 25px #4fc3f7, 0 0 45px #0288d1; border-color: #e1f5fe; }
  }

  .cs-img-wrapper {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 9px;
    overflow: hidden;
    margin-bottom: 8px;
    background: #000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    box-sizing: border-box;
  }

  .cs-img {
    width: 100%; height: 100%; object-fit: cover;
  }

  .cs-name  {
    font-family: 'Fredoka One', cursive;
    color: #fff;
    font-size: 20px;
    letter-spacing: 0.5px;
    text-align: center;
    text-shadow: 2px 2px 0 rgba(0,0,0,0.8);
    margin-bottom: 2px;
  }
  .cs-tag   {
    color: #b3e5fc;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-family: 'Nunito', sans-serif;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    margin-bottom: 0px;
  }

  .cs-confirm {
    position: relative;
    width: 320px;
    height: 120px;
    padding: 0;
    border: none;
    cursor: pointer;
    background: transparent;
    transition: transform .15s ease, filter .15s ease;
    display: flex; align-items: center; justify-content: center;
  }
  .cs-confirm:hover   { filter: brightness(1.15) drop-shadow(0 0 10px rgba(255,255,255,0.2)); }
  .cs-confirm:active  { transform: translateY(4px) scale(0.97); }
  .cs-confirm:disabled{ opacity: .5; cursor: not-allowed; filter: grayscale(0.8); }

  .bg-btn-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 2;
  }
`;

function injectCSS() {
  if (document.getElementById("eg-v3-styles")) return;
  const s = document.createElement("style");
  s.id = "eg-v3-styles"; s.textContent = CSS;
  document.head.appendChild(s);
}

const CHARACTERS = [
  { id: "jake", img: "/img/login/jake.png", name: "Jake", tag: "RUNNER" },
  { id: "tricky", img: "/img/login/tricky.png", name: "Tricky", tag: "SKATER" },
  { id: "spike", img: "/img/login/spike.png", name: "Spike", tag: "ROCKER" },
  { id: "yutani", img: "/img/login/yutani.png", name: "Yutani", tag: "HACKER" },
  { id: "fresh", img: "/img/login/fresh.png", name: "Fresh", tag: "TAGGER" },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  useEffect(() => { injectCSS(); }, []);

  const [isSignup, setIsSignup] = useState(false);
  const [showChars, setShowChars] = useState(false);
  const [shutterOpen, setShutterOpen] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [denyAnim, setDenyAnim] = useState(false);

  const [lUser, setLUser] = useState("");
  const [lPass, setLPass] = useState("");
  const [lErr, setLErr] = useState("");
  const [lShake, setLShake] = useState(false);

  const [sUser, setSUser] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPass, setSPass] = useState("");
  const [sPass2, setSPass2] = useState("");
  const [sErr, setSErr] = useState("");
  const [sOk, setSOk] = useState("");
  const [sShake, setSShake] = useState(false);

  const [pendingUser, setPendingUser] = useState(null);
  const [selectedChar, setSelectedChar] = useState(null);

  function shk(set) { set(true); setTimeout(() => set(false), 450); }

  function handleShutterClick(e) {
    if (shutterOpen || animDone || showChars) return;
    if (e.target.closest('.eg-face') || e.target.closest('.eg-scene') || e.target.closest('.eg-inner')) return;
    if (e.clientY < window.innerHeight * 0.5) return;
    setDenyAnim(true);
    setTimeout(() => setDenyAnim(false), 800);
  }

  function openShutter() {
    setShutterOpen(true);
    setTimeout(() => {
      setAnimDone(true);
      navigate("/");
    }, 1900);
  }

  function handleLogin() {
    if (!lUser || !lPass) { setLErr("Please fill in all fields."); shk(setLShake); return; }
    const result = login(lUser.trim(), lPass);
    if (result.ok) {
      setLErr("");
      openShutter();
    } else {
      setLErr(result.error || "Invalid username or password.");
      shk(setLShake);
    }
  }

  function handleSignup() {
    setSErr(""); setSOk("");
    if (!sUser || !sPass || !sPass2) { setSErr("Fill in all required fields."); shk(setSShake); return; }
    if (sPass !== sPass2) { setSErr("Passwords do not match."); shk(setSShake); return; }
    if (sPass.length < 4) { setSErr("Password too short (min 4)."); shk(setSShake); return; }
    setPendingUser({ username: sUser.trim(), email: sEmail, password: sPass });
    setSOk("Almost there! Pick your character ✨");
    setTimeout(() => setShowChars(true), 700);
  }

  function handleConfirmChar() {
    if (!selectedChar || !pendingUser) return;
    const result = signup(pendingUser.username, pendingUser.email, pendingUser.password, selectedChar);
    if (!result.ok) {
      setSErr(result.error || "Could not create account.");
      setShowChars(false);
      setIsSignup(true);
      return;
    }
    setShowChars(false);
    openShutter();
  }

  return (
    <div onClick={handleShutterClick} style={{ position: "relative", width: "100vw", minHeight: "100vh", overflow: "auto", fontFamily: "'Nunito',sans-serif", background: "#c0c0c0" }}>

      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#e8e8e8 0%,#d0d0d0 100%)" }} />

        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "100%",
          zIndex: 2,
          backgroundImage: `url(${shutterImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          display: "flex", flexDirection: "column",
          cursor: shutterOpen || animDone ? "default" : "pointer",
          transform: shutterOpen
            ? "translateY(-102%)"
            : denyAnim
              ? "translateY(-8%)"
              : "translateY(0%)",
          transition: shutterOpen
            ? "transform 1.8s cubic-bezier(0.77,0,0.18,1)"
            : denyAnim
              ? "transform 0.25s ease-out"
              : "transform 0.45s cubic-bezier(0.22,1.8,0.36,1)",
          animation: denyAnim ? "eg-shake 0.45s 0.18s ease" : "none",
        }}>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 30, zIndex: 3,
            background: "linear-gradient(180deg,#bbb,#888)",
            borderTop: "4px solid #777",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 80px",
          }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                width: 12, height: 12, borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%,#eee,#777)",
                border: "1px solid #555",
                boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              }} />
            ))}
          </div>
        </div>

        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 18, zIndex: 5,
          background: "linear-gradient(180deg,#d0d0d0,#b0b0b0)",
          borderBottom: "3px solid #999",
          boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
        }} />
      </div>

      {!animDone && !showChars && (
        <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="eg-scene" style={{ width: 340, height: isSignup ? 500 : 340 }}>
            <div className={`eg-inner${isSignup ? " flipped" : ""}`}>

              <div className={`eg-face${lShake ? " shake" : ""}`}>
                <div className="eg-brand">Snackway Surfers</div>
                <input className="eg-input" type="text" placeholder="UserName"
                  value={lUser} onChange={e => setLUser(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()} autoComplete="username" />
                <input className="eg-input" type="password" placeholder="Password"
                  value={lPass} onChange={e => setLPass(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()} autoComplete="current-password" />
                <div className="eg-err">{lErr}</div>
                <button className="eg-btn" onClick={handleLogin}>★ LOGIN ★</button>
                <div className="eg-switch-row">
                  <span className="eg-muted">New here?</span>
                  <button className="eg-link" onClick={() => { setIsSignup(true); setLErr(""); }}>Create an account</button>
                </div>
              </div>

              <div className={`eg-face back${sShake ? " shake" : ""}`}>
                <div className="eg-brand">Snackway Surfers</div>
                <input className="eg-input" type="text" placeholder="UserName *"
                  value={sUser} onChange={e => setSUser(e.target.value)} autoComplete="username" />
                <input className="eg-input" type="email" placeholder="Email (Optional)"
                  value={sEmail} onChange={e => setSEmail(e.target.value)} autoComplete="email" />
                <input className="eg-input" type="password" placeholder="Password *"
                  value={sPass} onChange={e => setSPass(e.target.value)} autoComplete="new-password" />
                <input className="eg-input" type="password" placeholder="Confirm Password *"
                  value={sPass2} onChange={e => setSPass2(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSignup()} autoComplete="new-password" />
                {sErr && <div className="eg-err">{sErr}</div>}
                {sOk && <div className="eg-ok">{sOk}</div>}
                {!sErr && !sOk && <div style={{ minHeight: 18 }} />}
                <button className="eg-btn" onClick={handleSignup}>★ SIGN UP ★</button>
                <div className="eg-switch-row">
                  <span className="eg-muted">Have an account?</span>
                  <button className="eg-link" onClick={() => { setIsSignup(false); setSErr(""); setSOk(""); }}>Sign in</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {showChars && !animDone && (
        <div className="cs-overlay">
          <div className="cs-title">
            <span className="pick-your">PICK YOUR</span>
            <span className="character">CHARACTER</span>
          </div>
          <div className="cs-sub">Choose your character – they'll be your profile avatar!</div>
          <div className="cs-grid">
            {CHARACTERS.map((c, i) => (
              <div key={c.id}
                className={`cs-card${selectedChar === c.id ? " sel" : ""}`}
                style={{ animationDelay: `${i * 0.07}s` }}
                onClick={() => setSelectedChar(c.id)}
              >
                <div className="cs-img-wrapper">
                  <img src={c.img} alt={c.name} className="cs-img" />
                </div>
                <div className="cs-name">{c.name.toUpperCase()}</div>
                <div className="cs-tag">- {c.tag}</div>
              </div>
            ))}
          </div>
          <button className="cs-confirm" disabled={!selectedChar} onClick={handleConfirmChar}>
            <img src="/img/login/button.png" className="bg-btn-img" alt="btn bg" />
          </button>
        </div>
      )}

    </div>
  );
}