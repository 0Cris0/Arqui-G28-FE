import React from 'react';
import '../styles/buttons.css';

export const MessageBox = ({ children }) => {
  return (
    <div className="contenedor_message">
      {children}
    </div>
  );
};

export default MessageBox;
