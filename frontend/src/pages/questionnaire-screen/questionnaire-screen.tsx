import { FormEvent, useEffect, useState } from "react";
import { TrainingDuration } from "../../types/training/training-duration.enum";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { Questionnaire } from "../../types/user/user";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addQuestionnaireAction } from "../../store/user/thunks";
import { getIsProcess, getIsQuestionnaireCompleted, getIsSuccess } from "../../store/user/selectors";
import { AppRoute } from "../../constant";
import { useNavigate } from "react-router-dom";

const DefaultCaloriesValues = {
  min: 1000,
  max: 5000,
}

const defaultQuestionnaire: Questionnaire = {
  types: [],
  caloriesByDay: DefaultCaloriesValues.min,
  caloriesTotal: DefaultCaloriesValues.max,
  duration: TrainingDuration["10-30"],
  isReady: true,
  level: TrainingLevel.Beginner,
}

function QuestionnaireScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const isProcess = useAppSelector(getIsProcess);
  const isSuccess = useAppSelector(getIsSuccess);
  const isQuestionnaireCompleted = useAppSelector(getIsQuestionnaireCompleted);
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>(defaultQuestionnaire);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setQuestionnaire({ ...questionnaire, types: [...questionnaire.types, value as TrainingType] });
    } else {
      setQuestionnaire({ ...questionnaire, types: questionnaire.types.filter((type) => type !== value) });
    }
  }

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setQuestionnaire({ ...questionnaire, duration: value as TrainingDuration });
    }
  }

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setQuestionnaire({ ...questionnaire, level: value as TrainingLevel });
    }
  }

  const handleCaloriesByDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    setQuestionnaire({ ...questionnaire, caloriesByDay: value });
  }

  const handleCaloriesTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    setQuestionnaire({ ...questionnaire, caloriesTotal: value });
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addQuestionnaireAction(questionnaire));
  }

  useEffect(() => {
    if (isSuccess && !isProcess && isQuestionnaireCompleted) {
      navigate(AppRoute.Main);
    }
  }, [isSuccess, isProcess]);

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
              <form method="get" onSubmit={handleFormSubmit}>
                <div className="questionnaire-user">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-user__wrapper">
                    <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                      <div className="specialization-checkbox questionnaire-user__specializations">
                        {Object.entries(TrainingTypeLabel).map(([key, value]) => (
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value={key}
                                onChange={handleTypeChange}
                                checked={questionnaire.types.includes(key as TrainingType)}
                              /><span className="btn-checkbox__btn">{value}</span>
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
                              <input
                                type="radio"
                                name="time"
                                value={key}
                                checked={questionnaire.duration === key}
                                onChange={handleDurationChange}
                                key={key}
                              />
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
                              <input
                                type="radio"
                                name="level"
                                value={key}
                                key={key}
                                onChange={handleLevelChange}
                                checked={questionnaire.level === key}
                              />
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
                            <input
                              type="number"
                              name="calories-lose"
                              value={questionnaire.caloriesTotal}
                              onChange={handleCaloriesTotal}
                            /><span className="custom-input__text">ккал</span></span>
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label><span className="custom-input__wrapper">
                            <input
                              type="number"
                              name="calories-waste"
                              onChange={handleCaloriesByDay}
                              value={questionnaire.caloriesByDay}
                            /><span className="custom-input__text">ккал</span></span>
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