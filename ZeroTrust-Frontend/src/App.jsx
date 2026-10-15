import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [statusMessage, setStatusMessage] = useState('No autenticado');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setStatusMessage(data.message || 'Autenticado con éxito (JWT Generado en Node.js)');
      } else {
        setStatusMessage(`Error: ${data.error || 'Fallo al autenticar'}`);
      }
    } catch (err) {
      setStatusMessage('Error de conexión con el Backend');
    }
  };

  const handleDashboard = async () => {
    if (!token) {
      setStatusMessage('Error: Debe obtener un token JWT primero');
      return;
    }
    try {
      const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setStatusMessage(JSON.stringify(data));
    } catch (err) {
      setStatusMessage('Error al consultar el Dashboard');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Zero Trust Architecture Dashboard (React + Vite)</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleLogin} style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}>
          1. Obtener Token JWT (/api/login)
        </button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleDashboard} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          2. Consultar Dashboard Protegido (/api/dashboard)
        </button>
      </div>
      <p><strong>Estado:</strong> {statusMessage}</p>
    </div>
  );
}

export default App;