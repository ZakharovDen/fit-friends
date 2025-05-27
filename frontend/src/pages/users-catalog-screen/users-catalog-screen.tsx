import { useEffect, useState } from "react";
import BackButton from "../../components/back-button/back-button";
import { BackButtonDisplayMode } from "../../components/back-button/constant";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { UserLocation, UserLocationLabel } from "../../types/user/user-location.enum";
import FilterCheckbox from "../../components/filter-checkbox/filter-checkbox";
import FilterRadio from "../../components/filter-radio/filter-radio";
import UsersCatalogItem from "../../components/users-catalog-item/users-catalog-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { UserQueryParams } from "../../types/user/user-query-params";
import { UserRole, UserRoleSortLabel } from "../../types/user/user-role.enum";
import { fetchUsersAction } from "../../store/friends/thunks";
import { getUsers } from "../../store/friends/selectors";

type UserFilter = Required<UserQueryParams>;

function UserCatalogScreen(): JSX.Element {
  const [filterValues, setFilterValues] = useState<UserFilter>({
    level: TrainingLevel.Beginner,
    locations: [],
    specializations: [],
    role: UserRole.Coach
  });
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  useEffect(() => {
    dispatch(fetchUsersAction(filterValues))
  }, [dispatch, filterValues]);

  const locations = Object.entries(UserLocationLabel).map(([key, label]) => ({ key, label }));
  const specializations = Object.entries(TrainingTypeLabel).map(([key, label]) => ({ key, label }));
  const levels = Object.entries(TrainingLevelLabel).map(([key, label]) => ({ key, label }));

  const handleLocationChange = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, locations: [...filterValues.locations, key as UserLocation] });
    } else {
      setFilterValues((filterValues) => ({ ...filterValues, locations: filterValues.locations.filter((location) => location !== key) }));
    }
  };

  const handleSpecializationChange = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, specializations: [...filterValues.specializations, key as TrainingType] });
    } else {
      setFilterValues((filterValues) => ({ ...filterValues, specializations: filterValues.specializations.filter((spezialization) => spezialization !== key) }));
    }
  };

  const handleLevelChange = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, level: key as TrainingLevel });
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setFilterValues({ ...filterValues, role: value as UserRole })
    }
  }

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог пользователей</h1>
            <div className="user-catalog-form">
              <h2 className="visually-hidden">Каталог пользователя</h2>
              <div className="user-catalog-form__wrapper">
                <BackButton displayMode={BackButtonDisplayMode.UsersCatalog} />
                <h3 className="user-catalog-form__title">Фильтры</h3>
                <form className="user-catalog-form__form">

                  <FilterCheckbox
                    onChange={handleLocationChange}
                    options={locations}
                    selectedKeys={filterValues.locations ?? []}
                    title="Локация, станция метро"
                    className="user-catalog-form__block--location"
                  />

                  <FilterCheckbox
                    onChange={handleSpecializationChange}
                    options={specializations}
                    selectedKeys={filterValues.specializations ?? []}
                    title="Специализация"
                    className="user-catalog-form__block--spezialization"
                  />

                  <FilterRadio
                    onChange={handleLevelChange}
                    options={levels}
                    selectedKey={filterValues.level}
                    title="Ваш уровень"
                    className="user-catalog-form__block--level"
                  />

                  <div className="user-catalog-form__block">
                    <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                    <div className="btn-radio-sort">
                      {Object.entries(UserRoleSortLabel).map(([key, value]) => (
                        <label key={key}>
                          <input
                            type="radio"
                            name="sort"
                            checked={(filterValues.role === key)}
                            key={key}
                            value={key}
                            onChange={handleRoleChange}
                          />
                          <span className="btn-radio-sort__label">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="inner-page__content">
              <div className="users-catalog">
                <ul className="users-catalog__list">
                  {users.map((user) => <UsersCatalogItem user={user} key={user.id} />)}
                </ul>
                <div className="show-more users-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UserCatalogScreen;