import { useState, useEffect, useRef } from 'react';
import type { Position, IdleTimerState } from '../types';
import { IDLE_TIMER_CONFIG } from '../constants';
import { hasMouseMoved } from '../utils/calculations';

interface UseIdleTimerOptions {
  enabled: boolean;
}

interface UseIdleTimerReturn {
  idleState: IdleTimerState;
}

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

    const handleMouseMoveWithTracking = (e: MouseEvent) => {
      const currentPos: Position = { x: e.clientX, y: e.clientY };
      
      const isOnPage = 
        currentPos.x >= 0 && 
        currentPos.x <= window.innerWidth &&
        currentPos.y >= 0 && 
        currentPos.y <= window.innerHeight;

      if (!isOnPage) {
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

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsMouseOnPage(false);
        setIdleTime(0);
      } else {
        setIsMouseOnPage(true);
        lastMouseMoveRef.current = Date.now();
      }
    };

    const handleMouseLeave = () => {
      setIsMouseOnPage(false);
      setIdleTime(0);
    };

    document.addEventListener('mousemove', handleMouseMoveWithTracking);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

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
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled]);

  return {
    idleState: { idleTime, isMouseOnPage },
  };
};

