import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfilePanel from '../components/ProfilePanel';
import romiImage from '../assets/images/romi.jpeg';

const Home = () => {
  const { cars } = useCars();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const nextCar = () => setCurrentIndex((prev) => (prev + 1) % cars.length);
  const prevCar = () => setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);

  const activeCar = cars[currentIndex];

  // --- HELPER FUNCTION UNTUK WARNA ---
  const getGradientConfig = (colorName) => {
    const c = colorName ? colorName.toLowerCase() : '';
    if (c.includes('red')) return 'from-red-600 via-orange-500 to-amber-500';
    if (c.includes('blue')) return 'from-blue-600 via-cyan-400 to-teal-300';
    if (c.includes('green') || c.includes('verde')) return 'from-emerald-600 via-green-400 to-lime-300';
    if (c.includes('yellow')) return 'from-yellow-400 via-amber-400 to-orange-400';
    if (c.includes('white') || c.includes('bianco') || c.includes('silver')) return 'from-white via-slate-300 to-gray-400';
    if (c.includes('gray') || c.includes('grey')) return 'from-slate-200 via-slate-400 to-slate-600';
    if (c.includes('black') || c.includes('midnight') || c.includes('dark')) return 'from-gray-500 via-gray-700 to-black';
    return 'from-indigo-500 via-purple-500 to-pink-500';
  };

  const themeGradient = getGradientConfig(activeCar?.color);

  // --- KONFIGURASI WHATSAPP ---
  const phoneNumber = "6282142048886"; 
  const message = encodeURIComponent(`Hai bro, gue pengen nanya-nanya tentang ${activeCar?.name} dong!`);
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (!activeCar) return <div className="text-white">Loading Assets...</div>;

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-sans selection:bg-white/30">
      
      {/* --- BACKGROUND IMAGE LAYER (PENGGANTI 3D MODEL) --- */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <AnimatePresence mode='wait'>
            <motion.div
                key={activeCar.id}
                initial={{ opacity: 0, scale: 1.1 }} // Efek Zoom In pelan saat masuk
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }} // Durasi agak lama biar cinematic
                className="w-full h-full relative"
            >
                {/* Overlay Gradient: Biar teks di kiri tetap terbaca jelas walau gambarnya terang */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
                
                {/* Gambar Mobil */}
                <img 
                    src={activeCar.image} 
                    alt={activeCar.name} 
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </AnimatePresence>
      </div>


      {/* --- NAVBAR --- */}
      <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
          <div className="text-2xl font-black tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 pointer-events-auto">
            ROMI.GARAGE
          </div>

          <button 
            onClick={() => setIsProfileOpen(true)}
            className="pointer-events-auto group flex items-center gap-3 bg-black/20 backdrop-blur-md pl-4 pr-1 py-1 rounded-full border border-white/10 hover:bg-black/40 transition-all hover:border-white/30"
          >
            <div className="text-right hidden md:block">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider leading-none mb-1">Welcome to</p>
                <p className="text-sm font-bold text-white leading-none">Romi Garage</p>
            </div>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 group-hover:scale-110 transition-transform">
                <img 
                  src={romiImage}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
            </div>
          </button>
      </nav>

      {/* --- KONTEN TEKS UTAMA --- */}
      <div className="absolute top-1/2 left-8 md:left-20 transform -translate-y-1/2 z-40 max-w-2xl pointer-events-none">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCar.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, ease: "circOut" }}
          >
            {/* Watermark Tahun */}
            <h1 className="text-[10rem] md:text-[14rem] font-black leading-none opacity-10 absolute -top-40 -left-20 -z-10 select-none whitespace-nowrap text-stroke-white">
              {activeCar.year}
            </h1>

            {/* Judul Mobil */}
            <h2 className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
              {activeCar.name.split(' ').map((word, i) => (
                <span 
                    key={i} 
                    className={`block bg-gradient-to-r ${themeGradient} bg-clip-text text-transparent pb-2`}
                    style={{ WebkitTextStroke: activeCar.color.toLowerCase().includes('black') ? '1px rgba(255,255,255,0.3)' : '0' }}
                >
                    {word}
                </span>
              ))}
            </h2>

            {/* Specs Bar */}
            <div className="flex flex-wrap gap-4 mt-8 mb-8 pointer-events-auto">
               <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10 min-w-[120px]">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Price</p>
                  <p className={`text-2xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-tight font-mono`}>
                    Rp {activeCar.price}
                  </p>
               </div>
               
               <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10 min-w-[100px]">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Year</p>
                  <p className="text-xl font-bold text-white">{activeCar.year}</p>
               </div>
               
               <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Color</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${themeGradient} shadow-lg`}></div>
                    <p className="text-sm font-bold text-white">{activeCar.color}</p>
                  </div>
               </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-4 pointer-events-auto">
               <Link to={`/car/${activeCar.id}`} className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-white/10">
                  <span className="relative z-10">VIEW DETAILS</span>
                  <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>

              <a 
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-4 bg-white/10 border border-white/10 backdrop-blur-md rounded-full flex items-center gap-3 hover:bg-green-500 transition-all duration-300 shadow-lg"
              >
                  <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                      alt="WhatsApp" 
                      className="w-6 h-6 object-contain"
                  />
                  <span className="font-bold text-white group-hover:text-white transition-colors">
                      Ask this Car
                  </span>
              </a>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- CONTROLS NAVIGATION --- */}
      <div className="absolute bottom-10 right-10 z-50 flex flex-col items-end gap-6 pointer-events-auto">
         <div className="text-6xl font-thin opacity-50 select-none drop-shadow-md">
            0{currentIndex + 1} <span className="text-2xl opacity-50">/ 0{cars.length}</span>
         </div>

         <div className="flex gap-4">
            <button onClick={prevCar} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all backdrop-blur-sm group bg-black/20">
                <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform"/>
            </button>
            <button onClick={nextCar} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all backdrop-blur-sm group bg-black/20">
                <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform"/>
            </button>
         </div>
      </div>

      <ProfilePanel isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default Home;