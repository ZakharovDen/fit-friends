import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTrainings } from "../../store/training/selectors";
import { useEffect, useState } from "react";
import { TrainingQueryParams } from "../../types/training/training-query-params";
import { fetchTrainingsAction } from "../../store/training/thunks";
import TrainingSlider from "../../components/training-slider/training-slider";
import { TrainingSliderDisplayMode } from "../../components/training-slider/constant";
import { TrainingItemDisplayMode } from "../../components/training-item/constant";

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { entities } = useAppSelector(getTrainings);
  const [queryParams, _setQueryParams] = useState<TrainingQueryParams>({
    page: 1,
    limit: 20,
    sortBy: 'rating',
    sortOrder: 'desc'
  });
  useEffect(() => {
    dispatch(fetchTrainingsAction(queryParams));
  }, [dispatch, queryParams]);

  return (
    <main>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <section className="special-for-you">
        <div className="container">
          <div className="special-for-you__wrapper">
            <div className="special-for-you__title-wrapper">
              <h2 className="special-for-you__title">Специально подобрано для вас</h2>
              <div className="special-for-you__controls">
                <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon special-for-you__control" type="button" aria-label="next">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <ul className="special-for-you__list">
              <li className="special-for-you__item">
                <div className="thumbnail-preview">
                  <div className="thumbnail-preview__image">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x"
                      />
                      <img
                        src="img/content/thumbnails/preview-03.jpg"
                        srcSet="img/content/thumbnails/preview-03@2x.jpg 2x"
                        width="452"
                        height="191"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="thumbnail-preview__inner">
                    <h3 className="thumbnail-preview__title">crossfit</h3>
                    <div className="thumbnail-preview__button-wrapper">
                      <a className="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="special-for-you__item">
                <div className="thumbnail-preview">
                  <div className="thumbnail-preview__image">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="img/content/thumbnails/preview-02.webp, img/content/thumbnails/preview-02@2x.webp 2x"
                      />
                      <img
                        src="img/content/thumbnails/preview-02.jpg"
                        srcSet="img/content/thumbnails/preview-02@2x.jpg 2x"
                        width="452"
                        height="191"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="thumbnail-preview__inner">
                    <h3 className="thumbnail-preview__title">power</h3>
                    <div className="thumbnail-preview__button-wrapper">
                      <a className="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="special-for-you__item">
                <div className="thumbnail-preview">
                  <div className="thumbnail-preview__image">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="img/content/thumbnails/preview-01.webp, img/content/thumbnails/preview-01@2x.webp 2x"
                      />
                      <img
                        src="img/content/thumbnails/preview-01.jpg"
                        srcSet="img/content/thumbnails/preview-01@2x.jpg 2x"
                        width="452"
                        height="191"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="thumbnail-preview__inner">
                    <h3 className="thumbnail-preview__title">boxing</h3>
                    <div className="thumbnail-preview__button-wrapper">
                      <a className="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="special-offers">
        <div className="container">
          <div className="special-offers__wrapper">
            <h2 className="visually-hidden">Специальные предложения</h2>
            <ul className="special-offers__list">
              <li className="special-offers__item is-active">
                <aside className="promo-slider">
                  <div className="promo-slider__overlay"></div>
                  <div className="promo-slider__image"><img src="img/content/promo-1.png" srcSet="img/content/promo-1@2x.png 2x" width="1040" height="469" alt="promo-photo" />
                  </div>
                  <div className="promo-slider__header">
                    <h3 className="promo-slider__title">Fitball</h3>
                    <div className="promo-slider__logo">
                      <svg width="74" height="74" aria-hidden="true">
                        <use xlinkHref="#logotype"></use>
                      </svg>
                    </div>
                  </div><span className="promo-slider__text">Горячие предложения на тренировки на фитболе</span>
                  <div className="promo-slider__bottom-container">
                    <div className="promo-slider__slider-dots">
                      <button className="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="первый слайд"></button>
                      <button className="promo-slider__slider-dot" aria-label="второй слайд"></button>
                      <button className="promo-slider__slider-dot" aria-label="третий слайд"></button>
                    </div>
                    <div className="promo-slider__price-container">
                      <p className="promo-slider__price">1600 ₽</p>
                      <p className="promo-slider__sup">за занятие</p>
                      <p className="promo-slider__old-price">2000 ₽</p>
                    </div>
                  </div>
                </aside>
              </li>
              <li className="special-offers__item">
                <aside className="promo-slider">
                  <div className="promo-slider__overlay"></div>
                  <div className="promo-slider__image"><img src="img/content/promo-2.png" srcSet="img/content/promo-2@2x.png 2x" width="1040" height="469" alt="promo-photo" />
                  </div>
                  <div className="promo-slider__header">
                    <h3 className="promo-slider__title">Fleksbend</h3>
                    <div className="promo-slider__logo">
                      <svg width="74" height="74" aria-hidden="true">
                        <use xlinkHref="#logotype"></use>
                      </svg>
                    </div>
                  </div><span className="promo-slider__text">Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для фитнеса</span>
                  <div className="promo-slider__bottom-container">
                    <div className="promo-slider__slider-dots">
                      <button className="promo-slider__slider-dot" aria-label="первый слайд"></button>
                      <button className="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="второй слайд"></button>
                      <button className="promo-slider__slider-dot" aria-label="третий слайд"></button>
                    </div>
                    <div className="promo-slider__price-container">
                      <p className="promo-slider__price">2400 ₽</p>
                      <p className="promo-slider__sup">за занятие</p>
                      <p className="promo-slider__old-price">2800 ₽</p>
                    </div>
                  </div>
                </aside>
              </li>
              <li className="special-offers__item">
                <aside className="promo-slider">
                  <div className="promo-slider__overlay"></div>
                  <div className="promo-slider__image"><img src="img/content/promo-3.png" srcSet="img/content/promo-3@2x.png 2x" width="1040" height="469" alt="promo-photo" />
                  </div>
                  <div className="promo-slider__header">
                    <h3 className="promo-slider__title">Full Body Stretch</h3>
                    <div className="promo-slider__logo">
                      <svg width="74" height="74" aria-hidden="true">
                        <use xlinkHref="#logotype"></use>
                      </svg>
                    </div>
                  </div><span className="promo-slider__text">Горячие предложения на&nbsp;Комплекс упражнений на&nbsp;растяжку всего тела для новичков</span>
                  <div className="promo-slider__bottom-container">
                    <div className="promo-slider__slider-dots">
                      <button className="promo-slider__slider-dot" aria-label="первый слайд"></button>
                      <button className="promo-slider__slider-dot" aria-label="второй слайд"></button>
                      <button className="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="третий слайд"></button>
                    </div>
                    <div className="promo-slider__price-container">
                      <p className="promo-slider__price">1800 ₽</p>
                      <p className="promo-slider__sup">за занятие</p>
                      <p className="promo-slider__old-price">2200 ₽</p>
                    </div>
                  </div>
                </aside>
              </li>
            </ul>
            <div className="thumbnail-spec-gym">
              <div className="thumbnail-spec-gym__image">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                  />
                  <img
                    src="img/content/thumbnails/nearest-gym-01.jpg"
                    srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                    width="330"
                    height="190"
                    alt=""
                  />
                </picture>
              </div>
              <div className="thumbnail-spec-gym__header">
                <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-trainings">
        <div className="container">
          <TrainingSlider 
            trainings={entities} 
            trainingSliderDisplayMode={TrainingSliderDisplayMode.Popular} 
            trainingItemDisplayMode={TrainingItemDisplayMode.Popular} 
          />
        </div>
      </section>
    </main>
  );
}

export default MainScreen;