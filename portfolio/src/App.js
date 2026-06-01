import React, { useState, useEffect } from 'react';
import './App.css';

/* ─── DIGITAL CLOCK COMPONENT ─────────────────────────────── */
function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const hours   = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());
  const dateStr = time.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="clock-widget">
      <p className="clock-label">Digital Clock</p>
      <div className="clock-display">
        <span>{hours}</span>
        <span className="colon">:</span>
        <span>{minutes}</span>
        <span className="colon">:</span>
        <span className="seconds">{seconds}</span>
      </div>
      <p className="clock-date">{dateStr}</p>
    </div>
  );
}

/* ─── CALCULATOR COMPONENT ────────────────────────────────── */
function Calculator() {
  const [display, setDisplay] = useState('');

  const append = (v) => setDisplay(prev => prev + v);
  const clear = () => setDisplay('');
  const calculate = () => {
    try {
      // Safe math evaluator - only allows numbers and operators
      const sanitized = display.replace(/[^0-9+\-*/.()]/g, '');
      if (!sanitized) return;
      // Use Function constructor as a safer alternative to eval
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + sanitized)();
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  const buttons = [
    { label: 'C',  action: clear,           cls: 'btn-clear' },
    { label: '/',  action: () => append('/'), cls: 'btn-op' },
    { label: '*',  action: () => append('*'), cls: 'btn-op' },
    { label: '-',  action: () => append('-'), cls: 'btn-op' },
    { label: '7',  action: () => append('7') },
    { label: '8',  action: () => append('8') },
    { label: '9',  action: () => append('9') },
    { label: '+',  action: () => append('+'), cls: 'btn-op' },
    { label: '4',  action: () => append('4') },
    { label: '5',  action: () => append('5') },
    { label: '6',  action: () => append('6') },
    { label: '.',  action: () => append('.') },
    { label: '1',  action: () => append('1') },
    { label: '2',  action: () => append('2') },
    { label: '3',  action: () => append('3') },
    { label: '=',  action: calculate,         cls: 'btn-eq' },
    { label: '0',  action: () => append('0'), span: true },
  ];

  return (
    <div className="calc-widget">
      <p className="clock-label">Simple Calculator</p>
      <div className="calc-display">{display || '0'}</div>
      <div className="calc-grid">
        {buttons.map((b, i) => (
          <button
            key={i}
            onClick={b.action}
            className={`calc-btn ${b.cls || ''} ${b.span ? 'span-full' : ''}`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── NAV ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <span className="nav-logo">MO</span>
      <div className="nav-links">
        {['about','skills','projects','contact'].map(s => (
          <a key={s} href={`#${s}`} className="nav-link">
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── MAIN APP ────────────────────────────────────────────── */
function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const skills = [
    { name: 'HTML & CSS', icon: '🌐', level: 75 },
    { name: 'JavaScript', icon: '⚡', level: 60 },
    { name: 'Python', icon: '🐍', level: 55 },
    { name: 'Java', icon: '☕', level: 50 },
    { name: 'C#', icon: '🔷', level: 45 },
    { name: 'React', icon: '⚛️', level: 40 },
  ];

  const projects = [
    {
      id: 'calculator',
      title: 'Simple Calculator',
      desc: 'A functional calculator built with HTML, CSS, and JavaScript — now a React component.',
      tags: ['HTML', 'CSS', 'JavaScript', 'React'],
      component: <Calculator />,
    },
    {
      id: 'clock',
      title: 'Digital Clock',
      desc: 'A live digital clock showing real-time hours, minutes, seconds, and date.',
      tags: ['HTML', 'CSS', 'JavaScript', 'React'],
      component: <DigitalClock />,
    },
    {
      id: 'sample',
      title: 'Sample Test',
      desc: 'A placeholder for an upcoming project — stay tuned!',
      tags: ['Coming Soon'],
      component: null,
    },
  ];

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-noise" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-img-wrap">
            <img src="/profile.jpg" alt="Marjon Orosco" className="hero-img" />
            <div className="hero-img-ring" />
          </div>
          <div className="hero-badge">👋 Available for collaboration</div>
          <h1 className="hero-title">
            Hello, I'm<br />
            <span className="hero-name">Marjon Orosco</span>
          </h1>
          <p className="hero-sub">College Student &nbsp;·&nbsp; Learning Web Development</p>
          <div className="hero-cta">
            <a href="#projects" className="cta-primary">View Projects</a>
            <a href="#contact" className="cta-ghost">Get in Touch</a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </header>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="section-inner">
          <span className="section-tag">01 — About</span>
          <h2 className="section-title">Who I Am</h2>
          <div className="about-grid">
            <p className="about-text">
              I am a student learning web development, coding small projects, and exploring new technologies.
              I am motivated to improve my skills and build cool projects.
            </p>
            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-num">2+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">5+</span>
                <span className="stat-label">Languages Learned</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">∞</span>
                <span className="stat-label">Curiosity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section section--alt">
        <div className="section-inner">
          <span className="section-tag">02 — Skills</span>
          <h2 className="section-title">My Skillset</h2>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <div key={i} className="skill-card">
                <span className="skill-icon">{s.icon}</span>
                <div className="skill-info">
                  <span className="skill-name">{s.name}</span>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{ '--target': `${s.level}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section">
        <div className="section-inner">
          <span className="section-tag">03 — Projects</span>
          <h2 className="section-title">What I've Built</h2>
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.id} className="project-card">
                <div className="project-card-top">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                {p.component && (
                  <button
                    className="project-toggle"
                    onClick={() => setActiveProject(activeProject === p.id ? null : p.id)}
                  >
                    {activeProject === p.id ? '▲ Hide' : '▶ Launch'}
                  </button>
                )}
                {activeProject === p.id && p.component && (
                  <div className="project-demo">
                    {p.component}
                  </div>
                )}
                {!p.component && (
                  <div className="project-coming-soon">🚧 Coming soon</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section section--alt">
        <div className="section-inner">
          <span className="section-tag">04 — Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-sub">You can reach me by email or connect on social media.</p>

          {submitted && (
            <div className="toast">✅ Thank you for your message! I'll be in touch soon.</div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Marjon Orosco"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Send Message →</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Marjon Orosco &nbsp;—&nbsp; Made by a student learning web development.</p>
      </footer>
    </>
  );
}

export default App;
