import { User } from "../../types/user/user";
import { UserLocationLabel } from "../../types/user/user-location.enum";

type UsersCatalogItemProps = {
  user: User;
}

function UsersCatalogItem({user}: UsersCatalogItemProps): JSX.Element {
  const {id, avatar, name, location} = user;
  return (
    <li className="users-catalog__item" key={id}>
      <div className="thumbnail-user thumbnail-user--role-user">
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
          <li className="thumbnail-user__hashtags-item">
            <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
          </li>
          <li className="thumbnail-user__hashtags-item">
            <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
          </li>
        </ul>
        <a className="btn btn--medium thumbnail-user__button" href="#">Подробнее</a>
      </div>
    </li>
  );
}

export default UsersCatalogItem;