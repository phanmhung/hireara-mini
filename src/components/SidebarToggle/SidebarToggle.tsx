import type { CSSProperties } from 'react';
import { SIDEBAR_CONFIG } from '../../constants';

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Button component that toggles sidebar visibility.
 *
 * @param props - Component props
 * @param props.isOpen - Whether the sidebar is currently open
 * @param props.onToggle - Function to call when button is clicked
 */
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
    <button
      onClick={onToggle}
      style={style}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={isOpen}
      aria-controls="sidebar"
    >
      {isOpen ? '← Hide' : '☰ Menu'}
    </button>
  );
};

