import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CarContext = createContext();

// --- IMPORT ASSETS ---
import tiggo8csh from '../assets/images/tiggo8csh.png';
import tiggo8csh2 from '../assets/images/tiggo8csh2.webp';
import tiggo8csh3 from '../assets/images/tiggo8csh3.webp';

import tiggo8pro from '../assets/images/tiggo8pro.webp';
import tiggo8pro2 from '../assets/images/tiggo8pro2.png';
import tiggo8pro3 from '../assets/images/tiggo8pro3.webp';

import tiggo8promax from '../assets/images/tiggo8promax.webp';
import tiggo8promax2 from '../assets/images/tiggo8promax2.webp';
import tiggo8promax3 from '../assets/images/tiggo8promax3.webp';

import omodae5 from '../assets/images/omodaE5.png';
import omodae52 from '../assets/images/omodaE52.webp';
import omodae53 from '../assets/images/omodaE53.webp';

// DATA BARU DENGAN IMAGE LOKAL (YANG KAMU IMPORT)
const initialData = [
  {
    id: '1',
    name: 'Chery Tiggo 8 Pro',
    price: '528.500.000',
    description: 'First Class Experience. Kombinasi sempurna antara performa mesin 2.0L Turbo dan kemewahan interior kelas atas.',
    image: tiggo8pro, // Menggunakan import tiggo8pro
    gallery: [
        tiggo8pro2, 
        tiggo8pro3  
    ],
    year: 2024,
    color: 'Deep Black', 
    modelPath: null
  },
  {
    id: '2',
    name: 'Chery Tiggo 8',
    price: '400.000.000', // Estimasi harga Tiggo 8 Basic
    description: 'SUV 7-Seater premium yang mendefinisikan kenyamanan keluarga. Mesin tangguh dengan kabin yang luas dan teknologi terkini.',
    image: tiggo8csh, // Variabel langsung (Benar)
    gallery: [
       tiggo8csh2, 
       tiggo8csh3 
    ],
    year: 2024,
    color: 'Green Emerald', 
    modelPath: null 
  },
  {
    id: '3',
    name: 'Tiggo 8 Pro Max',
    price: '628.500.000',
    description: 'The Ultimate AWD SUV. Flagship tertinggi dengan penggerak semua roda (AWD) dan fitur keselamatan ADAS terlengkap.',
    image: tiggo8promax, // Menggunakan import tiggo8promax
    gallery: [
        tiggo8promax2,
        tiggo8promax3 
    ],
    year: 2025,
    color: 'Grey Premium',
    modelPath: null
  },
  {
    id: '4',
    name: 'Chery Omoda E5',
    price: '498.800.000',
    description: 'Born Global, Born Electric. Crossover EV futuristik dengan jarak tempuh 430KM dan akselerasi instan yang memukau.',
    // PERBAIKAN DI SINI: Hapus kurung kurawal {}
    image: omodae5, 
    gallery: [
        omodae52, 
        omodae53  
    ],
    year: 2025,
    color: 'Pure White', 
    modelPath: null
  }
];

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState(() => {
    // --- FORCE RESET LOGIC ---
    localStorage.removeItem('cars'); 
    return initialData;
  });

  useEffect(() => {
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