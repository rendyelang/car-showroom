import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarProvider } from './context/CarContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import CarDetail from './pages/CarDetail';


function App() {
  return (
    <CarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/car/:id" element={<CarDetail />} />
        </Routes>
      </Router>
    </CarProvider>
  );
}

export default App;