import { useRef, useCallback } from 'react';

export function useDraggable() {
  const ref = useRef<HTMLElement>(null);
  const translation = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || event.button !== 0) return;

    const header = event.currentTarget;
    const startX = event.clientX;
    const startY = event.clientY;
    const startTranslation = { ...translation.current };
    const rect = el.getBoundingClientRect();
    header.setPointerCapture(event.pointerId);

    const onPointerMove = (move: PointerEvent) => {
      if (move.pointerId !== event.pointerId) return;
      // Translate visually so responsive layout slots and neighboring windows stay put.
      const dx = Math.max(-rect.left, Math.min(move.clientX - startX, window.innerWidth - rect.right));
      const dy = Math.max(-rect.top, Math.min(move.clientY - startY, window.innerHeight - header.offsetHeight - rect.top));
      translation.current = { x: startTranslation.x + dx, y: startTranslation.y + dy };
      el.style.translate = `${translation.current.x}px ${translation.current.y}px`;
    };

    const stopDragging = (end: PointerEvent) => {
      if (end.pointerId !== event.pointerId) return;
      header.removeEventListener('pointermove', onPointerMove);
      header.removeEventListener('pointerup', stopDragging);
      header.removeEventListener('pointercancel', stopDragging);
      header.removeEventListener('lostpointercapture', stopDragging);
      if (header.hasPointerCapture(event.pointerId)) header.releasePointerCapture(event.pointerId);
    };

    header.addEventListener('pointermove', onPointerMove);
    header.addEventListener('pointerup', stopDragging);
    header.addEventListener('pointercancel', stopDragging);
    header.addEventListener('lostpointercapture', stopDragging);
    event.preventDefault();
  }, []);

  return { ref, onPointerDown };
}
