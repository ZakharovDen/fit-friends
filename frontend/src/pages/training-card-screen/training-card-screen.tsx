import { useEffect, useState } from "react";
import PopupFeedback from "../../components/popup-feedback/popup-feedback";
import ReviewItem from "../../components/review-item/review-item";
import PopupBuy from "../../components/popup-buy/popup-buy";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTrainingInfo } from "../../store/training/selectors";
import { getTrainingAction } from "../../store/training/thunks";
import { TrainingTypeLabel } from "../../types/training/training-type.enum";
import { SexTrainingLabel } from "../../types/sex.enum";

function TrainingCardScreen(): JSX.Element {
  const [isPopupFeedbackVisible, setPopupFeedbackVisible] = useState<boolean>(false);
  const [isPopupBuyVisible, setPopupBuyVisible] = useState<boolean>(false);
  const params = useParams();
  const dispatch = useAppDispatch();
  const training = useAppSelector(getTrainingInfo);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(getTrainingAction(id));
    }
  }, [params, dispatch]);

  const hashTags = [];
  hashTags.push((training?.type) ? TrainingTypeLabel[training?.type].toLowerCase() : '');
  hashTags.push((training?.sex) ? SexTrainingLabel[training?.sex].replace(' ', '_') : '');
  hashTags.push((training?.calories) ? `${training?.calories}ккал` : '');
  hashTags.push((training?.duration) ? `${training?.duration.replace('-', '_')}минут` : '');

  const openPopupFeedback = () => setPopupFeedbackVisible(true);
  const closePopupFeedback = () => setPopupFeedbackVisible(false);

  const openPopupBuy = () => setPopupBuyVisible(true);
  const closePopupBuy = () => setPopupBuyVisible(false);
  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <aside className="reviews-side-bar">
              <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <h2 className="reviews-side-bar__title">Отзывы</h2>
              <ul className="reviews-side-bar__list">
                <ReviewItem />
              </ul>
              <button className="btn btn--medium reviews-side-bar__button" type="button" onClick={openPopupFeedback}>Оставить отзыв</button>
              <PopupFeedback isVisible={isPopupFeedbackVisible} onClose={closePopupFeedback} />
            </aside>
            <div className="training-card">
              <div className="training-info">
                <h2 className="visually-hidden">Информация о тренировке</h2>
                <div className="training-info__header">
                  <div className="training-info__coach">
                    <div className="training-info__photo">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={training?.user.avatar}
                        />
                        <img
                          src={training?.user.avatar}
                          srcSet={training?.user.avatar}
                          width="64"
                          height="64"
                          alt="Изображение тренера"
                        />
                      </picture>
                    </div>
                    <div className="training-info__coach-info">
                      <span className="training-info__label">Тренер</span>
                      <span className="training-info__name">{training?.user.name}</span>
                    </div>
                  </div>
                </div>
                <div className="training-info__main-content">
                  <form action="#" method="get">
                    <div className="training-info__form-wrapper">
                      <div className="training-info__info-wrapper">
                        <div className="training-info__input training-info__input--training">
                          <label><span className="training-info__label">Название тренировки</span>
                            <input type="text" name="training" value={training?.title} disabled />
                          </label>
                          <div className="training-info__error">Обязательное поле</div>
                        </div>
                        <div className="training-info__textarea">
                          <label><span className="training-info__label">Описание тренировки</span>
                            <textarea name="description" disabled>{training?.description}</textarea>
                          </label>
                        </div>
                      </div>
                      <div className="training-info__rating-wrapper">
                        <div className="training-info__input training-info__input--rating">
                          <label><span className="training-info__label">Рейтинг</span><span className="training-info__rating-icon">
                            <svg width="18" height="18" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg></span>
                            <input type="number" name="rating" value={training?.rating} disabled />
                          </label>
                        </div>
                        <ul className="training-info__list">
                          {hashTags.map((item) => (
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>{`#${item}`}</span></div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="training-info__price-wrapper">
                        <div className="training-info__input training-info__input--price">
                          <label><span className="training-info__label">Стоимость</span>
                            <input type="text" name="price" value={`${training?.price} ₽`} disabled />
                          </label>
                          <div className="training-info__error">Введите число</div>
                        </div>
                        <button className="btn training-info__buy" type="button" onClick={openPopupBuy}>Купить</button>
                        <PopupBuy isVisible={isPopupBuyVisible} onClose={closePopupBuy} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-video">
                <h2 className="training-video__title">Видео</h2>
                <div className="training-video__video">
                  <div className="training-video__thumbnail">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"
                      />
                      <img
                        src="img/content/training-video/video-thumbnail.png"
                        srcSet="img/content/training-video/video-thumbnail@2x.png 2x"
                        width="922"
                        height="566"
                        alt="Обложка видео"
                      />
                    </picture>
                  </div>
                  <button className="training-video__play-button btn-reset">
                    <svg width="18" height="30" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                </div>
                <div className="training-video__buttons-wrapper">
                  <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
                  <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TrainingCardScreen;