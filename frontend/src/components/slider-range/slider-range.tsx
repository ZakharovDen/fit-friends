import {
  MouseEvent as ReactMouseEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

export type SliderRangeProps = {
  className: string;
  minRangeValue?: number;
  maxRangeValue: number;
  minValue?: number;
  maxValue?: number;
  isShowValues?: boolean;
  onChange?: (values: { min: number; max: number }) => void;
};

function SliderRange({
  className,
  minRangeValue = 0,
  maxRangeValue,
  minValue = 0,
  maxValue = maxRangeValue,
  isShowValues = false,
  onChange,
}: SliderRangeProps) {
  const [currentMin, setCurrentMin] = useState(minValue);
  const [currentMax, setCurrentMax] = useState(maxValue);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef({ currentMin, currentMax });

  // Обновляем ref при изменении значений
  useEffect(() => {
    valuesRef.current = { currentMin, currentMax };
  }, [currentMin, currentMax]);

  useEffect(() => {
    setCurrentMin(minValue);
    setCurrentMax(maxValue);
  }, [minValue, maxValue]);

// Добавляем проверку в `calculateValue` и `calculatePosition`
const calculatePosition = useCallback(
  (value: number) => {
    if (!scaleRef.current || scaleRef.current.offsetWidth === 0) return 0;
    const scaleWidth = scaleRef.current.offsetWidth;
    return ((value - minRangeValue) / (maxRangeValue - minRangeValue)) * scaleWidth;
  },
  [minRangeValue, maxRangeValue]
);

  const calculateValue = useCallback(
    (position: number) => {
      if (!scaleRef.current) return minRangeValue;
      const scaleWidth = scaleRef.current.offsetWidth;
      const value =
        (position / scaleWidth) * (maxRangeValue - minRangeValue) +
        minRangeValue;
      return Math.round(value);
    },
    [minRangeValue, maxRangeValue]
  );

  // Мемоизируем позиции для предотвращения лишних ререндеров
  const minPos = useMemo(
    () => calculatePosition(currentMin),
    [currentMin, calculatePosition]
  );
  const maxPos = useMemo(
    () => calculatePosition(currentMax),
    [currentMax, calculatePosition]
  );

  useEffect(() => {
    if (!barRef.current) return;
    barRef.current.style.left = `${minPos}px`;
    barRef.current.style.width = `${maxPos - minPos}px`;
  }, [minPos, maxPos]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !scaleRef.current) return;

      const scaleRect = scaleRef.current.getBoundingClientRect();
      let newPosition = e.clientX - scaleRect.left;
      newPosition = Math.max(0, Math.min(newPosition, scaleRect.width));

      const newValue = calculateValue(newPosition);
      const { currentMin, currentMax } = valuesRef.current;

      if (isDragging === 'min') {
        const clampedValue = Math.min(newValue, currentMax - 1);
        setCurrentMin(clampedValue);
      } else {
        const clampedValue = Math.max(newValue, currentMin + 1);
        setCurrentMax(clampedValue);
      }
    },
    [isDragging, calculateValue]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseUp);

    onChange?.({
      min: valuesRef.current.currentMin,
      max: valuesRef.current.currentMax,
    });
  }, [handleMouseMove, onChange]);

  const handleMouseDown = useCallback(
    (type: 'min' | 'max') => (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDragging(type);
  
      // Сразу обновляем позицию ползунка
      if (scaleRef.current) {
        const scaleRect = scaleRef.current.getBoundingClientRect();
        const clickX = e.clientX - scaleRect.left;
        const newValue = calculateValue(clickX);
  
        if (type === 'min') {
          setCurrentMin(Math.min(newValue, currentMax - 1));
        } else {
          setCurrentMax(Math.max(newValue, currentMin + 1));
        }
      }
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    },
    [handleMouseMove, handleMouseUp, currentMin, currentMax, calculateValue]
  );

useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className={className}>
      <div className={`${className}__scale`} ref={scaleRef}>
        <div className={`${className}__bar`} ref={barRef}>
          <span className="visually-hidden">Полоса прокрутки</span>
        </div>
      </div>

      <div className={`${className}__control`}>
        <button
          className={`${className}__min-toggle`}
          onMouseDown={handleMouseDown('min')}
          style={{ left: `${minPos}px` }}
          aria-label="Минимальное значение"
        >
          <span className="visually-hidden">Минимальное значение</span>
        </button>

        {isShowValues && (
          <span className={`${className}__value`}>{currentMin}</span>
        )}

        <button
          className={`${className}__max-toggle`}
          onMouseDown={handleMouseDown('max')}
          style={{ left: `${maxPos}px` }}
          aria-label="Максимальное значение"
        >
          <span className="visually-hidden">Максимальное значение</span>
        </button>

        {isShowValues && (
          <span className={`${className}__value`}>{currentMax}</span>
        )}
      </div>
    </div>
  );
}

export default SliderRange;
