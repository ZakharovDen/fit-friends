function AccountContentCoach(): JSX.Element {
  return (
    <div className="inner-page__content">
      <div className="personal-account-coach">
        <div className="personal-account-coach__navigation"><a className="thumbnail-link thumbnail-link--theme-light" href="#">
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-flash"></use>
            </svg>
          </div><span className="thumbnail-link__text">Мои тренировки</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref="#icon-add"></use>
              </svg>
            </div><span className="thumbnail-link__text">Создать тренировку</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref="#icon-friends"></use>
              </svg>
            </div><span className="thumbnail-link__text">Мои друзья</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref="#icon-bag"></use>
              </svg>
            </div><span className="thumbnail-link__text">Мои заказы</span></a>
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
                  {/* <!-- <p className="thumbnail-spec-gym__type">Ближайший зал</p> --> */}
                  {/* <div className="thumbnail-spec-gym__header", align ="center", > */}
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