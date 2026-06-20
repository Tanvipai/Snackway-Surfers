import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function WelcomePage() {
  const navigate = useNavigate();
  const [canContinue, setCanContinue] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(-1);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const dialogueImages = [
    {
      name: 'jake',
      src: '/img/subway surfers assets/jake.png',
      alt: 'Jake dialogue',
      style: {
        position: 'absolute',
        top: '1%',
        right: '17%',
        width: '22vw',
        maxWidth: '280px',
        minWidth: '160px',
        zIndex: 15,
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.35))',
      }
    },
    {
      name: 'fresh',
      src: '/img/subway surfers assets/fresh.png',
      alt: 'Fresh dialogue',
      style: {
        position: 'absolute',
        top: '5%',
        left: '3%',
        width: '20vw',
        maxWidth: '260px',
        minWidth: '150px',
        zIndex: 15,
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.35))',
      }
    },
    {
      name: 'tricky',
      src: '/img/subway surfers assets/tricky.png',
      alt: 'Tricky dialogue',
      style: {
        position: 'absolute',
        top: '8%',
        left: '45%',
        transform: 'translateX(-50%)',
        width: '24vw',
        maxWidth: '300px',
        minWidth: '170px',
        zIndex: 15,
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.35))',
      }
    }
  ];

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setDialogueIndex(0), 500));
    timers.push(setTimeout(() => setDialogueIndex(1), 2000));
    timers.push(setTimeout(() => setDialogueIndex(2), 3500));
    timers.push(setTimeout(() => setCanContinue(true), 5000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  };

  const handleSplashClick = () => {
    if (canContinue && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        navigate('/home');
      }, 800);
    }
  };

  const parallaxX = (mousePos.x - 50) * -0.02;
  const parallaxY = (mousePos.y - 50) * -0.02;

  return (
    <div
      onClick={handleSplashClick}
      onMouseMove={handleMouseMove}
      style={{
        height: '100vh', width: '100vw', backgroundColor: '#000',
        overflow: 'hidden', cursor: canContinue ? 'pointer' : 'crosshair',
        opacity: isTransitioning ? 0 : 1,
        animation: 'fadeInSplash 1s ease-out forwards',
        transition: 'opacity 0.8s ease-in-out',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-2%', left: '-2%', width: '104%', height: '104%',
        transform: `translate(${parallaxX}%, ${parallaxY}%)`,
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none'
      }}>
        <img
          src="/img/subway surfers assets/homepage1.png"
          alt="Splash Intro"
          style={{
            width: '100%', height: '100%', objectFit: 'fill', display: 'block',
            animation: 'kenBurns 20s alternate infinite ease-in-out'
          }}
        />
      </div>

      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(255,165,0,0.15), transparent 100%)`,
        mixBlendMode: 'screen',
        transition: 'background 0.1s ease'
      }} />

      {dialogueImages.map((dialogue, index) => (
        <img
          key={dialogue.name}
          src={dialogue.src}
          alt={dialogue.alt}
          className={`dialogue-img ${index <= dialogueIndex ? 'dialogue-visible' : ''}`}
          style={{ ...dialogue.style }}
        />
      ))}

      <div style={{
        position: 'absolute', bottom: '15%', left: '0', width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: canContinue && !isTransitioning ? 1 : 0,
        transition: 'opacity 1s ease-in',
        pointerEvents: 'none',
        zIndex: 20
      }}>
        <img
          src="/img/subway surfers assets/tap to continue.png"
          alt="Tap to Continue"
          style={{
            width: '60vw',
            maxWidth: '350px',
            pointerEvents: 'auto',
            cursor: canContinue ? 'pointer' : 'default',
            animation: canContinue ? 'pulseText 1.5s infinite alternate ease-in-out' : 'none',
            transform: 'scale(1)',
            transition: 'transform 0.15s ease',
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.7))'
          }}
          onMouseDown={(e) => {
            if (canContinue) {
              e.currentTarget.style.transform = 'scale(0.95)';
            }
          }}
          onMouseUp={(e) => {
            if (canContinue) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        />
      </div>

      <style>{`
        @keyframes fadeInSplash {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes kenBurns {
          0% { transform: scale(1); filter: brightness(0.95) saturate(1); }
          100% { transform: scale(1.03); filter: brightness(1.05) saturate(1.1); }
        }
        @keyframes pulseText {
          0% { opacity: 0.5; transform: translateY(0) scale(0.98); }
          100% { opacity: 1; transform: translateY(-3px) scale(1.02); }
        }

        .dialogue-img {
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          pointer-events: none;
        }
        .dialogue-img.dialogue-visible {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

