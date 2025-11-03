import type { CSSProperties } from 'react';
import { SIDEBAR_CONFIG } from '../../constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  rotation: boolean;
  scaling: boolean;
  idle: boolean;
  onToggle: (key: 'rotation' | 'scaling' | 'idle') => void;
}

interface FeatureToggleItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const FeatureToggleItem = ({ label, checked, onChange }: FeatureToggleItemProps) => {
  const labelStyle: CSSProperties = {
    display: 'block',
    margin: '1rem 0',
    color: '#213547',
    cursor: 'pointer',
  };

  return (
    <label style={labelStyle}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {' '}
      {label}
    </label>
  );
};

export const Sidebar = ({ isOpen, rotation, scaling, idle, onToggle }: SidebarProps) => {
  const sidebarStyle: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: `${SIDEBAR_CONFIG.WIDTH}px`,
    background: '#fff',
    color: '#213547',
    boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: `transform ${SIDEBAR_CONFIG.ANIMATION_DURATION_MS}ms ease`,
    padding: '2rem 1rem',
    zIndex: 10,
  };

  const titleStyle: CSSProperties = {
    margin: '0 0 1rem',
    color: '#213547',
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={titleStyle}>Features</h2>
      <FeatureToggleItem
        label="Rotation"
        checked={rotation}
        onChange={() => onToggle('rotation')}
      />
      <FeatureToggleItem
        label="Cursor Scaling"
        checked={scaling}
        onChange={() => onToggle('scaling')}
      />
      <FeatureToggleItem
        label="Idle Timer"
        checked={idle}
        onChange={() => onToggle('idle')}
      />
    </div>
  );
};

