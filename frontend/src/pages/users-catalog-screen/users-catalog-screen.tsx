import { useState } from "react";
import BackButton from "../../components/back-button/back-button";
import { BackButtonDisplayMode } from "../../components/back-button/constant";
import { TrainingLevel, TrainingLevelLabel } from "../../types/training/training-level.enum";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { UserLocation, UserLocationLabel } from "../../types/user/user-location.enum";
import FilterCheckbox from "../../components/filter-checkbox/filter-checkbox";
import FilterRadio from "../../components/filter-radio/filter-radio";
import UsersCatalogItem from "../../components/users-catalog-item/users-catalog-item";

const users = [
  {
    "id": "658170cbb954e9f5b905ccf4",
    "email": "user@local.local",
    "name": "Валерия",
    "avatar": "/default/avatars/user-03.jpg",
    "sex": "female",
    "dateOfBirth": "1989-12-31T18:00:00.000Z",
    "description": "Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками.",
    "location": "Petrogradskaya",
    "backgroundImage": "backend\\uploads\\2025\\03\\11aa6d8d-3ebd-4dda-82ca-6012a5709db7.png",
    "role": "sportsman",
    "createdAt": "2025-05-05T08:17:46.945Z",
    "questionnaire": {
      "level": "professional",
      "types": [
        "crossfit",
        "yoga",
        "boxing"
      ],
      "duration": "80-100",
      "caloriesTotal": 5000,
      "caloriesByDay": 5000,
      "isReady": true
    }
  },
  {
    "id": "6581762309c030b503e30512",
    "email": "user2@local.local",
    "name": "Катерина",
    "avatar": "/default/avatars/user-20.jpg",
    "sex": "female",
    "dateOfBirth": "2000-12-31T18:00:00.000Z",
    "description": "Привет! Я Катерина и мне 27 лет. Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и пилатесом.",
    "location": "Pionerskaya",
    "backgroundImage": "backend\\uploads\\2025\\03\\11aa6d8d-3ebd-4dda-82ca-6012a5709db7.png",
    "role": "sportsman",
    "createdAt": "2025-05-05T08:17:47.000Z",
    "questionnaire": {
      "level": "amateur",
      "types": [
        "pilates",
        "yoga",
        "stretching"
      ],
      "duration": "30-50",
      "caloriesTotal": 5000,
      "caloriesByDay": 1000,
      "isReady": false
    }
  },
  {
    "id": "682ef7bef245a27a3a91aace",
    "email": "example@email.com",
    "name": "Иван",
    "avatar": "/2025/05/2aeec67a-fd2d-41fe-953e-6246a2956542.jpeg",
    "sex": "male",
    "location": "Pionerskaya",
    "role": "coach",
    "createdAt": "2025-05-22T10:09:02.560Z",
    "questionnaire": {
      "level": "professional",
      "types": [
        "running",
        "boxing",
        "crossfit"
      ],
      "duration": "10-30",
      "caloriesTotal": 5000,
      "caloriesByDay": 1000,
      "isReady": true
    }
  },
  {
    "id": "683310f6f245a27a3a91aaea",
    "email": "example1@email.com",
    "name": "Валерия",
    "sex": "male",
    "location": "Pionerskaya",
    "role": "sportsman",
    "createdAt": "2025-05-25T12:45:42.763Z",
    "questionnaire": {
      "level": "beginner",
      "types": [],
      "duration": "10-30",
      "caloriesTotal": 5000,
      "caloriesByDay": 1000,
      "isReady": true
    }
  }
]

type UserFilter = {
  locations: UserLocation[],
  spezializations: TrainingType[],
  level: TrainingLevel,
}

function UserCatalogScreen(): JSX.Element {
  const [filterValues, setFilterValues] = useState<UserFilter>({
    level: TrainingLevel.Beginner,
    locations: [],
    spezializations: []
  });

  const locations = Object.entries(UserLocationLabel).map(([key, label]) => ({ key, label }));
  const specializations = Object.entries(TrainingTypeLabel).map(([key, label]) => ({ key, label }));
  const levels = Object.entries(TrainingLevelLabel).map(([key, label]) => ({ key, label }));

  const handleLocationChange1 = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, locations: [...filterValues.locations, key as UserLocation] });
    } else {
      setFilterValues((filterValues) => ({ ...filterValues, locations: filterValues.locations.filter((location) => location !== key) }));
    }
  };

  const handleSpecializationChange = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, spezializations: [...filterValues.spezializations, key as TrainingType] });
    } else {
      setFilterValues((filterValues) => ({ ...filterValues, spezializations: filterValues.spezializations.filter((spezialization) => spezialization !== key) }));
    }
  };

  const handleLevelChange = (key: string, checked: boolean) => {
    if (checked) {
      setFilterValues({ ...filterValues, level: key as TrainingLevel });
    }
  };

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
                    onChange={handleLocationChange1}
                    options={locations}
                    selectedKeys={filterValues.locations}
                    title="Локация, станция метро"
                    className="user-catalog-form__block--location"
                  />

                  <FilterCheckbox
                    onChange={handleSpecializationChange}
                    options={specializations}
                    selectedKeys={filterValues.spezializations}
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
                      <label>
                        <input type="radio" name="sort" checked /><span className="btn-radio-sort__label">Тренеры</span>
                      </label>
                      <label>
                        <input type="radio" name="sort" /><span className="btn-radio-sort__label">Пользователи</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="inner-page__content">
              <div className="users-catalog">
                <ul className="users-catalog__list">
                  {users.map((user) => <UsersCatalogItem user={user} />)}
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