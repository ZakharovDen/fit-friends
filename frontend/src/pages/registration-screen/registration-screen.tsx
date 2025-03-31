import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { registerAction } from "../../store/user/thunks";
import { SexUserLabel } from "../../types/sex.enum";
import { UserLocationLabel } from "../../types/user/user-location.enum";
import { CustomSelect } from "../../components/custom-select/custom-select";

function RegistrationScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>();

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    formData.append('location', String(selectedLocation));
    if (formData.get('birthday')) {
      formData.append('dateOfBirth', String(formData.get('birthday')));
    }
    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }
    try {
    await dispatch(registerAction(formData));
    } catch(error) {
      console.error("Ошибка при редактировании пользователя:", error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files && files[0] ? files[0] : null;

    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(null);
    }
  };

  return (
    <main>
      <div className="background-logo">
        <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
          <use xlinkHref="#logo-big"></use>
        </svg>
        <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
          <use xlinkHref="#icon-logotype"></use>
        </svg>
      </div>
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={handleFormSubmit}>
                <div className="sign-up">
                  <div className="sign-up__load-photo">
                    <div className="input-load-avatar">
                      <label>
                        <input className="visually-hidden" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
                        <span className="input-load-avatar__btn">
                          {previewURL ? (
                            <img className="input-load-avatar__btn" src={previewURL} alt="Предпросмотр фото" />
                          ) : (
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                          )}
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__description">
                      <h2 className="sign-up__legend">Загрузите фото профиля</h2><span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                    </div>
                  </div>
                  <div className="sign-up__data">
                    <div className="custom-input">
                      <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
                        <input type="text" name="name" /></span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label><span className="custom-input__label">E-mail</span><span className="custom-input__wrapper">
                        <input type="email" name="email" /></span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label><span className="custom-input__label">Дата рождения</span><span className="custom-input__wrapper">
                        <input type="date" name="birthday" max="2099-12-31" /></span>
                      </label>
                    </div>
                    <CustomSelect
                      value={selectedLocation}
                      label={'Ваша локация'}
                      options={Object.entries(UserLocationLabel).map(([key, value]) => ({ value: key, label: value }))}
                      onChange={handleLocationSelect}
                    />
                    <div className="custom-input">
                      <label><span className="custom-input__label">Пароль</span><span className="custom-input__wrapper">
                        <input type="password" name="password" autoComplete="off" /></span>
                      </label>
                    </div>
                    <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big">
                        {Object.entries(SexUserLabel).map(([key, value]) => (
                          <div className="custom-toggle-radio__block" key={key}>
                            <label key={key}>
                              <input type="radio" name="sex" value={key} key={key} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">{value}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      <div className="role-btn">
                        <label>
                          <input className="visually-hidden" type="radio" name="role" value="sportsman" checked /><span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-weight"></use>
                            </svg></span><span className="role-btn__btn">Я хочу тренироваться</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="sign-up__checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement" name="user-agreement" checked />
                      <span className="sign-up__checkbox-icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                    </label>
                  </div>
                  <button className="btn sign-up__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegistrationScreen;