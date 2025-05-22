import React, { useState } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState(25);
  const [movimiento, setMovimiento] = useState("Esperando detección...");

  const ESP32_IP = "http://192.168.4.1"; // IP por defecto del ESP32 como AP

  const controlar = (zona, estado) => {
    fetch(`${ESP32_IP}/control?zona=${zona}&estado=${estado}`);
  };

  const actualizarTemp = (valor) => {
    setTemp(valor);
    const hora = new Date().toLocaleTimeString();
    fetch(`${ESP32_IP}/setTemp`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `temp=${valor}&hora=${hora}`
    });
  };

  const verLogs = () => alert("Función de ver historial no implementada aún.");
  const borrarLogs = () => alert("Función de borrar historial no implementada aún.");

  return (
    <div className="App">
      <h2>🏠 Casa Inteligente</h2>

      <h3>💡 Luces</h3>
      {["cocina", "sala", "alcoba", "comedor"].map(zona => (
        <div key={zona}>
          <button onClick={() => controlar(zona, 1)}>Encender {zona}</button>
          <button onClick={() => controlar(zona, 0)}>Apagar {zona}</button>
        </div>
      ))}

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

      <h3>🚨 Movimiento y Alarma</h3>
      <p>{movimiento}</p>
      <button onClick={() => controlar('buzzer', 1)}>Activar Buzzer</button>
      <button onClick={() => controlar('buzzer', 0)}>Desactivar Buzzer</button>

      <h3>📜 Funciones</h3>
      <button onClick={verLogs}>Ver Historial</button>
      <button onClick={borrarLogs}>Borrar Historial</button>
    </div>
  );
}

export default App;