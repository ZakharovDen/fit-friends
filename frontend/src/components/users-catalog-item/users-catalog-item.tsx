import { Link } from "react-router-dom";
import { AppRoute } from "../../constant";
import { TrainingTypeLabel } from "../../types/training/training-type.enum";
import { User } from "../../types/user/user";
import { UserLocationLabel } from "../../types/user/user-location.enum";
import { UserRole } from "../../types/user/user-role.enum";

type UsersCatalogItemProps = {
  user: User;
}

function UsersCatalogItem({ user }: UsersCatalogItemProps): JSX.Element {
  const { id, avatar, name, location, role, questionnaire } = user;
  const linkToInfo = AppRoute.UserCard.replace(':id', id);
  return (
    <li className="users-catalog__item" key={id}>
      <div className={`thumbnail-user thumbnail-user--role-${(role === UserRole.Coach) ? 'coach' : 'user'}`}>
        <div className="thumbnail-user__image">
          <picture>
            <source type="image/webp" srcSet={avatar} />
            <img src={avatar} srcSet={avatar} width="82" height="82" alt="" />
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{UserLocationLabel[location]}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {questionnaire?.types.map((type) =>
            <li className="thumbnail-user__hashtags-item" key={type}>
              <div className="hashtag thumbnail-user__hashtag"><span>{`#${TrainingTypeLabel[type].toLowerCase()}`}</span></div>
            </li>
          )}
        </ul>
        <Link className="btn btn--medium thumbnail-user__button" to={linkToInfo}>Подробнее</Link>
      </div>
    </li>
  );
}

export default UsersCatalogItem;