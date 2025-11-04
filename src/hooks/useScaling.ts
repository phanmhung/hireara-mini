import { useState, useEffect, useRef } from 'react';
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

/**
 * Custom hook that tracks mouse position and calculates icon size based on distance from viewport center.
 * Uses requestAnimationFrame for optimal performance during mouse movement.
 *
 * @param options - Configuration options for the scaling hook
 * @param options.enabled - Whether scaling is enabled
 * @param options.config - Optional scaling configuration (minSize, maxSize, baseSize)
 * @returns Object containing current iconSize and mousePosition
 */
export const useScaling = ({ enabled, config = SCALING_CONFIG }: UseScalingOptions): UseScalingReturn => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [iconSize, setIconSize] = useState(config.baseSize);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled) {
      setIconSize(config.baseSize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Cancel any pending RAF to avoid queue buildup
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use RAF to batch updates and sync with browser repaint
      rafRef.current = requestAnimationFrame(() => {
        const position: Position = { x: e.clientX, y: e.clientY };
        setMousePosition(position);
        setIconSize(calculateIconSize(position, config));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, config]);

  return { iconSize, mousePosition };
};

