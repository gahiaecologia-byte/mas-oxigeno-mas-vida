import React, { useState } from 'react';
import { getTrees, addTree, deleteTree, updateTree } from './data/trees';
import { getContent, updateContent } from './data/content';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { ArrowLeft, Save, MapPin, Building, User, CheckCircle, Trash2, Camera, X, RefreshCw, Layout, Youtube, Instagram, Facebook, MessageCircle, Plus, Image as ImageIcon, Globe } from 'lucide-react';

const LocationPicker = ({ position, setPosition }) => {
  useMapEvents({ click(e) { setPosition([e.latlng.lat, e.latlng.lng]); } });
  return position ? <Marker position={position} /> : null;
};

const ContentManager = () => {
  const [content, setContent] = useState(getContent());
  const [success, setSuccess] = useState('');

  const handleSave = () => {
    updateContent(content);
    setSuccess('¡Contenidos actualizados correctamente!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleNewsChange = (index, field, value) => {
    const updatedNews = [...content.news];
    updatedNews[index] = { ...updatedNews[index], [field]: value };
    setContent({ ...content, news: updatedNews });
  };

  const addNews = () => {
    const newItem = {
      id: Date.now(),
      title: 'Nueva Noticia',
      description: 'Descripción aquí...',
      type: 'noticia',
      image: '',
      date: new Date().toISOString().split('T')[0]
    };
    setContent({ ...content, news: [newItem, ...content.news] });
  };

  const removeNews = (id) => {
    setContent({ ...content, news: content.news.filter(n => n.id !== id) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="admin-card">
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Globe size={24} /> Redes Sociales
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label><Instagram size={14} /> Instagram</label>
            <input type="text" className="input-field" value={content.social.instagram} 
              onChange={e => setContent({...content, social: {...content.social, instagram: e.target.value}})} />
          </div>
          <div className="form-group">
            <label><Facebook size={14} /> Facebook</label>
            <input type="text" className="input-field" value={content.social.facebook} 
              onChange={e => setContent({...content, social: {...content.social, facebook: e.target.value}})} />
          </div>
          <div className="form-group">
            <label><Youtube size={14} /> YouTube</label>
            <input type="text" className="input-field" value={content.social.youtube} 
              onChange={e => setContent({...content, social: {...content.social, youtube: e.target.value}})} />
          </div>
          <div className="form-group">
            <label><MessageCircle size={14} /> WhatsApp (Solo números)</label>
            <input type="text" className="input-field" value={content.social.whatsapp} 
              onChange={e => setContent({...content, social: {...content.social, whatsapp: e.target.value}})} />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Layout size={24} /> Noticias y Videos
          </h2>
          <button onClick={addNews} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            <Plus size={14} /> Agregar Item
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {content.news.map((item, idx) => (
            <div key={item.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <select className="input-field" style={{ width: 'auto', background: '#1a7a47' }} 
                  value={item.type} onChange={e => handleNewsChange(idx, 'type', e.target.value)}>
                  <option value="noticia">📰 Noticia (Imagen)</option>
                  <option value="video">🎥 Video (YouTube Embed)</option>
                </select>
                <button onClick={() => removeNews(item.id)} style={{ background: 'transparent', color: '#ff6b6b', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Título</label>
                  <input type="text" className="input-field" value={item.title} onChange={e => handleNewsChange(idx, 'title', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{item.type === 'video' ? 'URL Embed de YouTube' : 'URL de Imagen'}</label>
                  <input type="text" className="input-field" value={item.type === 'video' ? item.videoUrl : item.image} 
                    onChange={e => handleNewsChange(idx, item.type === 'video' ? 'videoUrl' : 'image', e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Descripción corta</label>
                <textarea className="input-field" style={{ height: 60, resize: 'none' }} 
                  value={item.description} onChange={e => handleNewsChange(idx, 'description', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 20, z-index: 100 }}>
        {success && (
          <div className="success-msg" style={{ marginBottom: '1rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <CheckCircle size={18} /> {success}
          </div>
        )}
        <button onClick={handleSave} className="btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', boxShadow: '0 10px 40px rgba(32,138,81,0.4)' }}>
          <Save size={20} /> GUARDAR TODOS LOS CAMBIOS DE CONTENIDO
        </button>
      </div>
    </div>
  );
};

export default function AdminPanel({ onBack, isMaster }) {
  const [activeTab, setActiveTab] = useState('trees');
  const [trees, setTrees] = useState(getTrees());
  const [selectedTree, setSelectedTree] = useState(null);
  const [isCompany, setIsCompany] = useState(false);
  const [formData, setFormData] = useState({
    email: '', adopterName: '', nit: '', companyName: '',
    treeName: '', species: '', location: '', photoUrl: '',
    plantedDate: new Date().toISOString().split('T')[0],
  });
  const [position, setPosition] = useState([4.5709, -74.2973]);
  const [successMsg, setSuccessMsg] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleSelectTree = (tree) => {
    setSelectedTree(tree);
    setIsCompany(tree.isCompany);
    setFormData({
      email: tree.email || '',
      adopterName: tree.adopterName || '',
      nit: tree.nit || '',
      companyName: tree.companyName || '',
      treeName: tree.treeName,
      species: tree.species,
      location: tree.location,
      photoUrl: tree.photoUrl || '',
      plantedDate: tree.plantedDate,
    });
    setPosition(tree.coordinates);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setSelectedTree(null);
    setFormData({
      email: '', adopterName: '', nit: '', companyName: '',
      treeName: '', species: '', location: '', photoUrl: '',
      plantedDate: new Date().toISOString().split('T')[0],
    });
    setPosition([4.5709, -74.2973]);
  };

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

  const MASTER_DELETE_KEY = 'GAHIA-MASTER-2026';

  const handleDelete = id => {
    const key = window.prompt('Para eliminar un registro, ingresa la CLAVE MAESTRA:');
    if (key && key.trim().toUpperCase() === MASTER_DELETE_KEY) {
      deleteTree(id);
      const updated = getTrees();
      setTrees(updated);
      if (selectedTree?.id === id) handleCancelEdit();
    } else if (key !== null) {
      alert('Clave maestra incorrecta. Asegúrate de escribirla en MAYÚSCULAS.');
    }
  };

  const handleClearExamples = () => {
    const key = window.prompt('Para borrar TODA la base de datos, ingresa la CLAVE MAESTRA:');
    if (key && key.trim().toUpperCase() === MASTER_DELETE_KEY) {
      if (window.confirm('¿ESTÁS ABSOLUTAMENTE SEGURO? Esta acción no se puede deshacer.')) {
        localStorage.setItem('adopta_arboles', JSON.stringify([]));
        setTrees([]);
        handleCancelEdit();
      }
    } else if (key !== null) {
      alert('Clave maestra incorrecta.');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedTree) {
      const updated = {
        ...selectedTree,
        ...formData,
        isCompany,
        coordinates: position,
      };
      updateTree(updated);
      setSuccessMsg('¡Registro actualizado correctamente!');
    } else {
      addTree({ ...formData, isCompany, id: `arb-${Date.now()}`, coordinates: position,
        message: isCompany ? 'Aporte corporativo al medio ambiente.' : '¡Un nuevo árbol plantado con amor!' });
      setSuccessMsg('¡Árbol registrado exitosamente!');
    }
    setTrees(getTrees());
    if (!selectedTree) {
      setFormData({ email: '', adopterName: '', nit: '', companyName: '', treeName: '', species: '', location: '', photoUrl: '',
        plantedDate: new Date().toISOString().split('T')[0] });
    }
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #071a0e 0%, #0a2e1a 100%)' }}>
      <header className="header">
        <div className="logo-container">
          <img src="/logo-oxigeno.png" alt="Logo" style={{ height: 50 }} />
          <span style={{ color: 'var(--green-300)', fontWeight: 700, fontSize: '1rem' }}>Panel de Administración</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {isMaster && (
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '50px', marginRight: '1rem' }}>
              <button 
                onClick={() => setActiveTab('trees')}
                className={activeTab === 'trees' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', border: 'none' }}
              >
                🌳 Árboles
              </button>
              <button 
                onClick={() => setActiveTab('content')}
                className={activeTab === 'content' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', border: 'none' }}
              >
                ⚙️ Contenidos
              </button>
            </div>
          )}
          <button className="btn-secondary" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft size={15} /> Volver
          </button>
        </div>
      </header>

      <div className="admin-container">
        {activeTab === 'trees' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0 }}>{selectedTree ? 'Editar Árbol' : 'Agregar Nuevo Árbol'}</h2>
                {selectedTree && (
                  <button onClick={handleCancelEdit} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', color: '#ff6b6b' }}>
                    <X size={14} /> Cancelar Edición
                  </button>
                )}
              </div>
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
                  <label>Foto del Árbol</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleInputChange} className="input-field" placeholder="Pega URL o usa el botón ➜" style={{ flex: 1 }} />
                    <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Camera size={18} /> Tomar Foto
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment" 
                        style={{ display: 'none' }} 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setFormData(prev => ({ ...prev, photoUrl: reader.result }));
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {formData.photoUrl && (
                    <div style={{ marginTop: '0.5rem', position: 'relative', width: 'fit-content' }}>
                      <img src={formData.photoUrl} alt="Preview" style={{ height: 60, borderRadius: 8, border: '1px solid var(--green-300)' }} />
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, photoUrl: '' }))} style={{ position: 'absolute', top: -5, right: -5, background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, fontSize: 10, cursor: 'pointer' }}>✕</button>
                    </div>
                  )}
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

                <button type="submit" className={selectedTree ? "btn-primary update" : "btn-primary"} style={{ marginTop: '0.5rem', background: selectedTree ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '' }}>
                  {selectedTree ? <><RefreshCw size={17} /> Actualizar Información</> : <><Save size={17} /> Guardar Árbol en el Sistema</>}
                </button>
              </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ height: 360, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(45,180,90,0.2)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                <MapContainer center={selectedTree ? selectedTree.coordinates : position} zoom={selectedTree ? 18 : (position[0] === 4.5709 ? 6 : 16)} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker position={position} setPosition={setPosition} />
                  {selectedTree && <Marker position={selectedTree.coordinates} />}
                </MapContainer>
              </div>

              {isMaster ? (
                <div className="admin-card" style={{ maxHeight: 380, overflowY: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Base de Datos ({trees.length})</h2>
                    <button type="button" onClick={handleClearExamples} className="btn-secondary" style={{ color: '#ff6b6b', borderColor: 'rgba(255,107,107,0.3)', fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
                      <Trash2 size={12} /> Limpiar Todo
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {trees.slice().reverse().map(tree => (
                      <div 
                        key={tree.id} 
                        className={`tree-record ${selectedTree?.id === tree.id ? 'active' : ''}`} 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '0.8rem', background: selectedTree?.id === tree.id ? 'rgba(32,138,81,0.2)' : '', borderRadius: 8, border: selectedTree?.id === tree.id ? '1px solid var(--green-400)' : '1px solid transparent' }}
                        onClick={() => handleSelectTree(tree)}
                      >
                        <div>
                          <strong>{tree.treeName}</strong> — <span style={{ color: 'var(--green-300)', fontSize: '0.88rem' }}>{tree.species}</span><br />
                          <small>{tree.isCompany ? `🏢 ${tree.companyName}` : `✉️ ${tree.email}`}</small>
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); handleDelete(tree.id); }} className="btn-secondary" style={{ padding: '0.4rem', border: 'none', color: '#ff6b6b' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="admin-card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <CheckCircle size={48} color="var(--green-400)" style={{ marginBottom: '1rem' }} />
                  <h3>Modo de Registro</h3>
                  <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>Has ingresado como colaborador. Puedes registrar nuevos árboles, pero el acceso a la base de datos está restringido.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ContentManager />
        )}
      </div>
    </div>
  );
}
