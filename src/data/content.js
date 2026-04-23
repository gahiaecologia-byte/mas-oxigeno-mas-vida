const DEFAULT_CONTENT = {
  social: {
    instagram: 'https://www.instagram.com/gahiabio/',
    facebook: 'https://www.facebook.com/GahiaBio',
    youtube: 'https://www.youtube.com/@gahiabio',
    whatsapp: '573508864036'
  },
  news: [
    {
      id: 1,
      title: '¡Gran Reforestación 2024!',
      description: 'Estamos plantando 5000 nuevos árboles nativos en la cuenca del río.',
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Link de ejemplo
      date: '2024-04-15'
    },
    {
      id: 2,
      title: 'Ley 2173: Lo que debes saber',
      description: 'Aprende cómo tu empresa puede cumplir con la cuota de árboles obligatoria.',
      type: 'noticia',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000',
      date: '2024-04-20'
    }
  ]
};

export const getContent = () => {
  const saved = localStorage.getItem('gahia_content');
  return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
};

export const updateContent = (newContent) => {
  localStorage.setItem('gahia_content', JSON.stringify(newContent));
};
