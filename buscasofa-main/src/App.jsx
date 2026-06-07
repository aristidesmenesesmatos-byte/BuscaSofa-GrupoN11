// @ts-ignore
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFuelPrices } from './apis/fuelApiLib';
import { FuelApi } from './apis/FuelApi';
import { cerrarSesion } from './auth/cerrarSesion';

import Header from './components/Header';
import FuelMap from './components/FuelMap';
import About from './components/About';
import Home from './components/Home';
import StationDetail from './components/StationDetail';
import FuelTable from './components/FuelTable';
import Register from './components/Register';
import Login from './components/Login';
import UsersDetail from './components/UsersDetail';
import Footer from './components/Footer';

function NotFound() {
  return (
    <main className="not-found">
      <h1>No hemos encontrado la página que buscas</h1>
      <p>Comprueba la dirección o vuelve a la página principal.</p>
    </main>
  );
}

function App() {
  const [stations, setStations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    cerrarSesion(localStorage, setUser);
  };

  useEffect(() => {
    fetchFuelPrices()
      .then(data => {
        console.log(data);
        setStations(data.ListaEESSPrecio);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />

      {loading && <div className="loading">Cargando...</div>}

      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <Routes>
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/perfil" element={<UsersDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home stations={stations} />} />
          <Route path="/mapa" element={<FuelMap stations={stations} />} />
          <Route path="/lista" element={<FuelTable stations={stations} />} />
          <Route path="/station/:id" element={<StationDetail stations={stations} user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;