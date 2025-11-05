import type { CSSProperties } from 'react';

interface IdleTimerTextProps {
  idleTime: number;
  isEnabled: boolean;
}

/**
 * Component that displays idle timer information.
 *
 * @param props - Component props
 * @param props.idleTime - Current idle time in seconds
 * @param props.isEnabled - Whether the idle timer is enabled
 */
export const IdleTimerText = ({ idleTime, isEnabled }: IdleTimerTextProps) => {
  const containerStyle: CSSProperties = {
    minHeight: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    pointerEvents: 'none',
    height: '2.5rem',
  };

  const textStyle: CSSProperties = {
    fontSize: '1.5rem',
    margin: 0,
    color: 'rgba(255, 255, 255, 0.87)',
    opacity: isEnabled ? 1 : 0,
    transition: 'opacity 0.2s ease',

  };

  return (
    <div style={containerStyle} role="status" aria-live="polite" aria-atomic="true">
      <p style={textStyle}>
        {isEnabled ? `Idle time: ${idleTime}s` : ''}
      </p>
    </div>
  );
};

