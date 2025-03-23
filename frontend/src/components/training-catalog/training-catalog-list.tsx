import { Sex } from "../../types/sex.enum";
import { Training } from "../../types/training/training";
import { TrainingDuration } from "../../types/training/training-duration.enum";
import { TrainingLevel } from "../../types/training/training-level.enum";
import { TrainingType } from "../../types/training/training-type.enum";
import { TrainingItemDisplayMode } from "../training-item/constant";
import TrainingItem from "../training-item/training-item";

const mockTraining: Training =     {
  id: "0dfbda7e-fb14-4ca3-ae1d-8e111a777a66",
  userId: "6581762309c030b503e30512",
  title: "full body stretch",
  image: "default/catalog-product-6.png",
  level: TrainingLevel["Beginner"],
  type: TrainingType["Pilates"],
  duration: TrainingDuration["50-80"],
  price: 1000,
  calories: 1607,
  description: "Знаменитый кроссфит комплекс. Синди — универсальная тренировка для развития функциональной силы.",
  sex: Sex["Male"],
  video: "uploads/training-video-1.mp4",
  specialOffer: false,
  createdAt: new Date(),
}

function TrainingCatalogList(): JSX.Element {
  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
        <TrainingItem training={mockTraining} displayMode={TrainingItemDisplayMode.Catalog}/>
        <TrainingItem training={mockTraining} displayMode={TrainingItemDisplayMode.Catalog}/>
        <TrainingItem training={mockTraining} displayMode={TrainingItemDisplayMode.Catalog}/>
        <TrainingItem training={mockTraining} displayMode={TrainingItemDisplayMode.Catalog}/>
        <TrainingItem training={mockTraining} displayMode={TrainingItemDisplayMode.Catalog}/>
        <TrainingItem training={mockTraining} displayMode={TrainingItemDisplayMode.Catalog}/>
        </ul>
      <div className="show-more training-catalog__show-more">
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </div>
  );
}

export default TrainingCatalogList;