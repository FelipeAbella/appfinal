import React, { useState } from 'react';
import config from '../config.json';
import '../App.css';
import { useAuth } from '../components/AuthProvider';
import { ROLES } from '../utils/roles';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [temp, setTemp] = useState(25);
  const [movimiento, setMovimiento] = useState("Esperando detección...");

  const ESP32_MAIN_IP = config.ESP32_MAIN_IP;

  const controlar = (zona, estado) => {
    fetch(`${ESP32_MAIN_IP}/control?zona=${zona}&estado=${estado}`);
  };

  const actualizarTemp = (valor) => {
    setTemp(valor);
    const hora = new Date().toLocaleTimeString();
    fetch(`${ESP32_MAIN_IP}/setTemp`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `temp=${valor}&hora=${hora}`
    });
  };

  const verLogs = () => alert("Función de ver historial no implementada aún.");
  const borrarLogs = () => alert("Función de borrar historial no implementada aún.");

  // Si no hay usuario, no mostrar nada
  if (!currentUser) return null;

  return (
    <div className="App">
      <h2>🏠 Casa Inteligente</h2>
      <p>Bienvenido, {currentUser.displayName || currentUser.email || 'Usuario'}</p>
      {/* Luces: solo esposo (parent) */}
      {(currentUser.role === ROLES.PARENT) && (
        <>
          <h3>💡 Luces</h3>
          {["cocina", "sala", "alcoba", "comedor"].map(zona => (
            <div key={zona}>
              <button onClick={() => controlar(zona, 1)}>Encender {zona}</button>
              <button onClick={() => controlar(zona, 0)}>Apagar {zona}</button>
            </div>
          ))}
        </>
      )}

      {/* Temperatura: esposo y esposa */}
      {(currentUser.role === ROLES.PARENT || currentUser.role === ROLES.MOTHER) && (
        <div className="temp">
          <h3>🌡️ Temperatura</h3>
          <p>Temperatura real: --- °C</p>
          <p>Temperatura simulada: {temp} °C</p>
          <input
            type="range"
            min="10"
            max="40"
            value={temp}
            onChange={(e) => actualizarTemp(e.target.value)}
          />
        </div>
      )}

      {/* Movimiento y Alarma: esposo y esposa */}
      {(currentUser.role === ROLES.PARENT || currentUser.role === ROLES.MOTHER) && (
        <>
          <h3>🚨 Movimiento y Alarma</h3>
          <p>{movimiento}</p>
          <button onClick={() => controlar('buzzer', 1)}>Activar Buzzer</button>
          <button onClick={() => controlar('buzzer', 0)}>Desactivar Buzzer</button>
        </>
      )}

      {/* Funciones: todos pueden ver logs, solo esposo puede borrar */}
      <h3>📜 Funciones</h3>
      <button onClick={verLogs}>Ver Historial</button>
      {currentUser.role === ROLES.PARENT && (
        <button onClick={borrarLogs}>Borrar Historial</button>
      )}
    </div>
  );
};

export default Dashboard;