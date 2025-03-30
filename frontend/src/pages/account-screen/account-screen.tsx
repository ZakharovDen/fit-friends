import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { getUser } from "../../store/user/selectors";
import { UserLocation, UserLocationLabel } from "../../types/user/user-location.enum";
import { CustomSelect } from "../../components/custom-select/custom-select";
import { Sex, SexUserLabel } from "../../types/sex.enum";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";

function isSex(value: string): value is Sex {
  return Object.values(Sex).includes(value as Sex);
}

function isLocation(value: string): value is UserLocation {
  return Object.values(UserLocation).includes(value as UserLocation);
}

function isLevel(value: string): value is TrainingLevel {
  return Object.values(TrainingLevel).includes(value as TrainingLevel);
}

function AccountScreen(): JSX.Element {
  console.dir(Object.entries(UserLocationLabel).map(([key, value]) => ({value: key, label: value})));

  const user = useAppSelector(getUser);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(user?.location);
  const [selectedSex, setSelectedSex] = useState<string | undefined>(user?.sex);
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();

  const handleLocationSelect = (location: string) => {
    if (isLocation(location)) {
      console.log(location);
      setSelectedLocation(location);
    }
  };

const handleSexSelect = (sex: string) => {
  if (isSex(sex)) {
    setSelectedSex(sex);
  }
}

const handleLevelSelect = (level: string) => {
  if (isLevel(level)) {
    setSelectedLevel(level);
  }
}

useEffect(() => {
  setSelectedSex(user?.sex);
  setSelectedLocation(user?.location)
}, [user])

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <section className="user-info">
              <div className="user-info__header">
                <div className="input-load-avatar">
                  <label>
                    <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
                    <span className="input-load-avatar__avatar">
                      <img 
                        src={user?.avatar} 
                        srcSet="img/content/user-photo-1@2x.png 2x" 
                        width="98" 
                        height="98" 
                        alt="user photo" 
                      />
                    </span>
                  </label>
                </div>
              </div>
              <form className="user-info__form" action="#" method="post">
                <button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label="Редактировать">
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg><span>Редактировать</span>
                </button>
                <div className="user-info__section">
                  <h2 className="user-info__title">Обо мне</h2>
                  <div className="custom-input custom-input--readonly user-info__input">
                    <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
                      <input type="text" name="name" value={user?.name} disabled /></span>
                    </label>
                  </div>
                  <div className="custom-textarea custom-textarea--readonly user-info__textarea">
                    <label><span className="custom-textarea__label">Описание</span>
                      <textarea name="description" placeholder=" " disabled>
                        {user?.description}
                      </textarea>
                    </label>
                  </div>
                </div>
                <div className="user-info__section user-info__section--status">
                  <h2 className="user-info__title user-info__title--status">Статус</h2>
                  <div className="custom-toggle custom-toggle--switch user-info__toggle">
                    <label>
                      <input type="checkbox" name="ready-for-training" checked /><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">Готов тренировать</span>
                    </label>
                  </div>
                </div>
                <div className="user-info__section">
                  <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
                  <div className="specialization-checkbox user-info__specialization">
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="yoga" checked /><span className="btn-checkbox__btn">Йога</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="running" /><span className="btn-checkbox__btn">Бег</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="aerobics" checked /><span className="btn-checkbox__btn">Аэробика</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="boxing" /><span className="btn-checkbox__btn">Бокс</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="power" /><span className="btn-checkbox__btn">Силовые</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="pilates" checked /><span className="btn-checkbox__btn">Пилатес</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="stretching" checked /><span className="btn-checkbox__btn">Стрейчинг</span>
                      </label>
                    </div>
                    <div className="btn-checkbox">
                      <label>
                        <input className="visually-hidden" type="checkbox" name="specialization" value="crossfit" /><span className="btn-checkbox__btn">Кроссфит</span>
                      </label>
                    </div>
                  </div>
                </div>
                <CustomSelect 
                  value={selectedLocation} 
                  label={'Локация'} 
                  readonly={true}
                  options={Object.entries(UserLocationLabel).map(([key, value]) => ({value: key, label: value}))}
                  onChange={handleLocationSelect}
                  //placeholder={selectedSex} 
                />
                <CustomSelect 
                  value={selectedSex} 
                  label={'Пол'} 
                  readonly={true}
                  options={Object.entries(SexUserLabel).map(([key, value]) => ({value: key, label: value}))}
                  onChange={handleSexSelect}
                  //placeholder={selectedSex} 
                />
                <CustomSelect 
                  value={selectedLevel} 
                  label={'Уровень'} 
                  readonly={true}
                  options={Object.entries(TrainingLevelLabel).map(([key, value]) => ({value: key, label: value}))}
                  onChange={handleLevelSelect}
                  //placeholder={selectedSex} 
                />
              </form>
            </section>
            <div className="inner-page__content">
              <div className="personal-account-user">
                <div className="personal-account-user__schedule">
                  <form action="#" method="get">
                    <div className="personal-account-user__form">
                      <div className="personal-account-user__input">
                        <label><span className="personal-account-user__label">План на день, ккал</span>
                          <input type="text" name="schedule-for-the-day" value="3 300" />
                        </label>
                      </div>
                      <div className="personal-account-user__input">
                        <label><span className="personal-account-user__label">План на неделю, ккал</span>
                          <input type="text" name="schedule-for-the-week" value="23 100" />
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="personal-account-user__additional-info">
                  <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-shopping-cart"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Мои покупки</span>
                  </a>
                  <div className="thumbnail-spec-gym">
                    <div className="thumbnail-spec-gym__image">
                      <picture>
                        <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                        <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                      </picture>
                    </div>
                    <div className="thumbnail-spec-gym__header">
                      <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </main >
  );
}

export default AccountScreen;