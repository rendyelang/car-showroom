import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';

const Admin = () => {
  const { cars, addCar, deleteCar } = useCars();
  const [formData, setFormData] = useState({
    name: '', price: '', image: '', description: '', year: '', color: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.price) return alert("Nama dan Harga wajib diisi!");
    addCar(formData);
    setFormData({ name: '', price: '', image: '', description: '', year: '', color: '' }); // Reset
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6">
            <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Form Tambah Mobil */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"> <Plus size={20}/> Add New Car</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                    placeholder="Nama Mobil (ex: BMW M4)" 
                    className="bg-slate-800 p-3 rounded border border-slate-700"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input 
                    placeholder="Harga (ex: 1.200.000)" 
                    className="bg-slate-800 p-3 rounded border border-slate-700"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                />
                <input 
                    placeholder="URL Gambar" 
                    className="bg-slate-800 p-3 rounded border border-slate-700"
                    value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                />
                 <input 
                    placeholder="Tahun" 
                    className="bg-slate-800 p-3 rounded border border-slate-700"
                    value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}
                />
                <textarea 
                    placeholder="Deskripsi Singkat" 
                    className="bg-slate-800 p-3 rounded border border-slate-700 md:col-span-2"
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                />
                <button type="submit" className="md:col-span-2 bg-green-600 py-3 rounded font-bold hover:bg-green-700 transition">
                    Upload Mobil
                </button>
            </form>
        </div>

        {/* List Mobil untuk Delete */}
        <div className="space-y-4">
            {cars.map(car => (
                <div key={car.id} className="flex justify-between items-center bg-slate-900 p-4 rounded border border-slate-800">
                    <div className="flex items-center gap-4">
                        <img src={car.image} className="w-16 h-16 object-cover rounded" alt="car" />
                        <div>
                            <h4 className="font-bold">{car.name}</h4>
                            <p className="text-sm text-slate-400">{car.price}</p>
                        </div>
                    </div>
                    <button onClick={() => deleteCar(car.id)} className="bg-red-500/20 text-red-400 p-2 rounded hover:bg-red-500 hover:text-white transition">
                        <Trash2 size={20} />
                    </button>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Admin;