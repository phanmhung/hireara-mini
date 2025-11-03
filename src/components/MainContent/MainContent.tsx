import type { CSSProperties } from 'react';
import { ReactIcon } from '../ReactIcon';
import type { RotationState } from '../../types';

interface MainContentProps {
  iconSize: number;
  rotationState: RotationState;
  isRotationEnabled: boolean;
  isScalingEnabled: boolean;
  onIconClick: () => void;
}

export const MainContent = ({
  iconSize,
  rotationState,
  isRotationEnabled,
  isScalingEnabled,
  onIconClick,
}: MainContentProps) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw',
    gap: '2rem',
    position: 'relative',
  };

  return (
    <div style={containerStyle}>
      <ReactIcon
        size={iconSize}
        rotationState={rotationState}
        isRotationEnabled={isRotationEnabled}
        isScalingEnabled={isScalingEnabled}
        onClick={onIconClick}
      />
    </div>
  );
};

