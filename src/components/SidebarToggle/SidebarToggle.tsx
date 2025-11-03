import type { CSSProperties } from 'react';
import { SIDEBAR_CONFIG } from '../../constants';

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarToggle = ({ isOpen, onToggle }: SidebarToggleProps) => {
  const style: CSSProperties = {
    position: 'fixed',
    top: '1rem',
    left: isOpen ? `${SIDEBAR_CONFIG.BUTTON_OFFSET_OPEN}px` : `${SIDEBAR_CONFIG.BUTTON_OFFSET_CLOSED}px`,
    transition: `left ${SIDEBAR_CONFIG.ANIMATION_DURATION_MS}ms ease`,
    zIndex: 20,
    padding: '0.5rem 1rem',
  };

  return (
    <button onClick={onToggle} style={style}>
      {isOpen ? '← Hide' : '☰ Menu'}
    </button>
  );
};

