import { useState, FormEvent, useEffect } from "react";
import { editUserAction } from "../../store/user/thunks";
import { Sex, SexUserLabel } from "../../types/sex.enum";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingTypeLabel, TrainingType } from "../../types/training/training-type.enum";
import { User, UserUpdate } from "../../types/user/user";
import { UserLocation, UserLocationLabel } from "../../types/user/user-location.enum";
import { CustomSelect } from "../custom-select/custom-select";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getIsProcess, getIsSuccess } from "../../store/user/selectors";
import { UserRole } from "../../types/user/user-role.enum";

function isSex(value: string): value is Sex {
  return Object.values(Sex).includes(value as Sex);
}

function isLocation(value: string): value is UserLocation {
  return Object.values(UserLocation).includes(value as UserLocation);
}

function isLevel(value: string): value is TrainingLevel {
  return Object.values(TrainingLevel).includes(value as TrainingLevel);
}

type UserInfoProps = {
  user: User
}

function UserInfo({ user }: UserInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<UserUpdate>({
    name: user.name,
    location: user.location,
    sex: user.sex,
    description: user.description,
    avatar: user.avatar,
    questionnaire: user.questionnaire
  });
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const isProcess = useAppSelector(getIsProcess);
  const isSuccess = useAppSelector(getIsSuccess);

  useEffect(() => {
    if (isSuccess && !isProcess) {
      setIsEdited(false);
    }
  }, [isSuccess, isProcess]);

  const handleChangeIsReady = () => {
    if (!isEdited || !userData.questionnaire) {
      return;
    }
    setUserData({ ...userData, questionnaire: { ...userData.questionnaire, isReady: (userData.questionnaire?.isReady) ? false : true } });
  }

  const handleChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, name: evt.target.value });
  }

  const handleChangeDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserData({ ...userData, description: evt.target.value });
  }

  const handleLocationSelect = (location: string) => {
    if (isLocation(location)) {
      setUserData({ ...userData, location: location });
    }
  };

  const handleSexSelect = (sex: string) => {
    if (isSex(sex)) {
      setUserData({ ...userData, sex: sex });
    }
  }

  const handleLevelSelect = (level: string) => {
    if (!isEdited || !userData.questionnaire) {
      return;
    }
    if (isLevel(level)) {
      setUserData({ ...userData, questionnaire: { ...userData.questionnaire, level: level } });
    }
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (!isEdited || !userData.questionnaire) {
      return;
    }
    if (checked) {
      setUserData({ ...userData, questionnaire: { ...userData.questionnaire, types: [...userData.questionnaire.types, value as TrainingType] } });
    } else {
      setUserData({ ...userData, questionnaire: { ...userData.questionnaire, types: userData.questionnaire.types.filter((type) => type !== value) } });
    }
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(editUserAction(userData));
  }

  const handleEditForm = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setIsEdited(true);
  }

  return (
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
                </svg></span>
                <span className="custom-toggle__label">
                  {(user.role === UserRole.Coach) ? `Готов тренировать` : `Готов к тренировке`}
                </span>
            </label>
          </div>
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info__specialization">
            {Object.entries(TrainingTypeLabel).map(([key, value]) => (
              <div className="btn-checkbox" key={key}>
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
  );
}

export default UserInfo;