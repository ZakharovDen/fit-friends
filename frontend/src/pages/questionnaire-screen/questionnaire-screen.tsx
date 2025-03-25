import { TrainingDuration } from "../../types/training/training-duration.enum";
import { TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingTypeLabel } from "../../types/training/training-type.enum";

function QuestionnaireScreen(): JSX.Element {
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
      <div className="popup-form popup-form--questionnaire-user">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get">
                <div className="questionnaire-user">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-user__wrapper">
                    <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                      <div className="specialization-checkbox questionnaire-user__specializations">

                        {Object.entries(TrainingTypeLabel).map(([key, value]) => (
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="specialisation" value={key} /><span className="btn-checkbox__btn">{value}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                        {Object.entries(TrainingDuration).map(([key, value]) => (
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="time" value={key} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">{`${value} мин`}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                        {Object.entries(TrainingLevelLabel).map(([key, value]) => (
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="level" value={key} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">{value}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="questionnaire-user__block">
                      <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label><span className="custom-input__wrapper">
                            <input type="number" name="calories-lose" /><span className="custom-input__text">ккал</span></span>
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label><span className="custom-input__wrapper">
                            <input type="number" name="calories-waste" /><span className="custom-input__text">ккал</span></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default QuestionnaireScreen;