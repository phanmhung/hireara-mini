import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { Position, IdleTimerState } from '../types';
import { IDLE_TIMER_CONFIG } from '../constants';
import { hasMouseMoved } from '../utils/calculations';

interface UseIdleTimerOptions {
  enabled: boolean;
}

interface UseIdleTimerReturn {
  idleState: IdleTimerState;
}

/**
 * Checks if a mouse position is within the viewport bounds.
 *
 * @param pos - Mouse position to check
 * @returns True if position is within viewport
 */
const isPositionOnPage = (pos: Position): boolean => {
  return (
    pos.x >= 0 &&
    pos.x <= window.innerWidth &&
    pos.y >= 0 &&
    pos.y <= window.innerHeight
  );
};

/**
 * Handles mouse movement events and updates idle timer state accordingly.
 *
 * @param e - Mouse event
 * @param lastMousePosRef - Reference to last mouse position
 * @param lastMouseMoveRef - Reference to last mouse move timestamp
 * @param isMouseOnPageRef - Reference to mouse on page state
 * @param setIsMouseOnPage - State setter for mouse on page
 * @param setIdleTime - State setter for idle time
 */
const handleMouseMove = (
  e: MouseEvent,
  lastMousePosRef: RefObject<Position>,
  lastMouseMoveRef: RefObject<number>,
  isMouseOnPageRef: RefObject<boolean>,
  setIsMouseOnPage: (value: boolean) => void,
  setIdleTime: (value: number) => void
): void => {
  const currentPos: Position = { x: e.clientX, y: e.clientY };

  if (!isPositionOnPage(currentPos)) {
    if (isMouseOnPageRef.current) {
      setIsMouseOnPage(false);
    }
    setIdleTime(0);
    return;
  }

  if (!isMouseOnPageRef.current) {
    setIsMouseOnPage(true);
    lastMouseMoveRef.current = Date.now();
    setIdleTime(0);
    lastMousePosRef.current = currentPos;
    return;
  }

  // Check if mouse moved beyond threshold
  if (
    hasMouseMoved(
      currentPos,
      lastMousePosRef.current,
      IDLE_TIMER_CONFIG.MOVEMENT_THRESHOLD_PX
    )
  ) {
    lastMouseMoveRef.current = Date.now();
    setIdleTime(0);
    lastMousePosRef.current = currentPos;
  }
};

/**
 * Handles visibility change events (tab switching).
 *
 * @param documentHidden - Whether document is hidden
 * @param setIsMouseOnPage - State setter for mouse on page
 * @param setIdleTime - State setter for idle time
 * @param lastMouseMoveRef - Reference to last mouse move timestamp
 */
const handleVisibilityChange = (
  documentHidden: boolean,
  setIsMouseOnPage: (value: boolean) => void,
  setIdleTime: (value: number) => void,
  lastMouseMoveRef: RefObject<number>
): void => {
  if (documentHidden) {
    setIsMouseOnPage(false);
    setIdleTime(0);
  } else {
    setIsMouseOnPage(true);
    lastMouseMoveRef.current = Date.now();
  }
};

/**
 * Handles mouse leave events.
 *
 * @param setIsMouseOnPage - State setter for mouse on page
 * @param setIdleTime - State setter for idle time
 */
const handleMouseLeave = (
  setIsMouseOnPage: (value: boolean) => void,
  setIdleTime: (value: number) => void
): void => {
  setIsMouseOnPage(false);
  setIdleTime(0);
};

/**
 * Custom hook that tracks idle time (time mouse has been on page but not moving).
 * Timer resets when mouse moves beyond threshold or leaves the page.
 *
 * @param options - Configuration options
 * @param options.enabled - Whether the idle timer is enabled
 * @returns Object containing idleState with idleTime and isMouseOnPage
 *
 * @example
 * ```tsx
 * const { idleState } = useIdleTimer({ enabled: true });
 * console.log(`Idle for ${idleState.idleTime} seconds`);
 * ```
 */
export const useIdleTimer = ({ enabled }: UseIdleTimerOptions): UseIdleTimerReturn => {
  const [idleTime, setIdleTime] = useState(0);
  const [isMouseOnPage, setIsMouseOnPage] = useState(true);
  const lastMouseMoveRef = useRef(Date.now());
  const intervalRef = useRef<number | null>(null);
  const lastMousePosRef = useRef<Position>({ x: 0, y: 0 });
  const isMouseOnPageRef = useRef(true);

  useEffect(() => {
    isMouseOnPageRef.current = isMouseOnPage;
  }, [isMouseOnPage]);

  useEffect(() => {
    if (!enabled) {
      setIdleTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    lastMouseMoveRef.current = Date.now();
    setIdleTime(0);
    setIsMouseOnPage(true);
    isMouseOnPageRef.current = true;

    const handleMouseMoveWithTracking = (e: MouseEvent) => {
      handleMouseMove(
        e,
        lastMousePosRef,
        lastMouseMoveRef,
        isMouseOnPageRef,
        setIsMouseOnPage,
        setIdleTime
      );
    };

    const handleVisibilityChangeEvent = () => {
      handleVisibilityChange(document.hidden, setIsMouseOnPage, setIdleTime, lastMouseMoveRef);
    };

    const handleMouseLeaveEvent = () => {
      handleMouseLeave(setIsMouseOnPage, setIdleTime);
    };

    document.addEventListener('mousemove', handleMouseMoveWithTracking);
    document.addEventListener('mouseleave', handleMouseLeaveEvent);
    document.addEventListener('visibilitychange', handleVisibilityChangeEvent);

    intervalRef.current = window.setInterval(() => {
      if (isMouseOnPageRef.current) {
        const elapsed = Math.floor(
          (Date.now() - lastMouseMoveRef.current) / IDLE_TIMER_CONFIG.TIME_UNIT_MS
        );
        setIdleTime(elapsed);
      }
    }, IDLE_TIMER_CONFIG.UPDATE_INTERVAL_MS);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWithTracking);
      document.removeEventListener('mouseleave', handleMouseLeaveEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChangeEvent);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled]);

  return {
    idleState: { idleTime, isMouseOnPage },
  };
};

