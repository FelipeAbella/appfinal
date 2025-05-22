import React from 'react';

const ChildAccess = () => {
  const handleLogout = () => {
    localStorage.removeItem('childLoggedIn');
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Child Access</h2>
      <p>Welcome to the child access area. Here you can find features specifically designed for you.</p>
      {/* Add more child-specific features here */}
    </div>
  );
};

export default ChildAccess;