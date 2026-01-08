import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CarContext = createContext();

// DATA BARU DENGAN IMAGE UNSPLASH (ANTI ERROR)
const initialData = [
  {
    id: '1',
    name: 'Tesla Model S Plaid',
    price: '2.500.000.000',
    description: 'Mobil listrik produksi massal dengan akselerasi tercepat di dunia. Masa depan ada di sini.',
    // Image Tesla Merah (Unsplash)
    image: 'https://images.unsplash.com/photo-1561820800-d3d4779fd367?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
       'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=1000&auto=format&fit=crop', // Interior
       'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=1000&auto=format&fit=crop'  // Detail
    ],
    year: 2024,
    color: 'Red Multi-Coat', 
    modelPath: '/models/tesla.glb'
  },
  {
    id: '2',
    name: 'Porsche 911 Carrera',
    price: '10.000.000.000',
    description: 'Mobil balap legal jalan raya. Sayap belakang aktif DRS dan mesin 4.0L Flat-six.',
    // Image Porsche Abu-abu/Silver (Unsplash)
    image: 'https://images.unsplash.com/photo-1713034576048-0300107cf727?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
        'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=1000&auto=format&fit=crop', // Rear View
        'https://images.unsplash.com/photo-1616976346398-0e0e8fd9a7f4?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1616976346398-0e0e8fd9a7f4?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Side (Blue accent variant)
    ],
    year: 2023,
    color: 'Gray', 
    modelPath: '/models/porsche.glb'
  },
  {
    id: '3',
    name: 'Lamborghini Revuelto',
    price: '12.500.000.000',
    description: 'Banteng hybrid pertama. Kombinasi V12 Murni dengan 3 motor listrik.',
    // Image Lamborghini Putih (Unsplash)
    image: 'https://images.unsplash.com/photo-1731783052442-b64bd72bd16d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1000&auto=format&fit=crop', // Rear View
        'https://images.unsplash.com/photo-1672717901551-fae3242e09ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Detail Wheel
    ],
    year: 2025,
    color: 'Bianco Monocerus White',
    modelPath: '/models/lambo.glb'
  },
  {
    id: '4',
    name: 'Rolls Royce Ghost',
    price: '24.000.000.000',
    description: 'Definisi kemewahan mutlak. Kabin senyap seperti ruang hampa udara.',
    // Image Rolls Royce Putih (Unsplash)
    image: 'https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
        'https://images.unsplash.com/photo-1727129499236-e8854b371177?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Interior
        'https://images.unsplash.com/photo-1710210123872-b030a0a37200?q=80&w=672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Front Detail
    ],
    year: 2024,
    color: 'Classic White', 
    modelPath: '/models/rolls_royce.glb'
  }
];

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState(() => {
    // --- FORCE RESET LOGIC (PENTING!) ---
    // Baris ini akan menghapus data lama di browser setiap kali lo refresh
    // Jadi gambar error lama nggak bakal muncul lagi.
    localStorage.removeItem('cars'); 
    return initialData;
  });

  useEffect(() => {
    // Simpan data baru ke local storage
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = (car) => {
    setCars([...cars, { ...car, id: uuidv4() }]);
  };

  const deleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => useContext(CarContext);