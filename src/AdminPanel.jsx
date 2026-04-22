import React, { useState } from 'react';
import { getTrees, addTree } from './data/trees';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { ArrowLeft, Save, MapPin, Building, User, CheckCircle } from 'lucide-react';

const LocationPicker = ({ position, setPosition }) => {
  useMapEvents({ click(e) { setPosition([e.latlng.lat, e.latlng.lng]); } });
  return position ? <Marker position={position} /> : null;
};

export default function AdminPanel({ onBack }) {
  const [trees, setTrees] = useState(getTrees());
  const [isCompany, setIsCompany] = useState(false);
  const [formData, setFormData] = useState({
    email: '', adopterName: '', nit: '', companyName: '',
    treeName: '', species: '', location: '', photoUrl: '',
    plantedDate: new Date().toISOString().split('T')[0],
  });
  const [position, setPosition] = useState([4.5709, -74.2973]);
  const [successMsg, setSuccessMsg] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) { alert('Geolocalización no soportada.'); return; }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => { setPosition([pos.coords.latitude, pos.coords.longitude]); setIsLocating(false); },
      () => { alert('Error al obtener ubicación. Verifica permisos GPS.'); setIsLocating(false); },
      { enableHighAccuracy: true }
    );
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTree({ ...formData, isCompany, id: `arb-${Date.now()}`, coordinates: position,
      message: isCompany ? 'Aporte corporativo al medio ambiente.' : '¡Un nuevo árbol plantado con amor!' });
    setTrees(getTrees());
    setSuccessMsg('¡Árbol registrado exitosamente!');
    setFormData({ email: '', adopterName: '', nit: '', companyName: '', treeName: '', species: '', location: '', photoUrl: '',
      plantedDate: new Date().toISOString().split('T')[0] });
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #071a0e 0%, #0a2e1a 100%)' }}>
      <header className="header">
        <div className="logo-container">
          <img src="/logo-oxigeno.png" alt="Logo" style={{ height: 50 }} />
          <span style={{ color: 'var(--green-300)', fontWeight: 700, fontSize: '1rem' }}>Panel de Administración</span>
        </div>
        <button className="btn-secondary" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={15} /> Volver a la App
        </button>
      </header>

      <div className="admin-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

          {/* FORM */}
          <div className="admin-card">
            <h2>Agregar Nuevo Árbol</h2>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button type="button" className={!isCompany ? 'btn-primary' : 'btn-secondary'}
                style={{ flex: 1, padding: '0.7rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={() => setIsCompany(false)}>
                <User size={16} /> Persona Natural
              </button>
              <button type="button" className={isCompany ? 'btn-primary' : 'btn-secondary'}
                style={{ flex: 1, padding: '0.7rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={() => setIsCompany(true)}>
                <Building size={16} /> Empresa (Ley 2173)
              </button>
            </div>

            {successMsg && (
              <div className="success-msg" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
                <CheckCircle size={18} /> {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {!isCompany ? (
                <>
                  <div className="form-group">
                    <label>Correo del Adoptante</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="input-field" placeholder="correo@ejemplo.com" />
                  </div>
                  <div className="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" name="adopterName" value={formData.adopterName} onChange={handleInputChange} required className="input-field" placeholder="Nombres y Apellidos" />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>NIT de la Empresa</label>
                    <input type="text" name="nit" value={formData.nit} onChange={handleInputChange} required className="input-field" placeholder="Ej: 900123456" />
                  </div>
                  <div className="form-group">
                    <label>Razón Social</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required className="input-field" placeholder="Nombre legal de la empresa" />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Nombre del Árbol / Código Interno</label>
                <input type="text" name="treeName" value={formData.treeName} onChange={handleInputChange} required className="input-field" placeholder="Ej: Esperanza, ARB-2024-001" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div className="form-group">
                  <label>Especie</label>
                  <input type="text" name="species" value={formData.species} onChange={handleInputChange} required className="input-field" placeholder="Ej: Nogal Bogotano" />
                </div>
                <div className="form-group">
                  <label>Fecha de Siembra</label>
                  <input type="date" name="plantedDate" value={formData.plantedDate} onChange={handleInputChange} required className="input-field" />
                </div>
              </div>

              <div className="form-group">
                <label>Ubicación (texto)</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="input-field" placeholder="Ej: Vereda El Paraíso, Acacías, Meta" />
              </div>

              <div className="form-group">
                <label>URL de la Foto del Árbol</label>
                <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleInputChange} required className="input-field" placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> Coordenadas GPS</label>
                <button type="button" onClick={handleGetLocation} className="btn-secondary"
                  disabled={isLocating}
                  style={{ marginBottom: 8, width: '100%', justifyContent: 'center', padding: '0.7rem' }}>
                  <MapPin size={15} /> {isLocating ? 'Obteniendo señal GPS...' : '📍 Capturar Mi Ubicación Actual'}
                </button>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.6rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--gray-400)' }}>
                  Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}<br />
                  <small>O haz clic en el mapa para ajustar</small>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
                <Save size={17} /> Guardar Árbol en el Sistema
              </button>
            </form>
          </div>

          {/* MAP + RECORDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ height: 360, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(45,180,90,0.2)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
              <MapContainer center={position} zoom={position[0] === 4.5709 ? 6 : 16} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>

            <div className="admin-card" style={{ maxHeight: 380, overflowY: 'auto' }}>
              <h2 style={{ marginBottom: '1rem' }}>Registros ({trees.length})</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {trees.slice().reverse().map(tree => (
                  <div key={tree.id} className="tree-record">
                    <strong>{tree.treeName}</strong> — <span style={{ color: 'var(--green-300)', fontSize: '0.88rem' }}>{tree.species}</span><br />
                    <small>{tree.isCompany ? `🏢 ${tree.companyName} (NIT: ${tree.nit})` : `✉️ ${tree.email}`}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
