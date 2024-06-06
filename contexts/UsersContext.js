import React, { createContext, useState } from 'react';

// Membuat UserContext dengan nilai default awal null.
const UserContext = createContext(null);

/**
 * UserProvider bertanggung jawab untuk menyediakan konteks pengguna
 * kepada komponen anak dalam aplikasi.
 *
 * @param {Object} props - Properti yang diterima oleh komponen.
 * @param {React.ReactNode} props.children - Komponen anak yang akan menerima nilai konteks.
 */
const UserProvider = ({ children }) => {
  // Mengelola state 'user' dengan useState, dimulai sebagai objek kosong.
  const [user, setUser] = useState({});

  return (
    // Menyediakan konteks 'user' dan 'setUser' ke komponen anak.
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
