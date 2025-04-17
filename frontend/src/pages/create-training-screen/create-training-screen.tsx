import { ChangeEvent, FormEvent, useState } from "react";
import { CustomSelect } from "../../components/custom-select/custom-select";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingCrateData } from "../../types/training/training";
import { TrainingDuration } from "../../types/training/training-duration.enum";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { Sex, SexCreateTrainingLabel } from "../../types/sex.enum";
import { useAppDispatch } from "../../hooks";
import { postTrainingAction } from "../../store/training/thunks";

function isLevel(value: string): value is TrainingLevel {
  return Object.values(TrainingLevel).includes(value as TrainingLevel);
}

function isDuration(value: string): value is TrainingDuration {
  return Object.values(TrainingDuration).includes(value as TrainingDuration);
}

function isType(value: string): value is TrainingType {
  return Object.values(TrainingType).includes(value as TrainingType);
}

function isSex(value: string): value is Sex {
  return Object.values(Sex).includes(value as Sex);
}

function CreateTrainingScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [trainingData, setTrainingData] = useState<TrainingCrateData>({ sex: Sex.Any });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLevelSelect = (level: string) => {
    if (isLevel(level)) {
      setTrainingData({ ...trainingData, level });
    }
  }

  const handleDurationSelect = (duration: string) => {
    if (isDuration(duration)) {
      setTrainingData({ ...trainingData, duration });
    }
  }

  const handleTypeSelect = (type: string) => {
    if (isType(type)) {
      setTrainingData({ ...trainingData, type });
    }
  }

  const handleSexSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = evt.target;
    if (!checked) {
      return;
    }
    if (isSex(value)) {
      setTrainingData({ ...trainingData, sex: value });
    }
  }

  const handleChangeDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setTrainingData({ ...trainingData, description: value })
  }

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    formData.append('title', String(formData.get('training-name')));
    formData.append('sex', String(formData.get('gender')));
    formData.append('level', String(trainingData.level));
    formData.append('type', String(trainingData.type));
    formData.append('duration', String(trainingData.duration));
    if (selectedFile) {
      formData.append('video', selectedFile);
    }
    await dispatch(postTrainingAction(formData));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files && files[0] ? files[0] : null;
    setSelectedFile(file);
  };

  return (
    <main>
      <div className="popup-form popup-form--create-training">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Создание тренировки</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={handleFormSubmit}>
                <div className="create-training">
                  <div className="create-training__wrapper">
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Название тренировки</h2>
                      <div className="custom-input create-training__input">
                        <label><span className="custom-input__wrapper">
                          <input type="text" name="training-name" /></span>
                        </label>
                      </div>
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Характеристики тренировки</h2>
                      <div className="create-training__info">
                        <CustomSelect
                          value={trainingData?.type}
                          label={'Выберите тип тренировки'}
                          options={Object.entries(TrainingTypeLabel).map(([key, value]) => ({ value: key, label: value }))}
                          onChange={handleTypeSelect}
                        />
                        <div className="custom-input custom-input--with-text-right">
                          <label><span className="custom-input__label">Сколько калорий потратим</span><span className="custom-input__wrapper">
                            <input type="number" name="calories" /><span className="custom-input__text">ккал</span></span>
                          </label>
                        </div>
                        <CustomSelect
                          value={trainingData?.duration}
                          label={'Сколько времени потратим'}
                          options={Object.entries(TrainingDuration).map(([key, value]) => ({ value: key, label: value }))}
                          onChange={handleDurationSelect}
                        />
                        <div className="custom-input custom-input--with-text-right">
                          <label><span className="custom-input__label">Стоимость тренировки</span><span className="custom-input__wrapper">
                            <input type="number" name="price" /><span className="custom-input__text">₽</span></span>
                          </label>
                        </div>
                        <CustomSelect
                          value={trainingData?.level}
                          label={'Выберите уровень тренировки'}
                          options={Object.entries(TrainingLevelLabel).map(([key, value]) => ({ value: key, label: value }))}
                          onChange={handleLevelSelect}
                        />
                        <div className="create-training__radio-wrapper"><span className="create-training__label">Кому подойдет тренировка</span>
                          <br />
                          <div className="custom-toggle-radio create-training__radio">
                            {Object.entries(SexCreateTrainingLabel).map(([key, value]) => (
                              <div className="custom-toggle-radio__block" key={key}>
                                <label key={key}>
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={key}
                                    key={key}
                                    onChange={handleSexSelect}
                                    checked={key === trainingData.sex}
                                  />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">{value}</span>
                                </label>
                              </div>)
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Описание тренировки</h2>
                      <div className="custom-textarea create-training__textarea">
                        <label>
                          <textarea name="description" placeholder=" " value={trainingData.description} onChange={handleChangeDescription}></textarea>
                        </label>
                      </div>
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                      <div className="drag-and-drop create-training__drag-and-drop">
                        <label><span className="drag-and-drop__label" tabIndex={0}>
                          {selectedFile
                            ? `Выбран файл: ${selectedFile.name}`
                            : 'Загрузите сюда файлы формата MOV, AVI или MP4'}
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import-video"></use>
                          </svg></span>
                          <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn create-training__button" type="submit">Опубликовать</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateTrainingScreen;