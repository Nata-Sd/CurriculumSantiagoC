import React, { useState } from 'react';
import './Footer.css';

function SocialLink({ icon, label, href, tooltip }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="social-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`social-btn ${hovered ? 'social-btn--hovered' : ''}`}
      >
        <span className="social-icon">{icon}</span>
        <span className="social-label">{label}</span>
        <span className={`social-underline ${hovered ? 'social-underline--visible' : ''}`} />
      </a>
      {hovered && (
        <div className="f-tooltip">
          {tooltip}
          <div className="f-tooltip-arrow" />
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  const links = [
    {
      icon: '💼',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/breyner-santiago-bastidas-caicedo-734644309',
      tooltip: 'Perfil profesional',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      href: ' https://github.com/Santiago-B612',
      tooltip: 'Repositorios & proyectos',
    },
    {
      icon: '✉️',
      label: 'Correo',
      href: 'caicedosantiago256@gmail.com',
      tooltip: 'tucorreo@email.com',
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-grid" />
      <div className="footer-topline" />
      <div className="footer-inner">


        <div className="footer-left">
          <div className="avatar">
            <span className="avatar-initials">SC</span>
            <span className="avatar-ring" />
          </div>
          <div className="footer-name-block">
            <p className="footer-fullname">Breyner Santiago Caicedo Bastidas</p>
            <p className="footer-role">⚡ Ingeniero Electrónico</p>
          </div>
        </div>


        <div className="footer-divider" />
   
        <div className="footer-right">
          <p className="footer-connect-label"> CONECTEMOS</p>
          <div className="footer-links">
            {links.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} &nbsp;
          <span className="footer-copy-accent">Santiago Caicedo</span>
        </span>
      </div>
    </footer>
  );
}