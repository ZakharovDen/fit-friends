import { Link } from "react-router-dom";
import { TrainingTypeLabel } from "../../types/training/training-type.enum";
import { UserLocationLabel } from "../../types/user/user-location.enum";
import { AppRoute } from "../../constant";
import { UserRole } from "../../types/user/user-role.enum";
import { Friend } from "../../types/friend/friend";
import { RequestStatus } from "../../types/friend/request-status.enum";
import { useAppDispatch } from "../../hooks";
import { patchRequestAction, postRequestAction } from "../../store/friends/thunks";

type FriendsListItemProps = {
  friend: Friend;
  userRole: UserRole | undefined;
}

function FriendsListItem({ friend, userRole }: FriendsListItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { avatar, name, id, location, questionnaire, request } = friend;
  const { incoming, outgoing } = request;
  const handleAcceptRequest = (status: RequestStatus) => {
    if (!incoming.id) {
      return;
    }
    dispatch(patchRequestAction({
      id: incoming.id,
      status
    }));
  }
  const handleCreateRequest = () => {
    dispatch(postRequestAction({
      userId: id
    }));
  }
  const trainingCaption = (userRole === UserRole.Coach)
    ? 'Запрос на персональную тренировку'
    : 'Запрос на совместную тренировку';
  let requestElement: JSX.Element = <></>;
  if (incoming.status === RequestStatus.pending) {
    requestElement =
      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
        <p className="thumbnail-friend__request-text">{trainingCaption}</p>
        <div className="thumbnail-friend__button-wrapper">
          <button
            className="btn btn--medium btn--dark-bg thumbnail-friend__button"
            type="button"
            onClick={() => handleAcceptRequest(RequestStatus.accepted)}
          >
            Принять
          </button>
          <button
            className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
            type="button"
            onClick={() => handleAcceptRequest(RequestStatus.rejected)}
          >
            Отклонить
          </button>
        </div>
      </div>;
  } else if (outgoing.status === RequestStatus.pending) {
    requestElement =
      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
        <p className="thumbnail-friend__request-text">{`${trainingCaption} отправлен`}</p>
      </div>;
  } else if (outgoing.status === RequestStatus.accepted || incoming.status === RequestStatus.accepted) {
    requestElement =
      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
        <p className="thumbnail-friend__request-text">{`${trainingCaption} принят`}</p>
      </div>;
  } else if (outgoing.status === RequestStatus.rejected || incoming.status === RequestStatus.rejected) {
    requestElement =
      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
        <p className="thumbnail-friend__request-text">{`${trainingCaption} отклонён`}</p>
      </div>
  };

  const disableInvite = !questionnaire?.isReady || incoming || outgoing;

  return (
    <li className="friends-list__item" key={id}>
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <Link to={AppRoute.UserCard.replace(':id', id)} >
            <div className="thumbnail-friend__image-status">
              <div className="thumbnail-friend__image">
                <picture>
                  <source type="image/webp" srcSet={avatar} />
                  <img src={avatar} width="78" height="78" alt="" />
                </picture>
              </div>
            </div>
            <div className="thumbnail-friend__header">
              <h2 className="thumbnail-friend__name">{name}</h2>
              <div className="thumbnail-friend__location">
                <svg width="14" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-location"></use>
                </svg>
                <address className="thumbnail-friend__location-address">{UserLocationLabel[location]}</address>
              </div>
            </div>
          </Link>
          <ul className="thumbnail-friend__training-types-list">
            {questionnaire?.types.map((type) =>
              <li key={type}>
                <div className="hashtag thumbnail-friend__hashtag">
                  <span>{`#${TrainingTypeLabel[type].toLowerCase()}`}</span>
                </div>
              </li>
            )}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            {(questionnaire?.isReady)
              ? <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                <span>Готов к&nbsp;тренировке</span>
              </div>
              : <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                <span>Не&nbsp;готов к&nbsp;тренировке</span>
              </div>}
            {(userRole === UserRole.Sportsman)
              ? <button
                className={`thumbnail-friend__invite-button ${disableInvite && 'is-disabled'}`}
                type="button"
                onClick={handleCreateRequest}
              >
                <svg width="43" height="46" aria-hidden="true" focusable="false">
                  <use xlinkHref="#icon-invite"></use>
                </svg>
                <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
              </button>
              : ''}
          </div>
        </div>
        {requestElement}
      </div>
    </li>
  );
}

export default FriendsListItem;