import { useState, useEffect } from 'react';
import type { Position, ScalingConfig } from '../types';
import { SCALING_CONFIG } from '../constants';
import { calculateIconSize } from '../utils/calculations';

interface UseScalingOptions {
  enabled: boolean;
  config?: ScalingConfig;
}

interface UseScalingReturn {
  iconSize: number;
  mousePosition: Position;
}

export const useScaling = ({ enabled, config = SCALING_CONFIG }: UseScalingOptions): UseScalingReturn => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [iconSize, setIconSize] = useState(config.baseSize);

  useEffect(() => {
    if (!enabled) {
      setIconSize(config.baseSize);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const position: Position = { x: e.clientX, y: e.clientY };
      setMousePosition(position);
      setIconSize(calculateIconSize(position, config));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, config]);

  return { iconSize, mousePosition };
};

