import React, { useState } from 'react';
import { getTrees } from './data/trees';
import AdminPanel from './AdminPanel';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, AlertCircle, MessageCircle, Newspaper, Globe, ArrowLeft, Instagram, Facebook, Youtube, PlayCircle, Building, Download } from 'lucide-react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow });

const MapUpdater = ({ center }) => { const map = useMap(); map.setView(center, 15, { animate: true }); return null; };

const FallingLeaves = () => (
  <div className="falling-leaves">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="leaf" style={{
        left: `${(i * 8.3) % 100}%`,
        animationDuration: `${7 + (i % 5)}s`,
        animationDelay: `${(i * 0.7) % 5}s`,
        width: `${10 + (i % 3) * 4}px`,
        height: `${10 + (i % 3) * 4}px`,
      }} />
    ))}
  </div>
);

const CertificateModal = ({ trees, isCorporate, companyName, nit, onClose }) => {
  if (isCorporate) {
    return (
      <div className="certificate-modal" onClick={onClose}>
        <div className="certificate-corporate" onClick={e => e.stopPropagation()}>
          <button className="btn-secondary" onClick={onClose} style={{ position: 'absolute', top: 16, left: 16 }}>✕ Cerrar</button>
          <button className="btn-orange" onClick={() => window.print()} style={{ position: 'absolute', top: 16, right: 16 }}>
            <Download size={15} /> PDF
          </button>
          <div className="cert-corp-header">
            <img src="/logo-gahia.png" alt="Gahia" style={{ height: 55 }} />
            <div style={{ textAlign: 'right' }}>
              <div className="cert-corp-title">Certificado de Cumplimiento</div>
              <div className="cert-corp-subtitle">Ley 2173 de 2021 — Áreas de Vida</div>
            </div>
          </div>
          <p style={{ textAlign: 'justify', fontSize: '1rem', lineHeight: 1.9, color: '#333', marginBottom: '1rem' }}>
            <strong>Gahia Bio S.A.S</strong> con NIT 901988628-3, certifica que la empresa{' '}
            <strong>{companyName}</strong> con NIT <strong>{nit}</strong> ha cumplido la siembra de{' '}
            <strong>{trees.length} árboles</strong> en el marco de su programa de restauración ecológica.
          </p>
          <table className="corp-table" style={{ background: 'white' }}>
            <thead>
              <tr><th>Código/Nombre</th><th>Especie</th><th>Fecha Siembra</th><th>Ubicación</th><th>Coordenadas</th></tr>
            </thead>
            <tbody>
              {trees.map(t => (
                <tr key={t.id}>
                  <td>{t.treeName}</td><td>{t.species}</td>
                  <td>{new Date(t.plantedDate).toLocaleDateString('es-CO')}</td>
                  <td>{t.location}</td>
                  <td>
                    <a href={`https://www.google.com/maps?q=${t.coordinates[0]},${t.coordinates[1]}`}
                       target="_blank" rel="noreferrer" style={{ color: '#1a7a47', fontWeight: 600 }}>
                      Ver Mapa ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cert-corp-signature">
            <div style={{ fontWeight: 'bold', color: '#1a1a1a' }}>Camilo Andres Barón Salazar</div>
            <div style={{ color: '#555' }}>Gerente — Gahia Bio S.A.S</div>
            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 4 }}>NIT: 901988628-3 | gahiaecologia@gmail.com</div>
          </div>
        </div>
      </div>
    );
  }

  const tree = trees[0];
  return (
    <div className="certificate-modal" onClick={onClose}>
      <div className="certificate-content" onClick={e => e.stopPropagation()}>
        <button className="btn-secondary" onClick={onClose} style={{ position: 'absolute', top: 16, left: 16, color: '#333', borderColor: '#ccc' }}>✕ Cerrar</button>
        <button className="btn-orange" onClick={() => window.print()} style={{ position: 'absolute', top: 16, right: 16 }}>
          <Download size={15} /> Imprimir
        </button>
        <img src="/logo-oxigeno.png" alt="Logo" style={{ height: 128, marginBottom: '1rem' }} />
        <h1 className="cert-title">Certificado de Adopción</h1>
        <p className="cert-text">Gahia Bio S.A.S certifica que:</p>
        <div className="cert-name">{tree.adopterName}</div>
        <p className="cert-text">
          Ha adoptado un <strong>{tree.species}</strong> bautizado como "{tree.treeName}".<br />
          Plantado el {new Date(tree.plantedDate).toLocaleDateString('es-CO')} en {tree.location}.
        </p>
        <div className="cert-footer">
          <div style={{ textAlign: 'center' }}>
            <img src="/logo-sammy-full.png" alt="Sammy" style={{ height: 200, objectFit: 'contain' }} />
            <div style={{ fontWeight: 700, color: '#1a7a47', marginTop: 4 }}>Sammy LA PAVA</div>
          </div>
          <div className="cert-signature">
            <div style={{ fontWeight: 700, color: '#1a1a1a' }}>Camilo Andres Barón Salazar</div>
            <div style={{ fontSize: '0.85rem', color: '#555' }}>Gerente — Gahia Bio S.A.S</div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>NIT: 901988628-3</div>
          </div>
        </div>
        <button className="btn-primary no-print" onClick={() => window.print()} style={{ marginTop: '2rem', width: '100%', justifyContent: 'center', gap: 10, fontSize: '1.2rem' }}>
          <Download size={22} /> Descargar / Imprimir Certificado
        </button>
      </div>
    </div>
  );
};

const ContactModal = ({ onClose }) => (
  <div className="certificate-modal" onClick={onClose}>
    <div className="certificate-content contact-modal" onClick={e => e.stopPropagation()}>
      <button className="btn-secondary" onClick={onClose} style={{ position: 'absolute', top: 16, left: 16, color: '#333', borderColor: '#ccc' }}>✕ Cerrar</button>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <img src="/logo-gahia.png" alt="Gahia Bio" style={{ height: 100, marginBottom: '1rem', objectFit: 'contain' }} />
        <h2 style={{ color: 'var(--green-400)', fontFamily: "'Playfair Display', serif" }}>Contacto Gahia Bio</h2>
        <p style={{ color: '#555', marginBottom: '2rem' }}>Conéctate con nosotros y sé parte del cambio.</p>
        
        <div className="social-logos-container">
          <a href="https://www.instagram.com/gahiabio" target="_blank" rel="noreferrer" className="social-icon-link instagram">
            <Instagram size={40} />
          </a>
          <a href="https://www.facebook.com/gahiabio" target="_blank" rel="noreferrer" className="social-icon-link facebook">
            <Facebook size={40} />
          </a>
          <a href="https://www.youtube.com/@gahiabio" target="_blank" rel="noreferrer" className="social-icon-link youtube">
            <Youtube size={40} />
          </a>
          <a href="https://wa.me/573508864036" target="_blank" rel="noreferrer" className="social-icon-link whatsapp">
            <MessageCircle size={40} />
          </a>
        </div>

        <div style={{ marginTop: '2.5rem', borderTop: '2px dashed #eee', paddingTop: '2rem' }}>
          <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>Descargas Oficiales</h4>
          <a href="/app-icon.png" download="Identidad-Gahia-Bio.png" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem', background: 'linear-gradient(135deg, #208a51 0%, #1a7a47 100%)', boxShadow: '0 10px 20px rgba(32,138,81,0.3)' }}>
            📥 Descargar Logo Oficial (+ Oxígeno)
          </a>
          <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.8rem' }}>Usa este logo para tus publicaciones y certificados</p>
        </div>
      </div>
    </div>
  </div>
);

const AdoptModal = ({ onClose }) => (
  <div className="certificate-modal" onClick={onClose}>
    <div className="certificate-content adopt-modal" onClick={e => e.stopPropagation()}>
      <button className="btn-secondary" onClick={onClose} style={{ position: 'absolute', top: 16, left: 16, color: '#333', borderColor: '#ccc' }}>✕ Cerrar</button>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <img src="/logo-oxigeno.png" alt="+ Oxígeno + Vida" style={{ height: 100, marginBottom: '1rem', objectFit: 'contain' }} />
        <h2 style={{ color: 'var(--orange)', fontFamily: "'Playfair Display', serif" }}>¿Cómo Adoptar un Árbol?</h2>
        <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Únete a nuestra campaña y deja una huella positiva en el planeta.
        </p>
        
        <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--green-400)', marginBottom: '0.5rem' }}>🏢 Para Empresas (Ley 2173)</h3>
          <p style={{ color: '#444', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Cumple con la normativa nacional sembrando árboles por cada empleado. Te entregamos certificados legales y georreferenciación.
          </p>
          <h3 style={{ color: 'var(--green-400)', marginBottom: '0.5rem' }}>🌱 Para Personas</h3>
          <p style={{ color: '#444', fontSize: '0.9rem' }}>
            Adopta un árbol a tu nombre o regálalo a un ser querido. Recibirás actualizaciones de su crecimiento y un certificado de adopción.
          </p>
        </div>
        
        <a href="https://wa.me/573508864036?text=Hola%20Gahia%20Bio%2C%20quiero%20adoptar%20un%20árbol%20🌳" target="_blank" rel="noreferrer" className="btn-orange" style={{ display: 'inline-flex', padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
          ¡Adopta Ahora vía WhatsApp!
        </a>
      </div>
    </div>
  </div>
);
const VALID_ACCESS_KEYS = ['GAHIA2026', 'OXIGENO2173', 'SAMMY2024', 'ADMIN-GAHIA'];

const AdminAuthModal = ({ onLogin, onClose }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validKeys = ['GAHIA2026', 'OXIGENO2173', 'SAMMY2024', 'ADMIN-GAHIA', 'GAHIA-MASTER-2026'];
    if (validKeys.includes(key.trim().toUpperCase())) {
      onLogin();
    } else {
      setError('Clave de acceso incorrecta');
      setKey('');
    }
  };

  return (
    <div className="certificate-modal" onClick={onClose}>
      <div className="certificate-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
        <button className="btn-secondary" onClick={onClose} style={{ position: 'absolute', top: 16, left: 16 }}>✕</button>
        <div style={{ marginBottom: '1.5rem', color: 'var(--green-400)' }}>
          <Building size={48} style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#1a7a47' }}>Acceso Administrativo</h2>
        </div>
        <p style={{ color: '#555', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Ingresa tu llave de acceso personal para gestionar la siembra y adoptantes.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Llave de acceso"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="input-field"
            autoFocus
            style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px', color: '#333', borderColor: '#ccc' }}
          />
          {error && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState('client');
  const [showCertificate, setShowCertificate] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const treesData = getTrees();

  const handleSearch = e => {
    e.preventDefault();
    setError('');
    if (!searchInput.trim()) { setError('Por favor ingresa un correo o NIT.'); return; }
    setIsLoading(true);
    setTimeout(() => {
      const term = searchInput.toLowerCase().trim();
      const corpTrees = treesData.filter(t => t.isCompany && t.nit && String(t.nit).toLowerCase().trim() === term);
      if (corpTrees.length > 0) { setSearchResult({ type: 'corporate', data: corpTrees }); setIsLoading(false); return; }
      const ind = treesData.find(t => !t.isCompany && t.email && String(t.email).toLowerCase().trim() === term);
      if (ind) { setSearchResult({ type: 'individual', data: ind }); }
      else { setError('No encontramos árboles con ese correo o NIT.'); }
      setIsLoading(false);
    }, 800);
  };

  const resetSearch = () => { setSearchResult(null); setSearchInput(''); setError(''); };
  const calculateCO2 = date => Math.max(1, Math.round(((new Date() - new Date(date)) / (1000 * 60 * 60 * 24 * 365)) * 22));

  if (view === 'admin') return <AdminPanel onBack={() => setView('client')} />;

  if (view === 'media') return (
    <div className="app-container">
      <FallingLeaves />
      <header className="header">
        <div className="logo-container">
          <img src="/logo-oxigeno.png" alt="+ Oxígeno + Vida" style={{ height: 88 }} />
          <div style={{ height: 36, width: 1, background: 'rgba(255,255,255,0.15)' }} className="hide-mobile" />
          <img src="/logo-gahia.png" alt="Gahia Bio" style={{ height: 42 }} className="hide-mobile" />
        </div>
        <button className="btn-secondary" onClick={() => setView('client')}>
          <ArrowLeft size={15} /> Volver
        </button>
      </header>
      <div className="media-page" style={{ paddingTop: '1.5rem' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: 'var(--white)', marginBottom: '0.3rem' }}>
          🌿 Explora Gahia
        </h1>
        <p style={{ color: 'var(--gray-400)', marginBottom: '1.5rem' }}>Contenido educativo, noticias y comunidad verde</p>
        <div className="media-grid">
          <div className="media-card">
            <h2><PlayCircle size={20} color="var(--green-400)" /> Documental Reforestación</h2>
            <div className="video-embed">
              <iframe
                src="https://www.youtube.com/embed/oarMBDnMGbQ"
                title="Documental Reforestación Colombia"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p>Cómo la siembra de árboles está transformando las cuencas hídricas de Colombia.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="media-card">
              <h3><Newspaper size={18} color="var(--orange)" /> Ley 2173 de 2021</h3>
              <p>Las empresas colombianas deben sembrar árboles por cada empleado. Conoce cómo Gahia Bio facilita el cumplimiento.</p>
              <a
                href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=169971"
                target="_blank" rel="noreferrer"
                className="article-link"
              >
                Leer Ley completa ↗
              </a>
            </div>

            <div className="media-card">
              <h3><Globe size={18} color="var(--green-400)" /> Artículo: Bosques Nativos</h3>
              <p>La importancia de recuperar los ecosistemas nativos en los Andes colombianos para garantizar el agua.</p>
              <a
                href="https://www.wwf.org.co/nuestro_trabajo/bosques/"
                target="_blank" rel="noreferrer"
                className="article-link"
              >
                Ver en WWF Colombia ↗
              </a>
            </div>

            <div className="media-card" style={{ textAlign: 'center' }}>
              <h3 style={{ justifyContent: 'center' }}>📲 Síguenos en Redes</h3>
              <p style={{ marginBottom: '1rem' }}>Únete a nuestra comunidad verde y comparte tu impacto.</p>
              <div className="social-row">
                <a href="https://www.instagram.com/gahiabio" target="_blank" rel="noreferrer" className="social-btn instagram">
                  <Instagram size={15} /> Instagram
                </a>
                <a href="https://www.facebook.com/gahiabio" target="_blank" rel="noreferrer" className="social-btn facebook">
                  <Facebook size={15} /> Facebook
                </a>
                <a href="https://www.youtube.com/@gahiabio" target="_blank" rel="noreferrer" className="social-btn youtube">
                  <Youtube size={15} /> YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (view === 'bosque') return (
    <div className="app-container" style={{ height: '100vh', overflow: 'hidden' }}>
      <header className="header bosque-header">
        <div className="logo-container">
          <img src="/logo-oxigeno.png" alt="+ Oxígeno + Vida" style={{ height: 88 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'var(--green-300)', fontSize: '0.9rem' }}>
            🌳 {treesData.length} árboles sembrados
          </span>
          <button className="btn-secondary" onClick={() => setView('client')}>
            <ArrowLeft size={15} /> Volver
          </button>
        </div>
      </header>
      <MapContainer center={[4.5709, -74.2973]} zoom={6} style={{ height: '100%', width: '100%', paddingTop: '65px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
        {treesData.map(tree => (
          <Marker key={tree.id} position={tree.coordinates}>
            <Popup>
              <strong>{tree.treeName}</strong> — {tree.species}<br />
              {tree.isCompany ? `🏢 ${tree.companyName}` : `🌱 ${tree.adopterName}`}<br />
              <a href={`https://www.google.com/maps?q=${tree.coordinates[0]},${tree.coordinates[1]}`}
                 target="_blank" rel="noreferrer" style={{ color: '#1a7a47', fontSize: '0.85rem' }}>
                Ver en Google Maps ↗
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );

  return (
    <div className="app-container">
      <FallingLeaves />

      {showCertificate && searchResult?.type === 'individual' && (
        <CertificateModal trees={[searchResult.data]} isCorporate={false} onClose={() => setShowCertificate(false)} />
      )}
      {showCertificate && searchResult?.type === 'corporate' && (
        <CertificateModal
          trees={searchResult.data} isCorporate={true}
          companyName={searchResult.data[0].companyName}
          nit={searchResult.data[0].nit}
          onClose={() => setShowCertificate(false)}
        />
      )}
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
      {showAdoptModal && <AdoptModal onClose={() => setShowAdoptModal(false)} />}
      {showAdminAuth && (
        <AdminAuthModal
          onLogin={() => {
            setIsAdminAuthenticated(true);
            setShowAdminAuth(false);
            setView('admin');
          }}
          onClose={() => setShowAdminAuth(false)}
        />
      )}

      <a href="https://wa.me/573508864036?text=Hola%20Gahia%20Bio%2C%20quiero%20adoptar%20un%20árbol%20🌳"
         className="whatsapp-btn" target="_blank" rel="noreferrer" title="Chatea con Gahia Bio">
        <MessageCircle size={28} />
      </a>

      <header className="header">
        <div className="logo-container">
          {(searchResult || view !== 'client') ? (
            <>
              <img src="/logo-oxigeno.png" alt="+ Oxígeno + Vida" style={{ height: 60 }} />
              <div style={{ height: 36, width: 1, background: 'rgba(255,255,255,0.15)' }} className="hide-mobile" />
              <img src="/logo-gahia.png" alt="Gahia Bio S.A.S" style={{ height: 42 }} className="hide-mobile" />
            </>
          ) : null}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="nav-btn" onClick={() => setView('media')}>
            <Newspaper size={14} /> Noticias
          </button>
          <button className="nav-btn" onClick={() => setView('bosque')}>
            <Globe size={14} /> Bosque
          </button>
          {searchResult && (
            <button className="nav-btn" onClick={resetSearch}>
              <ArrowLeft size={14} /> Volver
            </button>
          )}
          <button className="nav-btn admin" onClick={() => {
            if (isAdminAuthenticated) {
              setView('admin');
            } else {
              setShowAdminAuth(true);
            }
          }}>Admin</button>
        </div>
      </header>

      {!searchResult ? (
        <main className="main-content home-redesign-v2">
          {/* Fila Superior: Logos y Texto Gigante */}
          <div className="hero-top-row">
            <div className="hero-logo-item gahia-pulse" onClick={() => setShowContactModal(true)}>
              <img src="/logo-gahia.png" alt="Gahia Bio" className="gahia-logo-main" />
              <div className="pulse-hint">¡Conócenos!</div>
            </div>
            <div className="hero-text-item" onClick={() => setShowAdoptModal(true)}>
              <img src="/logo-oxigeno.png" alt="+ Oxígeno + Vida" className="oxigeno-logo-top" />
            </div>
          </div>

          {/* Área Central: Sammy y Buscador */}
          <div className="hero-mid-area">
            <div className="sammy-side-container">
              <div className="sammy-assets-v2">
                <div className="sammy-bubble-v2">
                  ¡Bienvenidos,<br/>+ oxígeno + vida!
                </div>
                <video
                  src="/sammy.webm"
                  autoPlay loop muted playsInline
                  className="sammy-mascot-v2"
                />
                <img src="/logo-sammy-text.png.png" alt="Sammy" className="sammy-text-logo-v2" />
              </div>
            </div>

            <div className="search-card-v2">
              <h2 className="search-title">Encuentra tu <span>Árbol</span></h2>
              <p className="search-desc">
                Ingresa tu correo electrónico (Personas) o NIT (Empresas) para ver tu árbol y su impacto ambiental.
              </p>
              {error && <div className="error-message"><AlertCircle size={17} /> {error}</div>}
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="correo@ejemplo.com o NIT"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  className="input-field"
                />
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Buscando...' : 'Buscar Árboles'}
                </button>
              </form>
              <div className="stats-row-v2">
                <div className="stat-item-v2">
                  <span className="stat-icon">🌳</span>
                  <div className="stat-value-v2">{treesData.length}</div>
                  <div className="stat-label-v2">Árboles Sembrados</div>
                </div>
                <div className="stat-item-v2">
                  <span className="stat-icon">☁️</span>
                  <div className="stat-value-v2">{treesData.reduce((s, t) => s + calculateCO2(t.plantedDate), 0).toFixed(1)} kg</div>
                  <div className="stat-label-v2">CO₂ Absorbido</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : searchResult.type === 'corporate' ? (
        <div className="main-content" style={{ zIndex: 10, paddingTop: '1.5rem', paddingBottom: '2rem' }}>
          <div className="corp-dashboard">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <Building size={20} color="var(--green-400)" />
                  <h1 style={{ color: 'var(--white)', fontSize: '1.6rem', fontFamily: "'Playfair Display', serif" }}>Dashboard Corporativo</h1>
                </div>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem' }}>
                  <strong style={{ color: 'var(--white)' }}>{searchResult.data[0].companyName}</strong> — NIT: {searchResult.data[0].nit}
                </p>
              </div>
              <button className="btn-orange" onClick={() => setShowCertificate(true)} id="btn-cert-corp">
                <Download size={16} /> Certificado Ley 2173
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="corp-stat" style={{ background: 'rgba(32,138,81,0.15)', border: '1px solid rgba(32,138,81,0.25)' }}>
                <div className="corp-stat-icon" style={{ background: 'rgba(32,138,81,0.3)' }}>
                  <Leaf size={22} color="var(--green-300)" />
                </div>
                <div>
                  <div className="corp-stat-num" style={{ color: 'var(--green-300)' }}>{searchResult.data.length}</div>
                  <div className="corp-stat-label">Árboles Sembrados</div>
                </div>
              </div>
              <div className="corp-stat" style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>
                <div className="corp-stat-icon" style={{ background: 'rgba(249,115,22,0.2)' }}>
                  <Globe size={22} color="var(--orange)" />
                </div>
                <div>
                  <div className="corp-stat-num" style={{ color: 'var(--orange)' }}>
                    {searchResult.data.reduce((s, t) => s + calculateCO2(t.plantedDate), 0)} kg
                  </div>
                  <div className="corp-stat-label">CO₂ Absorbido</div>
                </div>
              </div>
            </div>

            <h3 style={{ color: 'var(--green-100)', marginBottom: '0.8rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Listado de Árboles
            </h3>
            <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="corp-table">
                <thead>
                  <tr><th>Nombre/Código</th><th>Especie</th><th>Ubicación</th><th>Fecha</th><th>Mapa</th></tr>
                </thead>
                <tbody>
                  {searchResult.data.map(t => (
                    <tr key={t.id}>
                      <td>{t.treeName}</td>
                      <td>{t.species}</td>
                      <td>{t.location}</td>
                      <td>{new Date(t.plantedDate).toLocaleDateString('es-CO')}</td>
                      <td>
                        <a href={`https://www.google.com/maps?q=${t.coordinates[0]},${t.coordinates[1]}`}
                           target="_blank" rel="noreferrer"
                           style={{ color: 'var(--green-400)', fontWeight: 600, textDecoration: 'none', fontSize: '0.85rem' }}>
                          Ver ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="map-view-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="map-layout">
            <div className="info-section">
              <div className="tree-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 className="tree-title">{searchResult.data.treeName}</h2>
                    <div className="tree-subtitle"><MapPin size={14} /> {searchResult.data.location}</div>
                  </div>
                  <button className="btn-orange" onClick={() => setShowCertificate(true)} id="btn-cert-ind" style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}>
                    <Download size={14} /> Certificado
                  </button>
                </div>
              </div>

              <div className="tree-photo-container">
                <img src={searchResult.data.photoUrl} alt="Foto del árbol" className="tree-photo" />
              </div>

              <div className="co2-badge">
                <div className="co2-icon"><Leaf size={20} /></div>
                <div>
                  <div className="co2-label">Impacto Ambiental Estimado</div>
                  <div className="co2-value"><strong>{calculateCO2(searchResult.data.plantedDate)} kg</strong> de CO₂ absorbido</div>
                </div>
              </div>

              <div>
                <h4 style={{ color: 'var(--green-300)', marginBottom: '0.6rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Diario de Crecimiento
                </h4>
                <div className="timeline">
                  <div className="timeline-item">
                    <strong>Día de Siembra</strong>
                    <p>{new Date(searchResult.data.plantedDate).toLocaleDateString('es-CO')} — {searchResult.data.species} sembrado en tierra.</p>
                  </div>
                  <div className="timeline-item">
                    <strong>Actualidad</strong>
                    <p>{new Date().toLocaleDateString('es-CO')} — ¡Creciendo sano y fuerte! 🌿</p>
                  </div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-card">
                  <div className="info-label">Adoptante</div>
                  <div className="info-value">{searchResult.data.adopterName}</div>
                </div>
                <div className="info-card">
                  <div className="info-label">Especie</div>
                  <div className="info-value">{searchResult.data.species}</div>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps?q=${searchResult.data.coordinates[0]},${searchResult.data.coordinates[1]}`}
                target="_blank" rel="noreferrer"
                className="btn-secondary"
                style={{ textDecoration: 'none', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <MapPin size={14} /> Abrir en Google Maps
              </a>

              <div className="mascot-card">
                <video
                  src="/sammy.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="sammy-mascot"
                  style={{ width: 70, objectFit: 'contain' }}
                />
                <div className="mascot-text">
                  ¡Hola, soy <strong>Sammy LA PAVA</strong>! 🐦<br />
                  Gracias por aportar + Oxígeno y + Vida. ¡Tu árbol me hace muy feliz!
                </div>
              </div>
            </div>

            <div className="map-section">
              <MapContainer center={searchResult.data.coordinates} zoom={14} scrollWheelZoom>
                <TileLayer attribution="© OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={searchResult.data.coordinates}>
                  <Popup>
                    <strong>{searchResult.data.treeName}</strong><br />
                    {searchResult.data.species}
                  </Popup>
                </Marker>
                <MapUpdater center={searchResult.data.coordinates} />
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
