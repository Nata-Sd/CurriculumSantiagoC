import React, { useState, useEffect } from 'react';
import './Header.css';

function NavLink({ label, target, tooltip }) {
  const [hovered, setHovered] = useState(false);

  const scrollTo = () => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="nav-link-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className={`nav-btn ${hovered ? 'nav-btn--hovered' : ''}`} onClick={scrollTo}>
        {label}
        <span className={`nav-underline ${hovered ? 'nav-underline--visible' : ''}`} />
      </button>
      {hovered && (
        <div className="tooltip">
          {tooltip}
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
}


function GlitchName() {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glitch-wrapper">
      <h1 className={`name ${glitching ? 'name--glitch' : ''}`}>
        Santiago Caicedo
      </h1>
      <p className="subtitle">⚡ Ingeniero Electrónico</p>
    </div>
  );
}


function StatusBadge() {
  return (
    <div className="status-badge">
      <span className="status-dot" />
      DISPONIBLE
    </div>
  );
}


function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Sobre mí',  target: 'sobre-mi',  tooltip: 'Perfil profesional'        },
    { label: 'Proyectos', target: 'proyectos',  tooltip: 'Trabajos destacados'       },
    { label: 'Skills',    target: 'skills',     tooltip: 'Tecnologías & herramientas' },
  ];

  
  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header-grid" />
      <div className="header-scanline" />

      <div className="header-inner">

        <div className="header-left">
           <div className="avatar">
            <span className="avatar-initials">SC</span>
            <span className="avatar-ring" />
          </div>
          <GlitchName />
        </div>

        <nav className="header-nav">
          {navItems.map((item) => (
            <NavLink key={item.target} {...item} />
          ))}
        </nav>

        <StatusBadge />
      </div>
    </header>
  );
}

export default Header;