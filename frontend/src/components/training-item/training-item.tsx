import { Training } from "../../types/training/training";
import { TrainingTypeLabel } from "../../types/training/training-type.enum";
import { TrainingItemDisplayMode, TrainingItemSettings } from "./constant";

type TrainingItemProps = {
  training: Training,
  displayMode: TrainingItemDisplayMode
}

function TrainingItem({ training, displayMode }: TrainingItemProps): JSX.Element {
  const { price, title, type, calories, description } = training;
  const { itemClass } = TrainingItemSettings[displayMode];
  return (
    <li className={itemClass}>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/thumbnails/training-02.webp, img/content/thumbnails/training-02@2x.webp 2x"
              />
              <img
                src="img/content/thumbnails/training-02.jpg"
                srcSet="img/content/thumbnails/training-02@2x.jpg 2x"
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            {
              (price) ? (
                <>
                  <span className="thumbnail-training__price-value">{price}</span>
                  <span>₽</span>
                </>
              ) : 'Бесплатно'
            }
          </p>
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>{`#${TrainingTypeLabel[type]}`}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>{`#${calories}`}</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="thumbnail-training__rate-value">5</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TrainingItem;