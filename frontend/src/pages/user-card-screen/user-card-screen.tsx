import { useParams } from 'react-router-dom';
import BackButton from '../../components/back-button/back-button';
import { BackButtonDisplayMode } from '../../components/back-button/constant';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserInfoAction } from '../../store/user/thunks';
import { getUser, getUserInfo } from '../../store/user/selectors';
import { UserLocationLabel } from '../../types/user/user-location.enum';
import { TrainingType, TrainingTypeLabel } from '../../types/training/training-type.enum';
import { fetchTrainingsAction } from '../../store/training/thunks';
import { getTrainings } from '../../store/training/selectors';
import TrainingSlider from '../../components/training-slider/training-slider';
import { TrainingSliderDisplayMode } from '../../components/training-slider/constant';
import { TrainingItemDisplayMode } from '../../components/training-item/constant';
import { UserRole } from '../../types/user/user-role.enum';
import { addFriendAction, deleteFriendAction, postRequestAction } from '../../store/friends/thunks';

function UserCardScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      dispatch(getUserInfoAction(id));
      dispatch(fetchTrainingsAction({
        userId: id,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      }));
    }
  }, [params, dispatch, id]);
  const userInfo = useAppSelector(getUserInfo);
  const { entities } = useAppSelector(getTrainings);
  const user = useAppSelector(getUser);

  const handleAddFriend = () => {
    if (id) {
      dispatch(addFriendAction({ friendId: id }));
    }
  };

  const handleDeleteFriend = () => {
    if (id) {
      dispatch(deleteFriendAction({ friendId: id }));
    }
  };
  const isFriend = (user?.friends && id && user.friends.includes(id));
  const friendButton = isFriend
    ? (
      <button
        className="btn btn--outlined user-card-coach-2__btn"
        type="button"
        onClick={handleDeleteFriend}
      >
      Удалить из друзей
      </button>
    )
    : (
      <button
        className={'btn user-card-coach__btn'}
        type="button"
        onClick={handleAddFriend}
      >
        Добавить в друзья
      </button>
    );

  const classSuffix = '-coach';
  const coachStatus = (
    <>
      <div className={`user-card${classSuffix}__status user-card${classSuffix}__status--tag`}>
        <svg className={`user-card${classSuffix}__icon-cup`} width="12" height="13" aria-hidden="true">
          <use xlinkHref="#icon-cup"></use>
        </svg><span>Тренер</span>
      </div>
      {(userInfo?.questionnaire?.isReady)
        ? <div className={'user-card-coach__status user-card-coach__status--check'}><span>Готов тренировать</span></div>
        : <div className={'user-card-coach-2__status user-card-coach-2__status--check'}><span>Не готов тренировать</span></div>}
    </>
  );
  const sportsmanStatus = userInfo?.questionnaire?.isReady
    ? <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к тренировке</span></div>
    : <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не готов к тренировке</span></div>;

  const handleCreateRequest = () => {
    if (!id) {
      return;
    }
    dispatch(postRequestAction({
      userId: id
    }));
  };

  return (
    <main>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <BackButton displayMode={BackButtonDisplayMode.User} />
            <div className="inner-page__content">
              <section className={'user-card'}>
                <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                <div className={`user-card${classSuffix}__wrapper`}>
                  <div className={`user-card${classSuffix}__card`}>
                    <div className={`user-card${classSuffix}__content`}>
                      <div className={`user-card${classSuffix}__head`}>
                        <h2 className={`user-card${classSuffix}__title`}>{userInfo?.name}</h2>
                      </div>
                      <div className={`user-card${classSuffix}__label`}>
                        <a href="popup-user-map.html">
                          <svg className={`user-card${classSuffix}__icon-location`} width="12" height="14" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg><span>{userInfo?.location && UserLocationLabel[userInfo?.location]}</span>
                        </a>
                      </div>
                      <div className={`user-card${classSuffix}__status-container`}>
                        {(userInfo?.role === UserRole.Coach) ? coachStatus : sportsmanStatus}
                      </div>
                      <div className={`user-card${classSuffix}__text`}>
                        {userInfo?.description}
                      </div>
                      {(userInfo?.role === UserRole.Coach) &&
                        <button className="btn-flat user-card-coach__sertificate" type="button">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-teacher"></use>
                          </svg><span>Посмотреть сертификаты</span>
                        </button>}
                      <ul className={`user-card${classSuffix}__hashtag-list`}>
                        {Object.entries(TrainingTypeLabel)
                          .map(([key, value]) => {
                            if (userInfo?.questionnaire?.types.includes(key as TrainingType)) {
                              return (
                                <li className={`user-card${classSuffix}__hashtag-item`} key={key}>
                                  <div className="hashtag"><span>{`#${value.toLowerCase()}`}</span></div>
                                </li>
                              );
                            }
                          })}
                      </ul>
                      {friendButton}
                    </div>
                    <div className={`user-card${classSuffix}__gallary`}>
                      <ul className={`user-card${classSuffix}__gallary-list`}>
                        <li className={`user-card${classSuffix}__gallary-item`}>
                          <img
                            src="img/content/user-coach-photo1.jpg"
                            srcSet="img/content/user-coach-photo1@2x.jpg 2x"
                            width="334"
                            height="573"
                            alt="photo1"
                          />
                        </li>
                        <li className={`user-card${classSuffix}__gallary-item`}>
                          <img
                            src="img/content/user-coach-photo2.jpg"
                            srcSet="img/content/user-coach-photo2@2x.jpg 2x"
                            width="334"
                            height="573"
                            alt="photo2"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  {(userInfo?.role === UserRole.Coach) &&
                    <TrainingSlider
                      trainings={entities}
                      trainingSliderDisplayMode={TrainingSliderDisplayMode.UserCardCoach}
                      trainingItemDisplayMode={TrainingItemDisplayMode.UserCardCoach}
                    />}
                  {(userInfo?.role === UserRole.Coach) &&
                    <form className="user-card-coach__training-form">
                      <button
                        className={`btn user-card-coach__btn-training ${(!isFriend || !userInfo?.questionnaire?.isReady) ? 'is-disabled' : ''}`}
                        type="button"
                        onClick={handleCreateRequest}
                      >
                        Хочу персональную тренировку
                      </button>
                      <div className="user-card-coach__training-check">
                        <div className="custom-toggle custom-toggle--checkbox">
                        </div>
                      </div>
                    </form>}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserCardScreen;
