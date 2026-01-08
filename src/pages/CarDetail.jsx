import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Zap, Wind, Timer, Gauge, Share2 } from 'lucide-react';

const CarDetail = () => {
  const { id } = useParams();
  const { cars } = useCars();
  const navigate = useNavigate();
  
  // Cari data mobil berdasarkan ID
  const car = cars.find((c) => c.id === id);

  // Hook untuk Scroll Effect (Parallax)
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Gambar gerak pelan
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]); // Fade out hero

  // Kalau mobil gak ketemu (misal user ngetik URL ngawur)
  if (!car) return <div className="text-white h-screen flex items-center justify-center">Car Not Found</div>;

  // --- LOGIC WARNA (Sama kayak Home biar konsisten) ---
  const getAccentColor = (colorName) => {
    const c = colorName ? colorName.toLowerCase() : '';
    if (c.includes('red')) return 'text-red-500 shadow-red-500/50 border-red-500/30';
    if (c.includes('blue')) return 'text-blue-500 shadow-blue-500/50 border-blue-500/30';
    if (c.includes('green') || c.includes('verde')) return 'text-emerald-500 shadow-emerald-500/50 border-emerald-500/30';
    if (c.includes('yellow')) return 'text-yellow-500 shadow-yellow-500/50 border-yellow-500/30';
    if (c.includes('white') || c.includes('bianco') || c.includes('silver')) return 'text-slate-200 shadow-white/30 border-white/30';
    if (c.includes('gray') || c.includes('grey')) return 'text-slate-400 shadow-slate-500/30 border-slate-500/30';
    return 'text-purple-500 shadow-purple-500/50 border-purple-500/30';
  };

  const accentClass = getAccentColor(car.color);

  // Setup WA
  const phoneNumber = "6282142048886";
  const message = encodeURIComponent(`Halo Romi Garage, saya tertarik dengan ${car.name} (Year: ${car.year}). Bisa info detail?`);
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Scroll ke atas pas halaman dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-white/20">
      
      {/* 1. STICKY NAV (Tombol Back) */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white">
        <Link to="/" className="flex items-center gap-2 text-sm font-bold tracking-widest hover:text-slate-300 transition-colors group">
           <div className="p-2 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
             <ArrowLeft size={18} />
           </div>
           BACK TO GARAGE
        </Link>
        <div className="text-xs font-mono opacity-50 hidden md:block">
            ID: {car.id.slice(0,8)} // ROMI.GARAGE
        </div>
      </nav>

      {/* 2. HERO SECTION (Parallax) */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <motion.div style={{ y: y1, opacity: opacityHero }} className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950 z-10" />
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-20">
            <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4"
            >
                {car.name}
            </motion.h1>
            <div className="flex items-center gap-4">
                 <span className={`px-3 py-1 rounded border bg-black/50 backdrop-blur-md text-xs font-bold uppercase ${accentClass.split(' ')[2]} ${accentClass.split(' ')[0]}`}>
                    {car.year} Model
                 </span>
                 <span className="text-slate-400 text-sm tracking-widest uppercase border-l border-white/20 pl-4">
                    {car.color}
                 </span>
            </div>
        </div>
      </div>

      {/* 3. CONTENT WRAPPER */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-20 pb-40">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* KOLOM KIRI: Deskripsi (Story) */}
            <div className="lg:col-span-7">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="prose prose-lg prose-invert"
                >
                    <h3 className="text-2xl font-light text-slate-400 mb-6 italic">
                        "The Definition of Perfection"
                    </h3>
                    <p className="text-xl leading-relaxed text-slate-200 font-light">
                        {car.description}
                    </p>
                    <p className="text-slate-400 mt-6 text-sm leading-relaxed">
                        
                        Mobil ini bukan sekadar alat transportasi, melainkan sebuah karya seni yang dirancang untuk memberikan pengalaman berkendara terbaik.
                    </p>
                </motion.div>

                {/* Gallery Grid (Dummy Images for Vibe) */}
                <div className="mt-16 grid grid-cols-2 gap-4">
                    <div className="h-64 rounded-2xl overflow-hidden bg-slate-900 group">
                        <img 
                            src={car.gallery ? car.gallery[0] : car.image} // Ambil gambar ke-1 dari gallery
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                            alt="Detail 1"
                        />
                    </div>
                    <div className="h-64 rounded-2xl overflow-hidden bg-slate-900 mt-10 group">
                        <img 
                            src={car.gallery ? car.gallery[1] : car.image} // Ambil gambar ke-2 dari gallery
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                            alt="Detail 2"
                        />
                    </div>
                </div>
            </div>

            {/* KOLOM KANAN: HUD Specs (Sticky) */}
            <div className="lg:col-span-5">
                <div className="sticky top-32 space-y-6">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">
                        Technical Specifications
                    </h4>

                    {/* HUD CARD 1: Speed */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className={`bg-white/5 border backdrop-blur-sm p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/10 transition-colors ${accentClass.split(' ')[2]}`}
                    >
                        <div className={`p-4 rounded-full bg-black/40 ${accentClass.split(' ')[0]}`}>
                            <Gauge size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Top Speed</p>
                            <p className="text-3xl font-bold font-mono group-hover:text-white transition-colors">350 <span className="text-sm text-slate-500">km/h</span></p>
                        </div>
                    </motion.div>

                    {/* HUD CARD 2: Acceleration */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className={`bg-white/5 border backdrop-blur-sm p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/10 transition-colors ${accentClass.split(' ')[2]}`}
                    >
                        <div className={`p-4 rounded-full bg-black/40 ${accentClass.split(' ')[0]}`}>
                            <Timer size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">0-100 km/h</p>
                            <p className="text-3xl font-bold font-mono group-hover:text-white transition-colors">2.9 <span className="text-sm text-slate-500">sec</span></p>
                        </div>
                    </motion.div>

                    {/* HUD CARD 3: Power */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className={`bg-white/5 border backdrop-blur-sm p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/10 transition-colors ${accentClass.split(' ')[2]}`}
                    >
                        <div className={`p-4 rounded-full bg-black/40 ${accentClass.split(' ')[0]}`}>
                            <Zap size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Max Power</p>
                            <p className="text-3xl font-bold font-mono group-hover:text-white transition-colors">780 <span className="text-sm text-slate-500">hp</span></p>
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
      </div>

      {/* 4. FLOATING ACTION DOCK (Bottom) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 left-0 w-full z-40 px-6 flex justify-center"
      >
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-2 pr-2 pl-6 rounded-full shadow-2xl flex items-center gap-8 max-w-xl w-full justify-between">
            {/* Price Tag */}
            <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Estimated Price</p>
                <p className="text-xl font-bold text-white font-mono tracking-tight">Rp {car.price}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                 <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" title="Share">
                    <Share2 size={20} />
                 </button>

                 <a 
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-[#25D366] hover:text-white transition-all duration-300 group"
                 >
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                        alt="wa" 
                        className="w-5 h-5 object-contain"
                    />
                    <span>Ask this Car</span>
                 </a>
            </div>
        </div>
      </motion.div>

    </div>
  );
};

export default CarDetail;