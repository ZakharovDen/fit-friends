import { useEffect, useRef, useState } from "react";
import PopupFeedback from "../../components/popup-feedback/popup-feedback";
import ReviewItem from "../../components/review-item/review-item";
import PopupBuy from "../../components/popup-buy/popup-buy";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTrainingInfo, getTrainingSaveIsProcess, getTrainingSaveIsSuccess } from "../../store/training/selectors";
import { getTrainingAction, patchTrainingAction } from "../../store/training/thunks";
import { TrainingTypeLabel } from "../../types/training/training-type.enum";
import { SexTrainingLabel } from "../../types/sex.enum";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import { getFeedbacks } from "../../store/feedback/selectors";
import { getFeedbacksAction } from "../../store/feedback/thunks";
import BackButton from "../../components/back-button/back-button";
import { BackButtonDisplayMode } from "../../components/back-button/constant";
import { getUser } from "../../store/user/selectors";
import { UserRole } from "../../types/user/user-role.enum";
import { TrainingUpdateData } from "../../types/training/training";
import { AppRoute } from "../../constant";

const DISCOUNT_PERCENT = 10;

const setDiscount = (price: number | undefined, isSpecialOffer: boolean) => {
  if (price) {
    if (isSpecialOffer) {
      return price - (price * DISCOUNT_PERCENT / 100);
    } else {
      return price * 100 / (100 - DISCOUNT_PERCENT);
    }
  }
}

function TrainingCardScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(getTrainingAction(id));
      dispatch(getFeedbacksAction(id));
    }
  }, [params, dispatch]);
  const training = useAppSelector(getTrainingInfo);
  const user = useAppSelector(getUser);
  const feedbacks = useAppSelector(getFeedbacks);
  const [isPopupFeedbackVisible, setPopupFeedbackVisible] = useState<boolean>(false);
  const [isPopupBuyVisible, setPopupBuyVisible] = useState<boolean>(false);
  const [hashTags, setHashTags] = useState<string[]>();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [trainingData, setTrainingData] = useState<TrainingUpdateData>({
    description: training?.description,
    price: training?.price,
    title: training?.title,
    specialOffer: training?.specialOffer
  });
  const authorMode = (user?.role === UserRole.Coach && training?.user.id === user.id);
  const isProcess = useAppSelector(getTrainingSaveIsProcess);
  const isSuccess = useAppSelector(getTrainingSaveIsSuccess);

  useEffect(() => {
    if (training) {
      setHashTags([
        TrainingTypeLabel[training?.type].toLowerCase(),
        SexTrainingLabel[training?.sex].replace(' ', '_'),
        `${training?.calories}ккал`,
        `${training?.duration.replace('-', '_')}минут`
      ]);
      setTrainingData({
        description: training.description,
        price: training.price,
        title: training.title,
        specialOffer: training.specialOffer,
      });
    }
  }, [training]);

  const openPopupFeedback = () => setPopupFeedbackVisible(true);
  const closePopupFeedback = () => setPopupFeedbackVisible(false);

  const openPopupBuy = () => setPopupBuyVisible(true);
  const closePopupBuy = () => setPopupBuyVisible(false);

  const handleEditForm = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setIsEdited(true);
  }

  const handleTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTrainingData({ ...trainingData, title: evt.target.value });
  }

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTrainingData({ ...trainingData, description: evt.target.value });
  }

  const handlePriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value.replace(' ₽', ''));
    if (typeof (price) === 'number') {
      setTrainingData({ ...trainingData, price: price });
    }
  }

  useEffect(() => {
    if (isSuccess && !isProcess) {
      setIsEdited(false);
    }
  }, [isSuccess, isProcess]);

  const handleSaveForm = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    dispatch(patchTrainingAction({ ...trainingData, id: training?.id }));
  }

  const handleDiscountButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setTrainingData({ ...trainingData, specialOffer: !trainingData.specialOffer, price: setDiscount(trainingData.price, !trainingData.specialOffer) });
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!training) {
    return <NotFoundScreen />
  }

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <aside className="reviews-side-bar">
              <BackButton displayMode={BackButtonDisplayMode.Training} />
              <h2 className="reviews-side-bar__title">Отзывы</h2>
              <ul className="reviews-side-bar__list">
                {(feedbacks.length) && feedbacks.map((feedback) => <ReviewItem feedback={feedback} key={feedback.id} />)}
              </ul>
              <button
                className="btn btn--medium reviews-side-bar__button"
                type="button"
                onClick={openPopupFeedback}
                disabled={authorMode}
              >
                Оставить отзыв
              </button>
              <PopupFeedback isVisible={isPopupFeedbackVisible} onClose={closePopupFeedback} trainingId={training.id} />
            </aside>
            <div className={`training-card ${isEdited && 'training-card--edit'}`}>
              <div className="training-info">
                <h2 className="visually-hidden">Информация о тренировке</h2>
                <div className="training-info__header">
                  <Link to={AppRoute.UserCard.replace(':id', training.user.id)} >
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={training?.user.avatar}
                          />
                          <img
                            src={training?.user.avatar}
                            srcSet={training?.user.avatar}
                            width="64"
                            height="64"
                            alt="Изображение тренера"
                          />
                        </picture>
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">{`Тренер`}</span>
                        <span className="training-info__name">{training?.user.name}</span>
                      </div>
                    </div>
                  </Link>
                  {(authorMode) &&
                    <>
                      <button className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save" type="button" onClick={handleSaveForm}>
                        <svg width="12" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-edit"></use>
                        </svg><span>Сохранить</span>
                      </button>
                      <button className="btn-flat btn-flat--light training-info__edit training-info__edit--edit" type="button" onClick={handleEditForm}>
                        <svg width="12" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-edit"></use>
                        </svg><span>Редактировать</span>
                      </button>
                    </>
                  }
                </div>
                <div className="training-info__main-content">
                  <form action="#" method="get">
                    <div className="training-info__form-wrapper">
                      <div className="training-info__info-wrapper">
                        <div className="training-info__input training-info__input--training">
                          <label><span className="training-info__label">Название тренировки</span>
                            <input type="text" name="training" value={trainingData.title} disabled={!isEdited} onChange={handleTitleChange} />
                          </label>
                          <div className="training-info__error">Обязательное поле</div>
                        </div>
                        <div className="training-info__textarea">
                          <label><span className="training-info__label">Описание тренировки</span>
                            <textarea name="description" disabled={!isEdited} onChange={handleDescriptionChange} value={trainingData.description}></textarea>
                          </label>
                        </div>
                      </div>
                      <div className="training-info__rating-wrapper">
                        <div className="training-info__input training-info__input--rating">
                          <label><span className="training-info__label">Рейтинг</span><span className="training-info__rating-icon">
                            <svg width="18" height="18" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg></span>
                            <input type="number" name="rating" value={training?.rating} disabled />
                          </label>
                        </div>
                        <ul className="training-info__list">
                          {(hashTags) &&
                            hashTags
                              .map((item) =>
                              (<li className="training-info__item" key={item}>
                                <div className="hashtag hashtag--white">
                                  <span>{`#${item}`}</span>
                                </div>
                              </li>)
                              )
                          }
                        </ul>
                      </div>
                      <div className="training-info__price-wrapper">
                        <div className="training-info__input training-info__input--price">
                          <label><span className="training-info__label">Стоимость</span>
                            <input type="text" name="price" value={`${trainingData.price} ₽`} onChange={handlePriceChange} disabled={!isEdited} />
                          </label>
                          <div className="training-info__error">Введите число</div>
                        </div>
                        {(authorMode)
                          ? <button
                            className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                            type="button"
                            onClick={handleDiscountButtonClick}
                          >
                            <svg width="14" height="14" aria-hidden="true">
                              <use xlinkHref="#icon-discount"></use>
                            </svg><span>{(trainingData.specialOffer) ? `Отменить скидку` : `Сделать скидку ${DISCOUNT_PERCENT}%`}</span>
                          </button>
                          : <button className="btn training-info__buy" type="button" onClick={openPopupBuy}>Купить</button>}
                        <PopupBuy isVisible={isPopupBuyVisible} onClose={closePopupBuy} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-video">
                <h2 className="training-video__title">Видео</h2>
                {training.video ? (
                  <div className="training-video__video">
                    <video
                      src={training.video}
                      ref={videoRef}
                      controls
                      width="922"
                      height="566"
                      onPause={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                    >
                      Your browser does not support the video tag.
                    </video>
                    {!isPlaying &&
                      <button
                        className="training-video__play-button btn-reset"
                        onClick={handlePlayPause}
                        aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
                      >
                        <svg width="18" height="30" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                    }
                  </div>
                ) : (
                  <div className="training-video__video">
                    <div className="training-video__thumbnail">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"
                        />
                        <img
                          src="img/content/training-video/video-thumbnail.png"
                          srcSet="img/content/training-video/video-thumbnail@2x.png 2x"
                          width="922"
                          height="566"
                          alt="Обложка видео"
                        />
                      </picture>
                    </div>
                  </div>
                )}
                {(authorMode)
                  ? <>
                    <div className="training-video__drop-files">
                      <form action="#" method="post">
                        <div className="training-video__form-wrapper">
                          <div className="drag-and-drop">
                            <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg></span>
                              <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="training-video__buttons-wrapper">
                      <div className="training-video__edit-buttons">
                        <button className="btn" type="button">Сохранить</button>
                        <button className="btn btn--outlined" type="button">Удалить</button>
                      </div>
                    </div>
                  </>
                  : <div className="training-video__buttons-wrapper">
                    <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
                    <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TrainingCardScreen;