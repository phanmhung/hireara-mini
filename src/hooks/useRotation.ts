import { useState, useEffect, useRef } from 'react';
import type { RotationDirection, RotationState } from '../types';
import { ROTATION_CONFIG } from '../constants';

interface UseRotationOptions {
  enabled: boolean;
}

interface UseRotationReturn {
  rotationState: RotationState;
  toggleDirection: () => void;
}

/**
 * Custom hook that manages icon rotation animation.
 * Continuously rotates the icon and allows toggling rotation direction.
 *
 * @param options - Configuration options
 * @param options.enabled - Whether rotation is enabled
 * @returns Object containing rotationState (angle, direction) and toggleDirection function
 *
 */
export const useRotation = ({ enabled }: UseRotationOptions): UseRotationReturn => {
  const [direction, setDirection] = useState<RotationDirection>(1);
  const [angle, setAngle] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setAngle((prev) => prev + direction * ROTATION_CONFIG.ANGLE_INCREMENT);
    }, ROTATION_CONFIG.FRAME_RATE_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, direction]);

  const toggleDirection = () => {
    if (enabled) {
      setDirection((prev) => (prev === 1 ? -1 : 1));
    }
  };

  return {
    rotationState: { angle, direction },
    toggleDirection,
  };
};

