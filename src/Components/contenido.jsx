import React, { useState, useEffect, useRef } from 'react';
import './contenido.css';

// ══════════════════════════════════════════════════════════════════
// DATOS — Para agregar un proyecto nuevo, solo agregá un objeto acá, 
// ══════════════════════════════════════════════════════════════════
const PROYECTOS = [
  {
    id: 1,
    tag: 'Proyecto 01',
    titulo: 'Robot evasor de obstáculos',
    descripcion: 'Autónomo con sensor ultrasónico y microcontrolador.',
    tech: ['Arduino', 'C++', 'Ultrasonido'],
    color: '#dd8448',  // naranja eléctrico
  },
  
  {
    id: 2,
    tag: 'Proyecto 02',
    titulo: 'Sistema de riego solar',
    descripcion: 'Integración de panel solar y control remoto vía RF.',
    tech: ['ESP32', 'Python', 'Solar'],
    color: '#1e90ff',   
  },

  
// ══════════════════════════════════════════════════════════════════
// Este es el ejemplo que te dejo para cuando quieras añadir otro proyecto, solo copia y pega el array completo, el color que debes añadir sera el del borde 
// El resto de colores, tamaños y sombras son desde el css no desde aqui. Ahora mismo esta comentado, para que funcione retira los slash,
// al inicio de la linea 33-40
// ══════════════════════════════════════════════════════════════════

 // {  
 // id: 3,   
 //tag: 'Proyecto 03',   
 // titulo: 'Diseño PCB amplificador',   
 // descripcion: 'Amplificador de audio clase D con documentación Gerber.',
 // tech: ['KiCad', 'Eagle', 'PCB'],
 // color: '#00d4aa',  
 //},


];

// ══════════════════════════════════════════════════════════════════
// SERVICIOS — Aqui solo añade otro array, dentro de la constanste para LOS SERVICIOS, NO CONFUNDAS CON PROYECTOS
// ══════════════════════════════════════════════════════════════════

const SERVICIOS = [
  { emoji: '🔬', titulo: 'Simulación de circuitos',   desc: 'Análisis de señales, verificación funcional y validación previa a fabricación.' },
  { emoji: '🖥️', titulo: 'Diseño de PCB',             desc: 'Diseños profesionales listos para producción con documentación Gerber.' },
  { emoji: '🤖', titulo: 'Sistemas embebidos',        desc: 'Programación de microcontroladores, integración de sensores y actuadores.' },
  { emoji: '📋', titulo: 'Documentación técnica',     desc: 'Manuales, informes y diagramas técnicos listos para entrega.' },
  { emoji: '🎓', titulo: 'Talleres y formación',      desc: 'Asesorías académicas y desarrollo de talleres prácticos.' },
  { emoji: '⚙️', titulo: 'Automatización y control',  desc: 'Desarrollo de proyectos de automatización industrial y domótica.' },
];


function ElectricSVG() {
  return (
    <svg className="electric-svg" aria-hidden="true">
      <defs>
        <filter id="elec-orange" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
          <feOffset in="noise1" dx="0" dy="0" result="off1">
            <animate attributeName="dy" values="700;0" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
          <feOffset in="noise2" dx="0" dy="0" result="off2">
            <animate attributeName="dy" values="0;-700" dur="6s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>
          <feComposite in="off1" in2="off2" result="combined" />
          <feDisplacementMap in="SourceGraphic" in2="combined" scale="30" xChannelSelector="R" yChannelSelector="B" />
        </filter>
        <filter id="elec-blue" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
          <feColorMatrix type="hueRotate" result="pt1">
            <animate attributeName="values" values="0;360" dur=".6s" repeatCount="indefinite" calcMode="paced" />
          </feColorMatrix>
          <feComposite />
          <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="5" />
          <feColorMatrix type="hueRotate" result="pt2">
            <animate attributeName="values" values="0;333;199;286;64;168;256;157;360" dur="5s" repeatCount="indefinite" calcMode="paced" />
          </feColorMatrix>
          <feBlend in="pt1" in2="pt2" mode="normal" result="combined" />
          <feDisplacementMap in="SourceGraphic" in2="combined" scale="30" xChannelSelector="R" yChannelSelector="B" />
        </filter>
        <filter id="elec-cyan" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="8" seed="3" />
          <feColorMatrix type="hueRotate" result="pt1">
            <animate attributeName="values" values="160;220;160" dur="3s" repeatCount="indefinite" calcMode="paced" />
          </feColorMatrix>
          <feDisplacementMap in="SourceGraphic" scale="25" xChannelSelector="G" yChannelSelector="R" />
        </filter>
      </defs>
    </svg>
  );
}

