import { Training } from "../../types/training/training";
import { TrainingItemDisplayMode } from "../training-item/constant";
import TrainingItem from "../training-item/training-item";

type TrainingCatalogListProps = {
  trainings: Training[]
}

function TrainingCatalogList({ trainings }: TrainingCatalogListProps): JSX.Element {
  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
        {trainings.map((training) => <TrainingItem displayMode={TrainingItemDisplayMode.Catalog} training={training} />)}
      </ul>
      <div className="show-more training-catalog__show-more">
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </div>
  );
}

export default TrainingCatalogList;