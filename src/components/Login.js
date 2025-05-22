import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [roleParam, setRoleParam] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Lee el parámetro ?role= de la URL
    const params = new URLSearchParams(location.search);
    setRoleParam(params.get('role') || '');
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Autenticación con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtén el rol real desde la base de datos usando el UID
      const userRef = ref(db, `usuarios/${user.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        // Redirige según el rol real
        if (userData.rol === 'admin') {
          navigate('/dashboard');
        } else if (userData.rol === 'control') {
          navigate('/dashboard');
        } else if (userData.rol === 'lectura') {
          navigate('/child-access');
        } else {
          navigate('/dashboard');
          setError('Rol no reconocido.');
        }
      } else {
        setError('No se encontró el usuario en la base de datos.');
      }
    } catch (err) {
      setError('Credenciales incorrectas o usuario no encontrado.');
    }
  };

  // Acceso directo para hijo (sin login)
  const handleChildAccess = () => {
    // Simula sesión para el hijo
    localStorage.setItem('childLoggedIn', 'true');
    navigate('/child-access');
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {(roleParam === 'parent' || roleParam === 'mother' || !roleParam) && (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {roleParam === 'parent'
              ? 'Entrar como Papá'
              : roleParam === 'mother'
              ? 'Entrar como Mamá'
              : 'Entrar'}
          </button>
        </form>
      )}
      {roleParam === 'child' && (
        <button onClick={handleChildAccess}>Entrar como Hijo</button>
      )}
    </div>
  );
};

export default Login;