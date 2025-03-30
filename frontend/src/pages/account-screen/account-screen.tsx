import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUser } from "../../store/user/selectors";
import { UserLocation, UserLocationLabel } from "../../types/user/user-location.enum";
import { CustomSelect } from "../../components/custom-select/custom-select";
import { Sex, SexUserLabel } from "../../types/sex.enum";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { editUserAction } from "../../store/user/thunks";

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
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [location, setLocation] = useState<string | undefined>(user?.location);
  const [sex, setSex] = useState<string | undefined>(user?.sex);
  const [level, setLevel] = useState<string | undefined>(user?.questionnaire?.level);
  const [types, setTypes] = useState<string[]>(user?.questionnaire?.types ?? []);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [description, setDescription] = useState<string | undefined>(user?.description);
  const [isReady, setIsReady] = useState<boolean | undefined>(user?.questionnaire?.isReady);

  useEffect(() => {
    setSex(user?.sex);
    setLevel(user?.questionnaire?.level);
    setLocation(user?.location);
    setName(user?.name);
  }, [user])

  const handleChangeIsReady = () => {
    if (!isEdited) {
      return;
    }
    setIsReady(!isReady);
  }

  const handleChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  }

  const handleChangeDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  }

  const handleLocationSelect = (location: string) => {
    if (isLocation(location)) {
      setLocation(location);
    }
  };

  const handleSexSelect = (sex: string) => {
    if (isSex(sex)) {
      setSex(sex);
    }
  }

  const handleLevelSelect = (level: string) => {
    if (isLevel(level)) {
      setLevel(level);
    }
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (!isEdited) {
      return;
    }
    if (checked) {
      setTypes([...types, value as TrainingType]);
    } else {
      setTypes(types.filter((type) => type !== value));
    }
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    console.log('submit');
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    console.dir(formData);
    // formData.append('location', String(selectedLocation));
    // formData.append('dateOfBirth', String(formData.get('birthday')));
    // if (selectedFile) {
    //   formData.append('avatar', selectedFile);
    // }
    dispatch(editUserAction(formData));
    setIsEdited(false);
  }

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
                        value={name}
                        disabled={!isEdited}
                        onChange={handleChangeName}
                      /></span>
                    </label>
                  </div>
                  <div className="custom-textarea custom-textarea--readonly user-info__textarea">
                    <label><span className="custom-textarea__label">Описание</span>
                      <textarea name="description" placeholder=" " disabled={!isEdited} onChange={handleChangeDescription}>
                        {description}
                      </textarea>
                    </label>
                  </div>
                </div>
                <div className="user-info__section user-info__section--status">
                  <h2 className="user-info__title user-info__title--status">Статус</h2>
                  <div className="custom-toggle custom-toggle--switch user-info__toggle">
                    <label>
                      <input type="checkbox" name="ready-for-training" checked={isReady} onChange={handleChangeIsReady} /><span className="custom-toggle__icon">
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
                            checked={types.includes(key as TrainingType)}
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
                  value={location}
                  label={'Локация'}
                  readonly={!isEdited}
                  options={Object.entries(UserLocationLabel).map(([key, value]) => ({ value: key, label: value }))}
                  onChange={handleLocationSelect}
                //placeholder={sex} 
                />
                <CustomSelect
                  value={sex}
                  label={'Пол'}
                  readonly={!isEdited}
                  options={Object.entries(SexUserLabel).map(([key, value]) => ({ value: key, label: value }))}
                  onChange={handleSexSelect}
                //placeholder={sex} 
                />
                <CustomSelect
                  value={level}
                  label={'Уровень'}
                  readonly={!isEdited}
                  options={Object.entries(TrainingLevelLabel).map(([key, value]) => ({ value: key, label: value }))}
                  onChange={handleLevelSelect}
                //placeholder={sex} 
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