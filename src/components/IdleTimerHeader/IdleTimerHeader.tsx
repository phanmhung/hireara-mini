import type { CSSProperties } from 'react';

interface IdleTimerHeaderProps {
  idleTime: number;
  isEnabled: boolean;
}

export const IdleTimerHeader = ({ idleTime, isEnabled }: IdleTimerHeaderProps) => {
  const containerStyle: CSSProperties = {
    position: 'fixed',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 15,
    minHeight: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    pointerEvents: 'none',
  };

  const textStyle: CSSProperties = {
    fontSize: '1.5rem',
    margin: 0,
    color: 'rgba(255, 255, 255, 0.87)',
    opacity: isEnabled ? 1 : 0,
    transition: 'opacity 0.2s ease',
    visibility: isEnabled ? 'visible' : 'hidden',
  };

  return (
    <div style={containerStyle}>
      <p style={textStyle}>Idle time: {idleTime}s</p>
    </div>
  );
};

