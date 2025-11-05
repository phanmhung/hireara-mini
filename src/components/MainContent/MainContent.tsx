import type { CSSProperties } from 'react';
import { ReactIcon } from '../ReactIcon';
import { IdleTimerText } from '../IdleTimerText';
import type { RotationState } from '../../types';

interface MainContentProps {
  iconSize: number;
  rotationState: RotationState;
  isRotationEnabled: boolean;
  isScalingEnabled: boolean;
  onIconClick: () => void;
  idleTime: number;
  isIdleEnabled: boolean;
}

/**
 * Main content component that displays the React icon with rotation and scaling features.
 *
 * @param props - Component props
 * @param props.iconSize - Current icon size in pixels
 * @param props.rotationState - Current rotation state (angle and direction)
 * @param props.isRotationEnabled - Whether rotation is enabled
 * @param props.isScalingEnabled - Whether scaling is enabled
 * @param props.onIconClick - Click handler for the icon
 * @param props.idleTime - Current idle time in seconds
 * @param props.isIdleEnabled - Whether idle timer is enabled
 */
export const MainContent = ({
  iconSize,
  rotationState,
  isRotationEnabled,
  isScalingEnabled,
  onIconClick,
  idleTime,
  isIdleEnabled,
}: MainContentProps) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    width: '100%',
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
      <IdleTimerText idleTime={idleTime} isEnabled={isIdleEnabled} />
    </div>
  );
};

