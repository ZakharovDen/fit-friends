import { useEffect, useRef, useState } from 'react';
import { Training } from '../../types/training/training';
import { TrainingItemDisplayMode } from '../training-item/constant';
import TrainingItem from '../training-item/training-item';

type TrainingCatalogListProps = {
  trainings: Training[];
  onButtonMoreClick: () => void;
  totalItems: number;
}

function TrainingCatalogList({ trainings, onButtonMoreClick, totalItems }: TrainingCatalogListProps): JSX.Element {
  const [showMoreButton, setShowMoreButton] = useState(true);
  const trainingListRef = useRef<HTMLUListElement>(null);

  const handleButtonMoreClick = () => {
    onButtonMoreClick();
  };

  const handleButtonToTopClick = () => {
    if (trainingListRef.current) {
      trainingListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (trainings.length > 0) {
      setShowMoreButton(totalItems > trainings.length);
    }
  }, [totalItems, trainings]);

  return (
    <div className="training-catalog">
      <ul className="training-catalog__list" ref={trainingListRef}>
        {trainings.map((training) => <TrainingItem displayMode={TrainingItemDisplayMode.Catalog} training={training} key={training.id} />)}
      </ul>
      <div className="show-more training-catalog__show-more">
        {
          showMoreButton
            ? (<button className="btn show-more__button show-more__button--more" type="button" onClick={handleButtonMoreClick}>Показать еще</button>)
            : (<button className="btn show-more__button show-more__button--more" type="button" onClick={handleButtonToTopClick}>Вернуться в начало</button>)
        }
      </div>
    </div>
  );
}

export default TrainingCatalogList;
