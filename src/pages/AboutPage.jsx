

const SnackwaySurfersPage = () => {
  const styles = {
    container: {
      fontFamily: '"Nunito", sans-serif',
      color: '#ffffff',
      minHeight: '100vh',
    },
    topSection: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#390d63',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden'
    },
    bgImage: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 0,
      backgroundImage: `url('/img/purple.png')`
    },
    navBar: {
      width: '100%',
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '40px 64px'
    },
    creatorsContainer: {
      zIndex: 10,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      padding: '20px'
    },

    section2: {
      width: '100%',
      padding: '80px 0px', // no side padding so the split background colors bleed to the edges
      display: 'flex',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #ffe800 0%, #ffe800 50%, #ff8c00 50%, #ff8c00 100%)'
    },
    cardsGrid: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0px', // spacing comes from centering each card within its background half
      position: 'relative',
      zIndex: 10,
      justifyItems: 'center'
    },
    pinkCard: {
      backgroundColor: '#ff009d',
      padding: '40px',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'row',
      gap: '24px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      border: '4px solid #ff009d',
      maxWidth: '550px',
      width: '90%'
    },
    greenCard: {
      backgroundColor: '#b3ff00',
      padding: '40px',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'row',
      gap: '24px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      border: '4px solid #b3ff00',
      maxWidth: '550px',
      width: '90%'
    },
    imageCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '120px',
      flexShrink: 0
    },
    placeholderImage: {
      width: '100%',
      aspectRatio: '1 / 1',
      objectFit: 'cover',
      borderRadius: '12px',
      backgroundColor: '#000'
    },
    cardTextCol: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: '8px',
      color: '#000'
    },
    section3: {
      width: '100%',
      padding: '96px 0px',
      display: 'flex',
      justifyContent: 'center',
      background: 'linear-gradient(85deg, #a100ff 0%, #a100ff 33.3%, #6805c3 33.3%, #6805c3 66.6%, #2d015c 66.6%, #2d015c 100%)',
      position: 'relative'
    },
    overlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: '#270341',
      mixBlendMode: 'multiply',
      opacity: 0.1
    },
    purpleBoxesGrid: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '0px',
      position: 'relative',
      zIndex: 10,
      justifyItems: 'center'
    },
    purpleBox: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: '20px',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    
    section4: {
      width: '100%',
      padding: '96px 40px',
      backgroundColor: '#fbff00',
      color: '#000',
      display: 'flex',
      justifyContent: 'center'
    },
    joinContainer: {
      maxWidth: '1100px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    joinGrid: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '96px',
      textAlign: 'left'
    },
    footerContainer: {
      width: '100%',
      padding: '32px 40px 48px',
      backgroundColor: '#fbff00',
      color: '#000',
      display: 'flex',
      justifyContent: 'center'
    },
    footerInner: {
      maxWidth: '1100px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;700;800;900&display=swap');
        .custom-display-font {
          font-family: 'Lilita One', cursive, sans-serif;
        }
      `}</style>
     
      <section style={styles.topSection}>
        <div style={styles.bgImage}></div>

        
        <div style={styles.navBar}>
          <div style={{ width: '40px' }}></div> {/* empty div so the logo stays centered in the flex row */}
          <img
            src="/img/logo.png"
            alt="Snackway Surfers Logo"
            style={{
              height: '150px',
              top: '130px',
              objectFit: 'contain',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
          <button style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10 }}>
            <svg style={{ width: '40px', height: '40px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div style={styles.creatorsContainer}>
          <img src="/img/creators.png" alt="CREATORS" style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }} />
        </div>


      </section>

      <section style={styles.section2}>
        <div style={styles.cardsGrid}>

        
          <div style={styles.pinkCard}>
            <div style={styles.imageCol}>
              <img src="/img/about/deanna1.jpeg" alt="Content Creator" style={styles.placeholderImage} />
              <img src="/img/about/deanna2.jpeg" alt="Content Creator" style={styles.placeholderImage} />
            </div>

            <div style={styles.cardTextCol}>
              <h2 className="custom-display-font" style={{ fontSize: '3.5rem', textTransform: 'uppercase', color: '#ffe800', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 16px 0', textShadow: '0 4px 6px rgba(0,0,0,0.1)', WebkitTextStroke: '2px #ff009d' }}>
                DEANNA<br />MABEN
              </h2>

              <p style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: 1.4, margin: 0 }}>Would rather talk to a rock than be in college, yet here she is, peak resilience. Ambitious but lazy, and too nonchalant to show it. Don’t be surprised if she opens a cafe someday, because praan jaye but aesthetics na jaye.<br />50 rupees to you if you can piss her off.</p>
            </div>
          </div>

          <div style={styles.greenCard}>
            <div style={styles.imageCol}>
              <img src="/img/about/tanvi1.jpeg" alt="Edible Artist" style={styles.placeholderImage} />
              <img src="/img/about/tanvi2.jpeg" alt="Edible Artist" style={styles.placeholderImage} />
            </div>

            <div style={styles.cardTextCol}>
              <h2 className="custom-display-font" style={{ fontSize: '3.5rem', textTransform: 'uppercase', color: '#000', lineHeight: 0.9, letterSpacing: '0.02em', margin: '0 0 16px 0', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                TANVI<br />PAI
              </h2>

              <p style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: 1.4, margin: 0 }}>If you spot a random handkerchief or hear a phone hit the floor, you already know she’s in the room. <br />She runs on pure chaos and clumsiness, but the moment it’s time to work, she’s locked in. A walking mess, a creative on her feet, and somehow always making it work.</p>
            </div>
          </div>

        </div>
      </section>

      
      <section style={styles.section3}>
        <div style={styles.overlay}></div>
        <div style={styles.purpleBoxesGrid}>

          <div style={styles.purpleBox}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', maxWidth: '280px', margin: '0 auto', width: '100%' }}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#fbff00" style={{ marginBottom: '32px' }}>
                <circle cx="50" cy="50" r="45" strokeWidth="4" />
                <path d="M50 35 C 20 35 15 50 15 50 C 15 50 20 65 50 65 C 80 65 85 50 85 50 C 85 50 80 35 50 35 Z" strokeWidth="4" fill="none" />
                <circle cx="50" cy="50" r="14" strokeWidth="4" fill="#fbff00" />
              </svg>

              <span style={{ fontSize: '0.875rem', fontWeight: '900', textTransform: 'uppercase', color: '#fbff00', letterSpacing: '0.1em', marginBottom: '8px' }}>PERKS</span>
              <h3 className="custom-display-font" style={{ fontSize: '2.5rem', color: '#fbff00', lineHeight: 1, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>TEST PRODUCTS</h3>
              <p style={{ fontSize: '1rem', color: '#fff', lineHeight: 1.5, margin: 0, fontWeight: '400' }}>
                Yes, it’s exactly what it sounds like. You eat snacks. Truly a tough job, but someone has to make that sacrifice.
              </p>
            </div>
          </div>

       
          <div style={styles.purpleBox}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', maxWidth: '280px', margin: '0 auto', width: '100%' }}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#fbff00" style={{ marginBottom: '32px' }}>
                <circle cx="50" cy="50" r="45" strokeWidth="4" />
                <circle cx="50" cy="50" r="38" strokeWidth="2" />
                <circle cx="50" cy="50" r="32" strokeWidth="2" />
                <path d="M50 25 L 56 42 L 74 42 L 59 52 L 64 69 L 50 60 L 36 69 L 41 52 L 26 42 L 44 42 Z" fill="#fbff00" stroke="none" />
              </svg>

              <span style={{ fontSize: '0.875rem', fontWeight: '900', textTransform: 'uppercase', color: '#fbff00', letterSpacing: '0.1em', marginBottom: '8px' }}>PERKS</span>
              <h3 className="custom-display-font" style={{ fontSize: '2.5rem', color: '#fbff00', lineHeight: 1, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>GIVEAWAY CODES</h3>
              <p style={{ fontSize: '1rem', color: '#fff', lineHeight: 1.5, margin: 0, fontWeight: '400' }}>
                Exclusive discounts so you can spend less money… and then immediately spend it again on more snacks. Financial responsibility at its finest.
              </p>
            </div>
          </div>

        
          <div style={styles.purpleBox}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', maxWidth: '280px', margin: '0 auto', width: '100%' }}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#fbff00" style={{ marginBottom: '32px' }}>
                <circle cx="50" cy="50" r="45" strokeWidth="4" />
                <g transform="translate(0, -10)">
                  <path fill="#fbff00" stroke="none" d="M 64.6,35.4 C 60.7,33.6 56.6,32.2 52.3,31.7 51.5,33.2 50.6,35.0 50,36.6 45.4,36.0 40.9,36.0 36.3,36.6 35.7,35.0 34.8,33.2 34.0,31.7 29.7,32.2 25.5,33.6 21.7,35.4 11.5,50.7 8.5,65.6 11.2,80.3 16.5,84.2 21.6,86.6 26.6,88.0 27.9,86.3 29.0,84.5 30.1,82.6 25.6,80.9 21.4,78.9 17.4,76.5 18.5,75.7 19.5,74.9 20.6,74.0 29.8,78.2 39.5,80.5 49.6,80.5 59.7,80.5 69.4,78.2 78.6,74.0 79.6,74.9 80.7,75.7 81.8,76.5 77.8,78.9 73.6,80.9 69.1,82.6 70.2,84.5 71.3,86.3 72.6,88.0 77.6,86.6 82.6,84.2 87.9,80.3 91.2,62.8 85.0,47.0 64.6,35.4 Z M 35.6,65.7 C 31.6,65.7 28.3,62.1 28.3,57.7 28.3,53.2 31.6,49.6 35.6,49.6 39.7,49.6 43.1,53.2 43.0,57.7 43.0,62.1 39.7,65.7 35.6,65.7 Z M 64.4,65.7 C 60.4,65.7 57.1,62.1 57.1,57.7 57.1,53.2 60.4,49.6 64.4,49.6 68.5,49.6 71.8,53.2 71.8,57.7 71.8,62.1 68.5,65.7 64.4,65.7 Z"></path>
                </g>
              </svg>

              <span style={{ fontSize: '0.875rem', fontWeight: '900', textTransform: 'uppercase', color: '#fbff00', letterSpacing: '0.1em', marginBottom: '8px' }}>PERKS</span>
              <h3 className="custom-display-font" style={{ fontSize: '2.5rem', color: '#fbff00', lineHeight: 1, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>COMMUNITY</h3>
              <p style={{ fontSize: '1rem', color: '#fff', lineHeight: 1.5, margin: 0, fontWeight: '400' }}>
                Join a highly sophisticated group of people whose main personality trait is loving snacks. It’s chaotic, it’s bonded, it’s slightly concerning
              </p>
            </div>
          </div>

        </div>
      </section>

      
      <section style={styles.section4}>
        <div style={styles.joinContainer}>
          <h2 className="custom-display-font" style={{ fontSize: '4.5rem', textTransform: 'uppercase', margin: '0 0 64px 0', textAlign: 'center', lineHeight: 1, letterSpacing: '0.02em' }}>WE ARE HIRING</h2>

          <div style={styles.joinGrid}>
            <div>
              <h3 className="custom-display-font" style={{ fontSize: '2.5rem', textTransform: 'uppercase', margin: '0 0 24px 0', letterSpacing: '0.02em', color: '#1a1a1a' }}>WHO CAN JOIN</h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontWeight: '800', fontSize: '1.25rem', color: '#333' }}>
                <li>• Be a fan of Snacks and Creativity</li>
                <li>• Don't eat the snacks</li>

              </ul>
            </div>

            <div>
              <h3 className="custom-display-font" style={{ fontSize: '2.5rem', textTransform: 'uppercase', margin: '0 0 24px 0', letterSpacing: '0.02em', color: '#1a1a1a' }}>HOW WE HIRE</h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontWeight: '800', fontSize: '1.25rem', color: '#333' }}>
                <li>• Highly qualified application</li>
                <li>• Portfolio & Interview</li>
                <li>• We judge you</li>
                <li>• We will think about it.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default SnackwaySurfersPage;