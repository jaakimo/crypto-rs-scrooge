import React from 'react';

const inlineStyle: React.CSSProperties = {
  backgroundColor: 'rgba(254, 0,0, 0.1)',
  border: '4px solid red',
  textAlign: 'center',
  margin: '0.5rem 0.5rem',
  fontSize: '20px',
  borderRadius: '5px',
  padding: '0.5rem',
};

interface Props {
  message: string;
}

const Notification = ({ message }: Props) => {
  return <div style={inlineStyle}>{message}</div>;
};

export default Notification;
