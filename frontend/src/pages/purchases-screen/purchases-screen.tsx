import { TrainingItemDisplayMode } from "../../components/training-item/constant";
import TrainingItem from "../../components/training-item/training-item";
import { Sex } from "../../types/sex.enum";
import { Training } from "../../types/training/training";
import { TrainingDuration } from "../../types/training/training-duration.enum";
import { TrainingLevel } from "../../types/training/training-level.enum";
import { TrainingType } from "../../types/training/training-type.enum";

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

function PurchasesScreen(): JSX.Element {
  return (
<main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button className="btn-flat my-purchases__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement-1" name="user-agreement"/><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                <TrainingItem displayMode={TrainingItemDisplayMode.Purchase} training={mockTraining} />
              </ul>
              <div className="show-more my-purchases__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}

export default PurchasesScreen;