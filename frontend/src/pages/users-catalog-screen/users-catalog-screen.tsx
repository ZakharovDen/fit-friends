import { useState } from "react";
import BackButton from "../../components/back-button/back-button";
import { BackButtonDisplayMode } from "../../components/back-button/constant";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { UserLocation, UserLocationLabel } from "../../types/user/user-location.enum";
import FilterCheckbox from "../../components/filter-checkbox/filter-checkbox";
import FilterRadio from "../../components/filter-radio/filter-radio";

type UserFilter = {
  locations: UserLocation[],
  spezializations: TrainingType[],
  level: TrainingLevel,
}

function UserCatalogScreen(): JSX.Element {
  const [filterValues, setFilterValues] = useState<UserFilter>({
    level: TrainingLevel.Beginner,
    locations: [],
    spezializations: []
  });

  const locations = Object.entries(UserLocationLabel).map(([key, label]) => ({ key, label }));
  const specializations = Object.entries(TrainingTypeLabel).map(([key, label]) => ({ key, label }));
  const levels = Object.entries(TrainingLevelLabel).map(([key, label]) => ({ key, label }));

  const handleLocationChange1 = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, locations: [...filterValues.locations, key as UserLocation] });
    } else {
      setFilterValues((filterValues) => ({ ...filterValues, locations: filterValues.locations.filter((location) => location !== key) }));
    }
  };

  const handleSpecializationChange = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, spezializations: [...filterValues.spezializations, key as TrainingType] });
    } else {
      setFilterValues((filterValues) => ({ ...filterValues, spezializations: filterValues.spezializations.filter((spezialization) => spezialization !== key) }));
    }
  };

  const handleLevelChange = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, level: key as TrainingLevel });
    }
  };

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог пользователей</h1>
            <div className="user-catalog-form">
              <h2 className="visually-hidden">Каталог пользователя</h2>
              <div className="user-catalog-form__wrapper">
                <BackButton displayMode={BackButtonDisplayMode.UsersCatalog} />
                <h3 className="user-catalog-form__title">Фильтры</h3>
                <form className="user-catalog-form__form">

                  <FilterCheckbox
                    onChange={handleLocationChange1}
                    options={locations}
                    selectedKeys={filterValues.locations}
                    title="Локация, станция метро"
                    className="user-catalog-form__block--location"
                  />

                  <FilterCheckbox
                    onChange={handleSpecializationChange}
                    options={specializations}
                    selectedKeys={filterValues.spezializations}
                    title="Специализация"
                    className="user-catalog-form__block--spezialization"
                  />

                  <FilterRadio
                    onChange={handleLevelChange}
                    options={levels}
                    selectedKey={filterValues.level}
                    title="Ваш уровень"
                    className="user-catalog-form__block--level"
                  />

                  <div className="user-catalog-form__block">
                    <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                    <div className="btn-radio-sort">
                      <label>
                        <input type="radio" name="sort" checked /><span className="btn-radio-sort__label">Тренеры</span>
                      </label>
                      <label>
                        <input type="radio" name="sort" /><span className="btn-radio-sort__label">Пользователи</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="inner-page__content">
              <div className="users-catalog">
                <ul className="users-catalog__list">
                  <li className="users-catalog__item">
                    <div className="thumbnail-user thumbnail-user--role-user">
                      <div className="thumbnail-user__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/user-01.webp, img/content/thumbnails/user-01@2x.webp 2x" />
                          <img src="img/content/thumbnails/user-01.jpg" srcSet="img/content/thumbnails/user-01@2x.jpg 2x" width="82" height="82" alt="" />
                        </picture>
                      </div>
                      <div className="thumbnail-user__header">
                        <h3 className="thumbnail-user__name">Елизавета</h3>
                        <div className="thumbnail-user__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-user__location-address">Петроградская</address>
                        </div>
                      </div>
                      <ul className="thumbnail-user__hashtags-list">
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                        </li>
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
                        </li>
                      </ul>
                      <a className="btn btn--medium thumbnail-user__button" href="#">Подробнее</a>
                    </div>
                  </li>
                  <li className="users-catalog__item">
                    <div className="thumbnail-user thumbnail-user--role-coach">
                      <div className="thumbnail-user__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/user-02.webp, img/content/thumbnails/user-02@2x.webp 2x" />
                          <img src="img/content/thumbnails/user-02.jpg" srcSet="img/content/thumbnails/user-02@2x.jpg 2x" width="82" height="82" alt="" />
                        </picture>
                      </div>
                      <div className="thumbnail-user__header">
                        <h3 className="thumbnail-user__name">Дарья</h3>
                        <div className="thumbnail-user__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-user__location-address">Адмиралтейская</address>
                        </div>
                      </div>
                      <ul className="thumbnail-user__hashtags-list">
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                        </li>
                      </ul>
                      <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                    </div>
                  </li>
                  <li className="users-catalog__item">
                    <div className="thumbnail-user thumbnail-user--role-coach">
                      <div className="thumbnail-user__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/user-03.webp, img/content/thumbnails/user-03@2x.webp 2x" />
                          <img src="img/content/thumbnails/user-03.jpg" srcSet="img/content/thumbnails/user-03@2x.jpg 2x" width="82" height="82" alt="" />
                        </picture>
                      </div>
                      <div className="thumbnail-user__header">
                        <h3 className="thumbnail-user__name">Наталья</h3>
                        <div className="thumbnail-user__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-user__location-address">Василеостровская</address>
                        </div>
                      </div>
                      <ul className="thumbnail-user__hashtags-list">
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#пилатес</span></div>
                        </li>
                      </ul>
                      <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                    </div>
                  </li>
                  <li className="users-catalog__item">
                    <div className="thumbnail-user thumbnail-user--role-coach">
                      <div className="thumbnail-user__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/user-08.webp, img/content/thumbnails/user-08@2x.webp 2x" />
                          <img src="img/content/thumbnails/user-08.jpg" srcSet="img/content/thumbnails/user-08@2x.jpg 2x" width="82" height="82" alt="" />
                        </picture>
                      </div>
                      <div className="thumbnail-user__header">
                        <h3 className="thumbnail-user__name">Никита</h3>
                        <div className="thumbnail-user__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-user__location-address">Садовая</address>
                        </div>
                      </div>
                      <ul className="thumbnail-user__hashtags-list">
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
                        </li>
                      </ul>
                      <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                    </div>
                  </li>
                  <li className="users-catalog__item">
                    <div className="thumbnail-user thumbnail-user--role-user">
                      <div className="thumbnail-user__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/user-09.webp, img/content/thumbnails/user-09@2x.webp 2x" />
                          <img src="img/content/thumbnails/user-09.jpg" srcSet="img/content/thumbnails/user-09@2x.jpg 2x" width="82" height="82" alt="" />
                        </picture>
                      </div>
                      <div className="thumbnail-user__header">
                        <h3 className="thumbnail-user__name">Татьяна</h3>
                        <div className="thumbnail-user__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-user__location-address">Площадь Александра Невского</address>
                        </div>
                      </div>
                      <ul className="thumbnail-user__hashtags-list">
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                        </li>
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
                        </li>
                      </ul>
                      <a className="btn btn--medium thumbnail-user__button" href="#">Подробнее</a>
                    </div>
                  </li>
                </ul>
                <div className="show-more users-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UserCatalogScreen;