import React, { useState, useRef, useEffect } from 'react';
import { Training } from '../../types/training/training';
import TrainingItem from '../training-item/training-item';
import { TrainingItemDisplayMode } from '../training-item/constant';

type TrainingSliderProps = {
  trainings: Training[];
}

function TrainingSlider({ trainings }: TrainingSliderProps): JSX.Element {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [visibleItems, setVisibleItems] = useState(4); // Начальное значение
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Рассчитываем ширину контейнера и количество видимых элементов
  useEffect(() => {
    const updateVisibleItems = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calculatedVisibleItems = Math.floor(containerWidth / 330); // 330 - ширина карточки
        setVisibleItems(Math.min(calculatedVisibleItems, trainings.length));
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, [trainings.length]);

  // Проверка границ слайдера
  const canGoNext = currentIndex < trainings.length - visibleItems;
  const canGoPrev = currentIndex > 0;

  const goToSlide = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && canGoPrev) {
      setCurrentIndex(prev => prev - 1);
    } else if (direction === 'next' && canGoNext) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    if ((!canGoNext && currentIndex === trainings.length - visibleItems) || 
        (!canGoPrev && currentIndex === 0)) {
      setTransitionEnabled(false);
    } else {
      setTransitionEnabled(true);
    }
  }, [currentIndex, canGoNext, canGoPrev, trainings.length, visibleItems]);

  // Стили для контейнера и списка
  const containerStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: '100%'
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
    transform: `translateX(-${currentIndex * 354}px)`, // 330 - ширина карточки
    margin: 0,
    padding: 0,
    listStyle: 'none'
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <div className="popular-trainings__controls">
              <button
                className={`btn-icon popular-trainings__control ${!canGoPrev ? 'disabled' : ''}`}
                type="button"
                aria-label="previous"
                onClick={() => goToSlide('prev')}
                disabled={!canGoPrev}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className={`btn-icon popular-trainings__control ${!canGoNext ? 'disabled' : ''}`}
                type="button"
                aria-label="next"
                onClick={() => goToSlide('next')}
                disabled={!canGoNext}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <div 
            className="popular-trainings__list-wrapper" 
            ref={containerRef}
            style={containerStyle}
          >
            <ul className="popular-trainings__list" ref={listRef} style={listStyle}>
              {trainings.map((training) => <TrainingItem displayMode={TrainingItemDisplayMode.Popular} training={training} key={training.id} />)}
            </ul>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSlider;