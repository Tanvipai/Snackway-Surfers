import { useRef, useState, useEffect, useCallback } from "react";

const WALL_IMG = "/img/graffiti-wall.png";
const SPRAY_IMG = "/img/spraybottle1.png";

const TOOLS = [
    { id: "red", label: "RED", color: "#FF0000" },
    { id: "white", label: "WHT", color: "#FFFFFF" },
    { id: "blue", label: "BLU", color: "#1E90FF" },
    { id: "eraser", label: "ERA", color: null },
    { id: "clear", label: "CLR", color: null },
];

const SPRAY_RADIUS = 18;
const SPRAY_DOTS = 120;
const ERASE_RADIUS = 28;

export default function GraffitiWall({ onBack }) {
    const canvasRef = useRef(null);
    const cursorRef = useRef(null);
    const timerRef = useRef(null);
    const isDown = useRef(false);
    const pos = useRef({ x: 0, y: 0 });

    const [tool, setTool] = useState("red");

    useEffect(() => {
        if (document.getElementById("gw-s")) return;
        const s = document.createElement("style");
        s.id = "gw-s";
        s.textContent = `
      .gw-wrap { position:fixed;inset:0;z-index:100;overflow:hidden;cursor:none; }
      .gw-bg   { position:absolute;inset:0;background-size:cover;background-position:center;background-repeat:no-repeat; }
      .gw-cv   { position:absolute;inset:0;width:100%;height:100%; }
      .gw-cursor {
        position:fixed;pointer-events:none;z-index:9999;
        width:52px;height:52px;
        transform:translate(-18px,-48px) rotate(-30deg);
        object-fit:contain;
        display:none;
        filter:drop-shadow(1px 2px 3px rgba(0,0,0,0.55));
      }
      .gw-sidebar {
        position:absolute;right:14px;top:50%;transform:translateY(-50%);
        display:flex;flex-direction:column;align-items:center;gap:10px;
        z-index:20;
      }
      .gw-btn {
        width:38px;height:38px;border-radius:50%;border:2px solid rgba(255,255,255,0.7);
        cursor:pointer;font-size:9px;font-weight:700;letter-spacing:0.5px;
        display:flex;align-items:center;justify-content:center;
        font-family:sans-serif;transition:transform .15s,box-shadow .15s;
        box-shadow:0 2px 6px rgba(0,0,0,0.35);
      }
      .gw-btn:hover { transform:scale(1.15); box-shadow:0 4px 10px rgba(0,0,0,0.45); }
      .gw-btn.active { border-color:#FFD700;border-width:3px;transform:scale(1.18); }
      .gw-back {
        position:absolute;top:12px;left:14px;z-index:20;
        padding:5px 14px;border-radius:20px;
        border:2px solid rgba(255,255,255,0.5);
        background:rgba(0,0,0,0.5);color:#fff;
        font-size:13px;cursor:pointer;font-family:sans-serif;
        transition:background .2s;
      }
      .gw-back:hover { background:rgba(0,0,0,0.75); }
    `;
        document.head.appendChild(s);
    }, []);

    useEffect(() => {
        const cv = canvasRef.current;
        const resize = () => {
            const tmp = document.createElement("canvas");
            tmp.width = cv.width; tmp.height = cv.height;
            tmp.getContext("2d").drawImage(cv, 0, 0);
            cv.width = cv.offsetWidth; cv.height = cv.offsetHeight;
            cv.getContext("2d").drawImage(tmp, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const paint = useCallback((x, y) => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext("2d");

        if (tool === "eraser") {
            ctx.save();
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, ERASE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.restore();
        } else {
            const colorMap = { red: "#FF0000", white: "#FFFFFF", blue: "#1E90FF" };
            const c = colorMap[tool];
            ctx.save();
            for (let i = 0; i < SPRAY_DOTS; i++) {
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * SPRAY_RADIUS;
                ctx.beginPath();
                ctx.arc(x + r * Math.cos(angle), y + r * Math.sin(angle), Math.random() * 1.2 + 0.3, 0, Math.PI * 2);
                ctx.fillStyle = c;
                ctx.globalAlpha = Math.random() * 0.55 + 0.25;
                ctx.fill();
            }
            ctx.restore();
        }
    }, [tool]);

    const start = useCallback(() => {
        if (timerRef.current) return;
        timerRef.current = setInterval(() => paint(pos.current.x, pos.current.y), 16);
    }, [paint]);

    const stop = useCallback(() => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    }, []);

    const onMove = useCallback((e) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        if (cursorRef.current) {
            cursorRef.current.style.left = e.clientX + "px";
            cursorRef.current.style.top = e.clientY + "px";
        }
        if (isDown.current) paint(pos.current.x, pos.current.y);
    }, [paint]);

    const onDown = useCallback((e) => {
        isDown.current = true;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        start();
    }, [start]);

    const onUp = useCallback(() => { isDown.current = false; stop(); }, [stop]);
    const onLeave = useCallback(() => {
        isDown.current = false; stop();
        if (cursorRef.current) cursorRef.current.style.display = "none";
    }, [stop]);
    const onEnter = useCallback(() => {
        if (cursorRef.current) cursorRef.current.style.display = "block";
    }, []);

    function handleToolClick(id) {
        if (id === "clear") {
            const cv = canvasRef.current;
            if (cv) cv.getContext("2d").clearRect(0, 0, cv.width, cv.height);
        } else {
            setTool(id);
        }
    }

    return (
        <div className="gw-wrap"
            onMouseMove={onMove} onMouseDown={onDown}
            onMouseUp={onUp} onMouseLeave={onLeave}
            onMouseEnter={onEnter}
        >
            <img ref={cursorRef} src={SPRAY_IMG} className="gw-cursor" alt="" />

            <div className="gw-bg" style={{ backgroundImage: `url('${WALL_IMG}')` }} />

            <canvas ref={canvasRef} className="gw-cv" />

            <button className="gw-back" onClick={onBack}>← Back</button>

            <div className="gw-sidebar">
                {TOOLS.map(t => (
                    <div key={t.id}
                        className={`gw-btn${tool === t.id ? " active" : ""}`}
                        title={t.label}
                        style={{
                            background: t.color
                                ? t.color === "#FFFFFF"
                                    ? "#fff"
                                    : t.color
                                : t.id === "eraser"
                                    ? "rgba(0,0,0,0.55)"
                                    : "rgba(180,30,30,0.75)",
                            color: t.color === "#FFFFFF" ? "#333"
                                : t.id === "eraser" ? "#fff"
                                    : t.id === "clear" ? "#fff"
                                        : "#fff",
                        }}
                        onClick={() => handleToolClick(t.id)}
                    >
                        {t.id === "eraser" ? "✕" : t.id === "clear" ? "🗑" : ""}
                    </div>
                ))}
            </div>
        </div>
    );
}