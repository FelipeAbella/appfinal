import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h2>Bienvenido a la Casa Inteligente</h2>
      <p>Selecciona cómo deseas ingresar:</p>
      <button onClick={() => navigate('/login?role=parent')}>Iniciar sesión como Papá</button>
      <button onClick={() => navigate('/login?role=mother')}>Iniciar sesión como Mamá</button>
      <button onClick={() => navigate('/login?role=child')}>Entrar como Hijo</button>
    </div>
  );
};

export default Home;