import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../constant";
import UsersCatalogItem from "../users-catalog-item/users-catalog-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUsers, getUsersLoadingStatus } from "../../store/friends/selectors";
import { useEffect, useRef } from "react";
import { fetchUsersAction } from "../../store/friends/thunks";
import { UserCatalogItemDisplayMode } from "../users-catalog-item/constant";

// Импортируем Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Spinner from "../spinner/spinner";

function LookForCompany(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const isLoading = useAppSelector(getUsersLoadingStatus); // Добавьте этот селектор в ваш store
  
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button 
              className="btn-flat btn-flat--light look-for-company__button" 
              type="button"
              onClick={() => navigate(AppRoute.UsersCatalog)}
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button 
                ref={prevButtonRef}
                className="btn-icon btn-icon--outlined look-for-company__control" 
                type="button" 
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button 
                ref={nextButtonRef}
                className="btn-icon btn-icon--outlined look-for-company__control" 
                type="button" 
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          
          <Swiper
            modules={[Navigation]}
            spaceBetween={20} // расстояние между слайдами
            slidesPerView={4} // количество видимых слайдов
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            onInit={(swiper) => {
              // Переопределяем navigation после инициализации
              // @ts-ignore
              swiper.params.navigation.prevEl = prevButtonRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextButtonRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="look-for-company__list"
          >
            {Array.isArray(users) && users.map((user) => (
              <SwiperSlide key={user.id}>
                <UsersCatalogItem 
                  user={user} 
                  displayMode={UserCatalogItemDisplayMode.LookForCompany}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default LookForCompany;