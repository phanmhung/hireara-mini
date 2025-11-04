import type { ScalingConfig } from '../types';

export const ROTATION_CONFIG = {
  ANGLE_INCREMENT: 2,
  FRAME_RATE_MS: 16,
} as const;

export const SCALING_CONFIG: ScalingConfig = {
  minSize: 50,
  maxSize: 500,
  baseSize: 100,
} as const;

export const IDLE_TIMER_CONFIG = {
  UPDATE_INTERVAL_MS: 100,
  MOVEMENT_THRESHOLD_PX: 1,
  TIME_UNIT_MS: 1000,
} as const;

export const SIDEBAR_CONFIG = {
  WIDTH: 250,
  ANIMATION_DURATION_MS: 300,
  BUTTON_OFFSET_OPEN: 270,
  BUTTON_OFFSET_CLOSED: 16,
} as const;
