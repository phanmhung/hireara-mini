import type { Position, ScalingConfig } from '../types';
import { SCALING_CONFIG } from '../constants';

/**
 * Calculates the Euclidean distance between two points.
 *
 * @param point1 - First point with x and y coordinates
 * @param point2 - Second point with x and y coordinates
 * @returns The distance between the two points
 */
export const calculateDistance = (point1: Position, point2: Position): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculates the maximum distance from the viewport center to any corner.
 * Used to normalize cursor position for icon scaling.
 *
 * @returns The maximum distance from center to corner
 */
export const calculateMaxDistance = (): number => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const cornerX = window.innerWidth;
  const cornerY = window.innerHeight;
  return calculateDistance({ x: centerX, y: centerY }, { x: cornerX, y: cornerY });
};

/**
 * Calculates the icon size based on cursor position relative to viewport center.
 * Icon is largest at center and smallest at corners.
 *
 * @param cursorPosition - Current mouse position
 * @param config - Scaling configuration (minSize, maxSize, baseSize)
 * @returns Calculated icon size within min/max bounds
 */
export const calculateIconSize = (
  cursorPosition: Position,
  config: ScalingConfig = SCALING_CONFIG
): number => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const center: Position = { x: centerX, y: centerY };

  const distance = calculateDistance(cursorPosition, center);
  const maxDistance = calculateMaxDistance();
  const normalizedDistance = maxDistance > 0 ? distance / maxDistance : 0;

  const sizeRange = config.maxSize - config.minSize;
  const size = config.maxSize - normalizedDistance * sizeRange;

  return Math.max(config.minSize, Math.min(config.maxSize, size));
};

/**
 * Checks if the mouse has moved beyond a given threshold.
 *
 * @param currentPos - Current mouse position
 * @param lastPos - Previous mouse position
 * @param threshold - Movement threshold in pixels
 * @returns True if movement exceeds threshold in either x or y direction
 */
export const hasMouseMoved = (
  currentPos: Position,
  lastPos: Position,
  threshold: number
): boolean => {
  return (
    Math.abs(currentPos.x - lastPos.x) > threshold ||
    Math.abs(currentPos.y - lastPos.y) > threshold
  );
};

