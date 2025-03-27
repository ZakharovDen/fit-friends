import FilterMinMax from "../filter-min-max/filter-min-max";
import { FilterMinMaxDisplayMode } from "../filter-min-max/constant";
import { useEffect, useState } from "react";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { TrainingFilter } from "../../types/filter/training-filter";
import { AllowedFilterValues } from "../../types/filter/allowed-filter-values";
import { TrainingSort, TrainingSortLabel } from "../../types/filter/training-sort";

type FilterSortingProps = {
  allowedFilterValues: AllowedFilterValues;
  onFilterChange: (filterValues: TrainingFilter) => void;
}

function FilterSorting({ allowedFilterValues, onFilterChange }: FilterSortingProps): JSX.Element {
  const defaultFilter: TrainingFilter = {
    price: { min: allowedFilterValues.price.min ?? 0, max: allowedFilterValues.price.max ?? 0 },
    calories: { min: allowedFilterValues.calories.min ?? 0, max: allowedFilterValues.calories.max ?? 0 },
    types: [],
    sort: TrainingSort.Lower
  };
  const [filterValues, setFilterValues] = useState<TrainingFilter>(defaultFilter);
  useEffect(() => {
    setFilterValues(defaultFilter)
  }, [allowedFilterValues]);

  useEffect(() => {
    onFilterChange(filterValues);
  }, [filterValues])

  const handleChangePrice = (priceValues: TrainingFilter['price']) => {
    setFilterValues({ ...filterValues, price: { min: priceValues.min, max: priceValues.max } });
  }

  const handleChangeCalories = (caloriesValues: TrainingFilter['calories']) => {
    setFilterValues({ ...filterValues, calories: { min: caloriesValues.min, max: caloriesValues.max } });
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setFilterValues({ ...filterValues, types: [...filterValues.types, value as TrainingType] });
    } else {
      setFilterValues((filterValues) => ({ ...filterValues, types: filterValues.types.filter((type) => type !== value) }));
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterValues({ ...filterValues, sort: value as TrainingSort });
  }

  return (
    <form className="gym-catalog-form__form">
      <div className="gym-catalog-form__block gym-catalog-form__block--price">
        <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
        <FilterMinMax
          minAllowedValue={allowedFilterValues.price.min ?? 0}
          maxAllowedValue={allowedFilterValues.price.max ?? 0}
          onChangeFilter={handleChangePrice}
          displayMode={FilterMinMaxDisplayMode.Price}
        />
        <div className="filter-range">
          <div className="filter-range__scale">
            <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
          </div>
          <div className="filter-range__control">
            <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
            <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
          </div>
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--calories">
        <h4 className="gym-catalog-form__block-title">Калории</h4>
        <FilterMinMax
          minAllowedValue={allowedFilterValues.calories.min ?? 0}
          maxAllowedValue={allowedFilterValues.calories.max ?? 0}
          onChangeFilter={handleChangeCalories}
          displayMode={FilterMinMaxDisplayMode.Calories}
        />
        <div className="filter-range">
          <div className="filter-range__scale">
            <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
          </div>
          <div className="filter-range__control">
            <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
            <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
          </div>
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--rating">
        <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
        <div className="filter-raiting">
          <div className="filter-raiting__scale">
            <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
          </div>
          <div className="filter-raiting__control">
            <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>1</span>
            <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
          </div>
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--type">
        <h4 className="gym-catalog-form__block-title">Тип</h4>
        <ul className="gym-catalog-form__check-list">
          {Object.entries(TrainingTypeLabel).map(([key, value]) => (
            <li className="gym-catalog-form__check-list-item" key={key}>
              <div className="custom-toggle custom-toggle--checkbox" key={key}>
                <label>
                  <input
                    type="checkbox"
                    value={key}
                    name="type"
                    key={key}
                    checked={filterValues.types.includes(key as TrainingType)} // Проверяем, выбран ли чекбокс
                    onChange={handleTypeChange} // Обработчик изменения состояния
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{value.toLocaleLowerCase()}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
        <div className="btn-radio-sort gym-catalog-form__radio">
          {Object.entries(TrainingSortLabel).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                name="sort"
                value={key}
                key={key}
                checked={filterValues.sort === key}
                onChange={handleSortChange}
              />
              <span className="btn-radio-sort__label">{value}</span>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}

export default FilterSorting;