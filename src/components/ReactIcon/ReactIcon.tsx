import type { CSSProperties } from 'react';
import reactLogo from '../../assets/react.svg';
import type { RotationState } from '../../types';

interface ReactIconProps {
  size: number;
  rotationState: RotationState;
  onClick: () => void;
}

export const ReactIcon = ({
  size,
  rotationState,
  onClick,
}: ReactIconProps) => {
  const style: CSSProperties = {
    height: `${size}px`,
    width: `${size}px`,
    transform: `rotate(${rotationState.angle}deg)`,
    cursor: 'pointer',
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
