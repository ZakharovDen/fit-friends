import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../constant";
import UsersCatalogItem from "../users-catalog-item/users-catalog-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUsers } from "../../store/friends/selectors";
import { useEffect } from "react";
import { fetchUsersAction } from "../../store/friends/thunks";
import { UserCatalogItemDisplayMode } from "../users-catalog-item/constant";

function LookForCompany(): JSX.Element {
  const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers);
    useEffect(() => {
      dispatch(fetchUsersAction())
    }, [dispatch]);
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
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            {users.map((user) => <UsersCatalogItem user={user} displayMode={UserCatalogItemDisplayMode.LookForCompany} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LookForCompany;