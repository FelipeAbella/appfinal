import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Busca el rol en la base de datos
        const userRef = ref(db, `usuarios/${user.uid}`);
        const snapshot = await get(userRef);
        let role = null;
        if (snapshot.exists()) {
          const userData = snapshot.val();
          // Mapea los roles de la base de datos a los de tu app
          if (userData.rol === 'admin') role = 'parent';
          else if (userData.rol === 'control') role = 'mother';
          else if (userData.rol === 'lectura') role = 'child';
        }
        setCurrentUser({ ...user, role });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};