import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { UserAuth } from "../../types/user/user";
import { loginAction } from "../../store/user/thunks";
import { getAuthorizationStatus } from "../../store/user/selectors";
import { useNavigate } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../constant";

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;

    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data = Object.fromEntries(formData);
    dispatch(loginAction(data));    
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main); // Если пользователь авторизован, выполняем редирект
    }
  }, [authorizationStatus, navigate]);

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
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={handleFormSubmit}>
                <div className="sign-in">
                  <div className="custom-input sign-in__input">
                    <label><span className="custom-input__label">E-mail</span><span className="custom-input__wrapper">
                      <input type="email" name="email" /></span>
                    </label>
                  </div>
                  <div className="custom-input sign-in__input">
                    <label><span className="custom-input__label">Пароль</span><span className="custom-input__wrapper">
                      <input type="password" name="password" /></span>
                    </label>
                  </div>
                  <button className="btn sign-in__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginScreen;