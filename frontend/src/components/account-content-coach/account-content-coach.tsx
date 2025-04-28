import { Link } from "react-router-dom";
import { AppRoute } from "../../constant";

function AccountContentCoach(): JSX.Element {
  return (
    <div className="inner-page__content">
      <div className="personal-account-coach">
        <div className="personal-account-coach__navigation">
          <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyTrainings}>
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref="#icon-flash"></use>
              </svg>
            </div>
            <span className="thumbnail-link__text">Мои тренировки</span>
          </Link>
          <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.CreateTraining}>
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref="#icon-add"></use>
              </svg>
            </div><span className="thumbnail-link__text">Создать тренировку</span>
          </Link>
          <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyOrders}>
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref="#icon-bag"></use>
              </svg>
            </div><span className="thumbnail-link__text">Мои заказы</span>
          </Link>
          <div className="personal-account-coach__calendar">
            <div className="thumbnail-spec-gym">
              <div className="thumbnail-spec-gym__image">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                  />
                  <img
                    src="img/content/thumbnails/nearest-gym-01.jpg"
                    srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                    width="330"
                    height="190"
                    alt=""
                  />
                </picture>
              </div>
              <div className="thumbnail-spec-gym__header" >
                <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountContentCoach;