import type { Position, ScalingConfig } from '../types';
import { SCALING_CONFIG } from '../constants';

export const calculateDistance = (point1: Position, point2: Position): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const calculateMaxDistance = (): number => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const cornerX = window.innerWidth;
  const cornerY = window.innerHeight;
  return calculateDistance({ x: centerX, y: centerY }, { x: cornerX, y: cornerY });
};

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