// ── Tarjeta individual, aqui es para  ──────────────────────────────────
const FILTERS = ['elec-orange', 'elec-blue', 'elec-cyan'];

function ProjectCard({ proyecto, index }) {
  const [hovered, setHovered] = useState(false);
  const filterId = FILTERS[index % FILTERS.length];

  return (
    <div
      className={`card-wrap ${hovered ? 'card-wrap--hovered' : ''}`}
      style={{ '--card-color': proyecto.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <div className="card-inner">
        <div className="card-border-outer">
          <div
            className="card-main"
            style={{ filter: `url(#${filterId})` }}
          />
        </div>
        <div className="card-glow-1" />
        <div className="card-glow-2" />
      </div>

      <div className="card-overlay-1" />
      <div className="card-overlay-2" />
      <div className="card-bg-glow" />

      {/* Contenido */}
      <div className="card-content">
        <div className="card-top">
          <span className="card-tag">{proyecto.tag}</span>
          <p className="card-title">{proyecto.titulo}</p>
        </div>

        <hr className="card-divider" />

        <div className="card-bottom">
          <p className="card-desc">{proyecto.descripcion}</p>
          <div className="card-tech">
            {proyecto.tech.map((t) => (
              <span key={t} className="card-tech-pill">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tarjeta de servicio ───────────────────────────────────────────
function ServiceCard({ servicio }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`service-card ${hovered ? 'service-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="service-emoji">{servicio.emoji}</span>
      <h3 className="service-titulo">{servicio.titulo}</h3>
      <p className="service-desc">{servicio.desc}</p>
      <span className={`service-underline ${hovered ? 'service-underline--visible' : ''}`} />
    </div>
  );
}

function Section({ id, children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`section ${visible ? 'section--visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
}


// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────
const Contenido = () => {
  return (
    <div className="contenido-root">
      <ElectricSVG />

      <Section id="sobre-mi" className="section-bio">
        <div className="bio-grid">
          <div className="bio-text">
            <p className="bio-label">// SOBRE MÍ</p>
            <h2 className="bio-heading">Ingeniero Electrónico</h2>
            <p className="bio-body">
              Estudiante de Ingeniería Electrónica con enfoque en diseño
              electrónico, desarrollo de sistemas embebidos y soluciones
              tecnológicas basadas en hardware y software. Cuento con experiencia
              en análisis, simulación y diseño de circuitos electrónicos
              analógicos y digitales, programación de microcontroladores e
              integración de sensores y actuadores.
            </p>
            <p className="bio-body">
              Me caracterizo por ser analítico, paciente, orientado al
              aprendizaje continuo y comprometido con la creación de soluciones
              eficientes e innovadoras.
            </p>
          </div>
          <div className="bio-stats">
            {[
              { num: '10+', label: 'Proyectos' },
              { num: '3+',  label: 'Años estudiando' },
              { num: '5+',  label: 'Tecnologías' },
            ].map(({ num, label }) => (
              <div key={label} className="bio-stat">
                <span className="bio-stat-num">{num}</span>
                <span className="bio-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>


      <Section id="skills" className="section-services">
        <p className="section-label">// SERVICIOS DESTACADOS</p>
        <h2 className="section-heading">¿Qué puedo hacer por ti?</h2>
        <p className="section-sub">
          Soluciones adaptadas a entornos académicos o profesionales.
          Desde análisis de requerimientos hasta documentación técnica.
        </p>
        <div className="services-grid">
          {SERVICIOS.map((s) => (
            <ServiceCard key={s.titulo} servicio={s} />
          ))}
        </div>
      </Section>


      <Section id="proyectos" className="section-projects">
        <p className="section-label">// PROYECTOS REALIZADOS</p>
        <h2 className="section-heading">Trabajos destacados</h2>
        <div className="projects-grid">
          {PROYECTOS.map((p, i) => (
            <ProjectCard key={p.id} proyecto={p} index={i} />
          ))}
        </div>
      </Section>

    </div>
  );
};

export default Contenido;