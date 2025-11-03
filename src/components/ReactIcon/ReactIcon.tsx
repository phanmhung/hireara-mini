import type { CSSProperties } from 'react';
import reactLogo from '../../assets/react.svg';
import type { RotationState } from '../../types';

interface ReactIconProps {
  size: number;
  rotationState: RotationState;
  isRotationEnabled: boolean;
  isScalingEnabled: boolean;
  onClick: () => void;
}

export const ReactIcon = ({
  size,
  rotationState,
  isRotationEnabled,
  isScalingEnabled,
  onClick,
}: ReactIconProps) => {
  const style: CSSProperties = {
    height: `${size}px`,
    width: `${size}px`,
    transform: `rotate(${rotationState.angle}deg)`,
    cursor: isRotationEnabled ? 'pointer' : 'default',
    transition: isScalingEnabled ? 'height 0.1s ease, width 0.1s ease' : 'none',
  };

  return (
    <img
      src={reactLogo}
      alt="React logo"
      onClick={onClick}
      style={style}
    />
  );
};
