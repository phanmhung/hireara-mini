import type { ScalingConfig } from '../types';

export const ROTATION_CONFIG = {
  ANGLE_INCREMENT: 2,
  FRAME_RATE_MS: 16,
} as const;

export const SCALING_CONFIG: ScalingConfig = {
  minSize: 50,
  maxSize: 200,
  baseSize: 100,
} as const;
