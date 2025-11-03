export type RotationDirection = 1 | -1;

export interface Position {
  x: number;
  y: number;
}

export interface RotationState {
  angle: number;
  direction: RotationDirection;
}

export interface ScalingConfig {
  minSize: number;
  maxSize: number;
  baseSize: number;
}
