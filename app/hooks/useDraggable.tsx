import { useRef, useCallback } from 'react';

export function useDraggable() {
  const ref = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || getComputedStyle(el).position !== 'absolute') return;
    const rect = el.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    const onMouseMove = (e: MouseEvent) => {
      const parent = el.offsetParent as HTMLElement | null;
      const bounds = parent?.getBoundingClientRect();
      const left = e.clientX - offset.current.x - (bounds?.left ?? 0);
      const top = e.clientY - offset.current.y - (bounds?.top ?? 0);
      el.style.setProperty('left', Math.max(0, Math.min(left, (parent?.clientWidth ?? window.innerWidth) - el.offsetWidth)) + 'px', 'important');
      el.style.top = Math.max(0, Math.min(top, (parent?.clientHeight ?? window.innerHeight) - el.offsetHeight)) + 'px';
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  }, []);

  return { ref, onMouseDown };
}