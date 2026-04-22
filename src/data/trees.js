export const initialTrees = [
  {
    id: "arb-001",
    email: "juan@ejemplo.com",
    adopterName: "Juan Pérez",
    treeName: "Esperanza",
    species: "Nogal Bogotano",
    plantedDate: "2023-11-15",
    location: "Cerros Orientales, Bogotá",
    coordinates: [4.64, -74.05],
    photoUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800",
    message: "Plantado con amor para las futuras generaciones."
  },
  {
    id: "arb-002",
    email: "maria@ejemplo.com",
    adopterName: "María Gómez",
    treeName: "Vida Viva",
    species: "Palma de Cera",
    plantedDate: "2024-01-20",
    location: "Valle del Cocora, Quindío",
    coordinates: [4.63, -75.54],
    photoUrl: "https://images.unsplash.com/photo-1598448888065-27f10b784a32?auto=format&fit=crop&q=80&w=800",
    message: "Un símbolo de nuestra tierra."
  },
  {
    id: "arb-003",
    email: "carlos@ejemplo.com",
    adopterName: "Carlos Restrepo",
    treeName: "Pulmón Verde",
    species: "Guayacán Amarillo",
    plantedDate: "2024-03-10",
    location: "Parque Arví, Medellín",
    coordinates: [6.28, -75.50],
    photoUrl: "https://images.unsplash.com/photo-1622080358509-3286b2de3e92?auto=format&fit=crop&q=80&w=800",
    message: "Para embellecer nuestra ciudad."
  }
];

export const getTrees = () => {
  const stored = localStorage.getItem('adopta_arboles');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('adopta_arboles', JSON.stringify(initialTrees));
  return initialTrees;
};

export const addTree = (newTree) => {
  const trees = getTrees();
  trees.push(newTree);
  localStorage.setItem('adopta_arboles', JSON.stringify(trees));
};

export const deleteTree = (id) => {
  const trees = getTrees();
  const filtered = trees.filter(t => t.id !== id);
  localStorage.setItem('adopta_arboles', JSON.stringify(filtered));
};
