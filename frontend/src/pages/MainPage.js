import React from 'react';

const MainPage = () => {
  return (
    <div 
      style={{ 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        textAlign: 'center' 
      }}
    >
      <h1>Welcome to the AnimalWorld</h1>
      <p>This is the main page where users can view products and manage their cart.</p>
    </div>
  );
};

export default MainPage;
