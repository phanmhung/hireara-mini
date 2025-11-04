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

/**
 * React icon component that supports rotation and scaling animations.
 * Clicking the icon toggles rotation direction when rotation is enabled.
 *
 * @param props - Component props
 * @param props.size - Icon size in pixels
 * @param props.rotationState - Current rotation state (angle and direction)
 * @param props.isRotationEnabled - Whether rotation is enabled
 * @param props.isScalingEnabled - Whether scaling animations are enabled
 * @param props.onClick - Click handler for toggling rotation direction
 */
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
      role={isRotationEnabled ? 'button' : 'img'}
      tabIndex={isRotationEnabled ? 0 : -1}
      aria-label={isRotationEnabled ? 'Click to reverse rotation direction' : 'React logo'}
      onKeyDown={(e) => {
        if (isRotationEnabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    />
  );
};
