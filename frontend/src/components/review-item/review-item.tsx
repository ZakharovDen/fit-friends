import { FeedbackWithUser } from '../../types/feedback/feedback';

type ReviewItemProps = {
  feedback: FeedbackWithUser;
}

function ReviewItem({feedback}: ReviewItemProps): JSX.Element {
  const {user, text, rating} = feedback;
  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <source
                type="image/webp"
                srcSet={user.avatar}
              />
              <img
                src="img/content/avatars/users//photo-1.png"
                srcSet="img/content/avatars/users//photo-1@2x.png 2x"
                width="64"
                height="64"
                alt="Изображение пользователя"
              />
            </picture>
          </div><span className="review__user-name">{user.name}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg><span>{rating}</span>
          </div>
        </div>
        <p className="review__comment">{text}</p>
      </div>
    </li>
  );
}

export default ReviewItem;
