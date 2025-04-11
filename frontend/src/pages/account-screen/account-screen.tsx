import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getIsProcess, getIsSuccess, getUser } from "../../store/user/selectors";
import { UserLocation, UserLocationLabel } from "../../types/user/user-location.enum";
import { CustomSelect } from "../../components/custom-select/custom-select";
import { Sex, SexUserLabel } from "../../types/sex.enum";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { editUserAction } from "../../store/user/thunks";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import { User } from "../../types/user/user";
import { Link } from "react-router-dom";
import { AppRoute } from "../../constant";

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
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const isProcess = useAppSelector(getIsProcess);
  const isSuccess = useAppSelector(getIsSuccess);

  if (!user) {
    return <NotFoundScreen />
  }

  const [userData, setUserData] = useState<User>(user);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  useEffect(() => {
    setUserData(user);
  }, [user])

  const handleChangeIsReady = () => {
    if (!isEdited || !userData.questionnaire) {
      return;
    }
    setUserData({...userData, questionnaire: {...userData.questionnaire, isReady: (userData.questionnaire?.isReady) ? false : true}});
  }

  const handleChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, name: evt.target.value});
  }

  const handleChangeDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserData({...userData, description: evt.target.value});
  }

  const handleLocationSelect = (location: string) => {
    if (isLocation(location)) {
      setUserData({...userData, location: location});
    }
  };

  const handleSexSelect = (sex: string) => {
    if (isSex(sex)) {
      setUserData({...userData, sex: sex});
    }
  }

  const handleLevelSelect = (level: string) => {
    if (!isEdited || !userData.questionnaire) {
      return;
    }
    if (isLevel(level)) {
      setUserData({...userData, questionnaire: {...userData.questionnaire, level: level}});
    }
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (!isEdited || !userData.questionnaire) {
      return;
    }
    if (checked) {
      setUserData({...userData, questionnaire: {...userData.questionnaire, types: [...userData.questionnaire.types, value as TrainingType]}});
    } else {
      setUserData({...userData, questionnaire: {...userData.questionnaire, types: userData.questionnaire.types.filter((type) => type !== value)}});
    }
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(editUserAction(userData));
  }

  useEffect(() => {
    if (isSuccess && !isProcess) {
      setIsEdited(false);
    }
  }, [isSuccess, isProcess]);

  const handleEditForm = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setIsEdited(true);
  }

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
              <form className="user-info__form" method="post" onSubmit={handleFormSubmit}>
                {(isEdited)
                  ? (<button className="btn-flat btn-flat--underlined user-info-edit__save-button" type="submit" aria-label="Сохранить">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg><span>Сохранить</span>
                  </button>)
                  : (<button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label="Редактировать" onClick={handleEditForm}>
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg><span>Редактировать</span>
                  </button>
                  )}
                <div className="user-info__section">
                  <h2 className="user-info__title">Обо мне</h2>
                  <div className="custom-input custom-input--readonly user-info__input">
                    <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        disabled={!isEdited}
                        onChange={handleChangeName}
                      /></span>
                    </label>
                  </div>
                  <div className="custom-textarea custom-textarea--readonly user-info__textarea">
                    <label><span className="custom-textarea__label">Описание</span>
                      <textarea name="description" placeholder=" " disabled={!isEdited} onChange={handleChangeDescription}>
                        {userData.description}
                      </textarea>
                    </label>
                  </div>
                </div>
                <div className="user-info__section user-info__section--status">
                  <h2 className="user-info__title user-info__title--status">Статус</h2>
                  <div className="custom-toggle custom-toggle--switch user-info__toggle">
                    <label>
                      <input type="checkbox" name="ready-for-training" 
                        checked={userData.questionnaire?.isReady} 
                        onChange={handleChangeIsReady} 
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">Готов к тренировке</span>
                    </label>
                  </div>
                </div>
                <div className="user-info__section">
                  <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
                  <div className="specialization-checkbox user-info__specialization">
                    {Object.entries(TrainingTypeLabel).map(([key, value]) => (
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value={key}
                            checked={userData.questionnaire?.types.includes(key as TrainingType)}
                            onChange={handleTypeChange}
                            key={key}
                          />
                          <span className="btn-checkbox__btn">{value}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <CustomSelect
                  value={userData.location}
                  label={'Локация'}
                  readonly={!isEdited}
                  options={Object.entries(UserLocationLabel).map(([key, value]) => ({ value: key, label: value }))}
                  onChange={handleLocationSelect}
                  className={'user-info__select'}
                />
                <CustomSelect
                  value={userData.sex}
                  label={'Пол'}
                  readonly={!isEdited}
                  options={Object.entries(SexUserLabel).map(([key, value]) => ({ value: key, label: value }))}
                  onChange={handleSexSelect}
                  className={'user-info__select'}
                />
                <CustomSelect
                  value={userData.questionnaire?.level}
                  label={'Уровень'}
                  readonly={!isEdited}
                  options={Object.entries(TrainingLevelLabel).map(([key, value]) => ({ value: key, label: value }))}
                  onChange={handleLevelSelect}
                  className={'user-info__select'}
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
                  <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyPurchases}>
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-shopping-cart"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Мои покупки</span>
                  </Link>
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