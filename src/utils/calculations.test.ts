import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateDistance,
  calculateMaxDistance,
  calculateIconSize,
  hasMouseMoved,
} from './calculations';
import type { Position, ScalingConfig } from '../types';
import { SCALING_CONFIG } from '../constants';

describe('calculations', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two points correctly', () => {
      const point1: Position = { x: 0, y: 0 };
      const point2: Position = { x: 3, y: 4 };
      expect(calculateDistance(point1, point2)).toBe(5);
    });

    it('should return 0 for same points', () => {
      const point: Position = { x: 5, y: 5 };
      expect(calculateDistance(point, point)).toBe(0);
    });

    it('should handle negative coordinates', () => {
      const point1: Position = { x: -1, y: -1 };
      const point2: Position = { x: 2, y: 2 };
      expect(calculateDistance(point1, point2)).toBeCloseTo(4.243, 2);
    });
  });

  describe('calculateMaxDistance', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1080,
      });
    });

    it('should calculate max distance from center to corner', () => {
      const maxDistance = calculateMaxDistance();
      // Center is (960, 540), corner is (1920, 1080)
      // Distance = sqrt((1920-960)^2 + (1080-540)^2) = sqrt(960^2 + 540^2)
      const expected = Math.sqrt(960 * 960 + 540 * 540);
      expect(maxDistance).toBeCloseTo(expected, 2);
    });

    it('should handle different window sizes', () => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      const maxDistance = calculateMaxDistance();
      const expected = Math.sqrt(400 * 400 + 300 * 300);
      expect(maxDistance).toBeCloseTo(expected, 2);
    });
  });

  describe('calculateIconSize', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1080,
      });
    });

    it('should return maxSize when cursor is at center', () => {
      const centerPos: Position = { x: 960, y: 540 };
      const size = calculateIconSize(centerPos);
      expect(size).toBe(SCALING_CONFIG.maxSize);
    });

    it('should return minSize when cursor is at corner', () => {
      const cornerPos: Position = { x: 1920, y: 1080 };
      const size = calculateIconSize(cornerPos);
      expect(size).toBe(SCALING_CONFIG.minSize);
    });

    it('should return size within min/max range', () => {
      const midPos: Position = { x: 1440, y: 810 };
      const size = calculateIconSize(midPos);
      expect(size).toBeGreaterThanOrEqual(SCALING_CONFIG.minSize);
      expect(size).toBeLessThanOrEqual(SCALING_CONFIG.maxSize);
    });

    it('should use custom config when provided', () => {
      const customConfig: ScalingConfig = { minSize: 20, maxSize: 200, baseSize: 100 };
      const centerPos: Position = { x: 960, y: 540 };
      const size = calculateIconSize(centerPos, customConfig);
      expect(size).toBe(customConfig.maxSize);
    });

    it('should handle edge case when window is very small', () => {
      window.innerWidth = 100;
      window.innerHeight = 100;
      const pos: Position = { x: 50, y: 50 };
      const size = calculateIconSize(pos);
      expect(size).toBeGreaterThanOrEqual(SCALING_CONFIG.minSize);
      expect(size).toBeLessThanOrEqual(SCALING_CONFIG.maxSize);
    });
  });

  describe('hasMouseMoved', () => {
    it('should return true when movement exceeds threshold', () => {
      const current: Position = { x: 10, y: 10 };
      const last: Position = { x: 0, y: 0 };
      expect(hasMouseMoved(current, last, 5)).toBe(true);
    });

    it('should return false when movement is within threshold', () => {
      const current: Position = { x: 2, y: 2 };
      const last: Position = { x: 0, y: 0 };
      expect(hasMouseMoved(current, last, 5)).toBe(false);
    });

    it('should return true when only x exceeds threshold', () => {
      const current: Position = { x: 10, y: 0 };
      const last: Position = { x: 0, y: 0 };
      expect(hasMouseMoved(current, last, 5)).toBe(true);
    });

    it('should return true when only y exceeds threshold', () => {
      const current: Position = { x: 0, y: 10 };
      const last: Position = { x: 0, y: 0 };
      expect(hasMouseMoved(current, last, 5)).toBe(true);
    });

    it('should handle negative positions', () => {
      const current: Position = { x: -5, y: -5 };
      const last: Position = { x: 0, y: 0 };
      expect(hasMouseMoved(current, last, 3)).toBe(true);
    });
  });
});

