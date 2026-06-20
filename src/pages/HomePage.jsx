import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GraffitiWall from './GraffitiWall';

export default function HomePage() {
  const navigate = useNavigate();
  const [phase2Ready, setPhase2Ready] = useState(false);
  const [showGraffiti, setShowGraffiti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPhase2Ready(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      height: '100vh', width: '100vw', backgroundColor: '#111',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      animation: 'fadeInMenu 1.2s ease-in-out forwards',
      position: 'relative'
    }}>
      <img
        src="/img/subway surfers assets/homepage2.png" alt="Base Scenery"
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100vw', height: '100vh', objectFit: 'fill', zIndex: 0
        }}
      />

      <img
        src="/img/subway surfers assets/logo.png"
        alt="Subway Surfers Logo"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(200px, 40vw, 400px)',
          animation: 'logoGlideUp 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
          zIndex: 10,
          filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'
        }}
      />

      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        opacity: phase2Ready ? 1 : 0,
        transition: 'opacity 0.8s ease-in',
        pointerEvents: phase2Ready ? 'auto' : 'none',
        zIndex: 5
      }}>

        <AssetButton
          src="/img/subway surfers assets/time.png"
          onClick={() => { }}
          style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '40vw', maxWidth: '300px', zIndex: 6 }}
          animation="pulseSubtle 4s infinite alternate"
        />

        <div style={{
          position: 'absolute', top: '30%', left: '3%',
          display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', zIndex: 10
        }}>
          <AssetButton
            src="/img/subway surfers assets/aisle button.png"
            label="Aisles"
            onClick={() => navigate('/aisles')}
            style={{ position: 'relative', width: '25vw', maxWidth: '170px', animation: 'floatSubtle 2.5s infinite ease-in-out' }}
          />
          <AssetButton
            src="/img/subway surfers assets/cart button.png"
            label="Cart"
            onClick={() => navigate('/cart')}
            style={{ position: 'relative', width: '25vw', maxWidth: '170px', animation: 'floatSubtle 2.8s infinite ease-in-out reverse' }}
          />
          <AssetButton
            src="/img/subway surfers assets/profile.png"
            label="My Surfer"
            onClick={() => navigate('/profile')}
            style={{ position: 'relative', width: '25vw', maxWidth: '170px', animation: 'floatSubtle 3.1s infinite ease-in-out' }}
          />
        </div>

        <div style={{
          position: 'absolute', top: '30%', right: '2%',
          display: 'flex', flexDirection: 'column', gap: '3vh', alignItems: 'center', zIndex: 10
        }}>
          <AssetButton
            src="/img/subway surfers assets/about_us_icon.png"
            label="About Us"
            onClick={() => navigate('/about')}
            style={{ position: 'relative', width: '12vw', maxWidth: '85px', height: '12vw', maxHeight: '85px', objectFit: 'cover', borderRadius: '22%', animation: 'floatSubtle 2.6s infinite ease-in-out reverse' }}
          />
          <AssetButton
            src="/img/subway surfers assets/grafitti_icon.png"
            label="Graffiti Wall"
            onClick={() => setShowGraffiti(true)}
            style={{ position: 'relative', width: '12vw', maxWidth: '85px', height: '12vw', maxHeight: '85px', objectFit: 'cover', borderRadius: '22%', animation: 'floatSubtle 2.9s infinite ease-in-out' }}
          />
        </div>

        <AssetButton
          src="/img/subway surfers assets/char.png"
          onClick={() => navigate('/profile')}
          style={{
            bottom: '25%', left: '50%', transform: 'translateX(-50%)',
            width: '50vw', maxWidth: '520px',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))',
            animation: 'floatCharacter 4s infinite ease-in-out',
            zIndex: 8
          }}
          hoverScale={1.05}
        />

        <AssetButton
          src="/img/subway surfers assets/tap to shop.png"
          onClick={() => navigate('/shop')}
          style={{
            bottom: '13%', left: '50%', transform: 'translateX(-50%)',
            width: '30vw', maxWidth: '250px',
            animation: 'pulseTap 2s infinite alternate ease-in-out',
            transformOrigin: 'center',
            zIndex: 15
          }}
          hoverScale={1.1}
        />

      </div>

      {showGraffiti && <GraffitiWall onBack={() => setShowGraffiti(false)} />}

      <style>{`
        @keyframes fadeInMenu {
          0% { opacity: 0; filter: brightness(0); }
          100% { opacity: 1; filter: brightness(1); }
        }
        @keyframes logoGlideUp {
          0% { top: 40%; transform: translate(-50%, -50%) scale(1.5); }
          100% { top: 2%; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes pulseTap {
          0% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.2)) brightness(1); transform: translateX(-50%) scale(1); }
          100% { filter: drop-shadow(0 0 25px rgba(255,255,255,0.6)) brightness(1.15); transform: translateX(-50%) scale(1.05); }
        }
        @keyframes floatCharacter {
          0%, 100% { margin-bottom: 0px; }
          50% { margin-bottom: 3px; }
        }
        @keyframes floatSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes pulseSubtle {
          0% { transform: translateX(-50%) scale(1); }
          100% { transform: translateX(-50%) scale(1.03); }
        }
      `}</style>
    </div>
  );
}

function AssetButton({ src, onClick, style, hoverScale = 1.1, animation, label }) {
  const [hover, setHover] = useState(false);

  const { top, left, right, bottom, position, transform: baseTransform = '', zIndex, animation: styleAnimation, ...imgStyles } = style;

  const currentAnimation = animation && !hover ? animation : styleAnimation || 'none';
  const transform = hover ? `${baseTransform} scale(${hoverScale})` : baseTransform;

  if (label) {
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: position || 'absolute',
          top, left, right, bottom,
          cursor: 'pointer',
          zIndex: hover ? (zIndex || 10) + 10 : (zIndex || 10),
          animation: currentAnimation,
          transform: transform,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img
          src={src}
          alt={label}
          style={{
            ...imgStyles,
            filter: hover
              ? 'drop-shadow(0 8px 15px rgba(0,0,0,0.6)) brightness(1.2) contrast(1.15) saturate(1.2)'
              : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5)) contrast(1.1) saturate(1.1)',
            imageRendering: 'high-quality',
            transition: 'filter 0.2s ease',
            display: 'block'
          }}
        />
        <div style={{
          marginTop: '6px',
          color: 'white',
          fontFamily: '"Arial Black", Impact, sans-serif',
          fontSize: '0.9rem',
          letterSpacing: '0.5px',
          textAlign: 'center',
          textTransform: 'uppercase',
          textShadow: '1.5px 1.5px 0 #000, -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 0 4px 0 rgba(0,0,0,0.8)',
          lineHeight: '1.1'
        }}>
          {label}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="UI Component"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        cursor: 'pointer',
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.2s ease',
        filter: hover
          ? 'drop-shadow(0 8px 15px rgba(0,0,0,0.6)) brightness(1.2) contrast(1.15) saturate(1.2)'
          : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5)) contrast(1.1) saturate(1.1)',
        imageRendering: 'high-quality',
        zIndex: hover ? 20 : 10,
        animation: currentAnimation,
        ...imgStyles,
        transform: transform
      }}
    />
  );
}
