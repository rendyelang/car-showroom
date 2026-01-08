import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. IMPORT DARI REACT-ICONS
// TbBrandWhatsapp = Style Outline (Tabler), cocok sama Lucide
import { TbBrandWhatsapp } from "react-icons/tb"; 
import { X, Mail, MapPin, Award, Instagram, Linkedin } from 'lucide-react';
import romiImage from '../assets/images/romi.jpg'; // Import gambar

const ProfilePanel = ({ isOpen, onClose }) => {
  // Setup Link WA
  const phoneNumber = "6282142048886";
  const waUrl = `https://wa.me/${phoneNumber}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* PANEL HOLOGRAM */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-slate-900/90 border-l border-white/10 z-[70] shadow-2xl p-8 overflow-y-auto"
          >
            {/* Header: Tombol Close */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">Seller Identity</h2>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* KONTEN UTAMA */}
            <div className="relative">
              
              {/* Foto Profil */}
              <div className="flex justify-center mb-8">
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-lg opacity-70 animate-pulse"></div>
                    <img 
                        src={romiImage} 
                        alt="Romi Profile" 
                        className="relative w-full h-full object-cover rounded-full border-2 border-white/20 p-1"
                    />
                    {/* <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-slate-900" title="Online"></div> */}
                </div>
              </div>

              {/* Nama & Role */}
              <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-white mb-1">Romi Andre Mariano</h1>
                <p className="text-blue-400 font-medium text-sm tracking-wide">SALES SUPERVISOR</p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 mb-10 border-y border-white/5 py-6">
                <div className="text-center">
                    <p className="text-2xl font-bold text-white">120+</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Sold Units</p>
                </div>
                <div className="text-center border-l border-white/5">
                    <p className="text-2xl font-bold text-white">5★</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Rating</p>
                </div>
                <div className="text-center border-l border-white/5">
                    <p className="text-2xl font-bold text-white">15yr</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Exp.</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-10">
                 <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:text-white transition-colors">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">Email Address</p>
                        <p className="text-white font-medium">email@example.com</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-white transition-colors">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">Domicile</p>
                        <p className="text-white font-medium">Sukabumi, West Java</p>
                    </div>
                 </div>
              </div>
              
              {/* Footer: Social Media & Signature */}
              <div className="flex justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity items-center">
                 
                 {/* 1. Icon WhatsApp (Outline Style dari Library) */}
                 <a 
                    href={waUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-green-500 transition-colors hover:scale-110 duration-200"
                    title="Chat on WhatsApp"
                 >
                    {/* Size disamakan dengan Lucide icon lain (24) */}
                    <TbBrandWhatsapp size={24} />
                 </a>

                 {/* 2. Instagram */}
                 <a href="https://www.instagram.com/romiandre83/" className="text-white hover:text-pink-500 transition-colors"><Instagram size={24} /></a>
                 
                 {/* 3. LinkedIn */}
                 <a href="https://www.linkedin.com/in/romi-andre-mariano-799b623a1/" className="text-white hover:text-blue-600 transition-colors"><Linkedin size={24} /></a>
                 
              </div>
              
              {/* <div className="mt-12 text-center text-[10px] text-slate-600 tracking-widest uppercase">
                 Trusted since 2018
              </div> */}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfilePanel;