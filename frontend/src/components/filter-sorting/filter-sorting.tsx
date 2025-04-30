import FilterMinMax from "../filter-min-max/filter-min-max";
import { FilterMinMaxDisplayMode } from "../filter-min-max/constant";
import { useEffect, useState } from "react";
import { TrainingType, TrainingTypeLabel } from "../../types/training/training-type.enum";
import { TrainingFilter } from "../../types/filter/training-filter";
import { AllowedFilterValues } from "../../types/filter/allowed-filter-values";
import { TrainingSort, TrainingSortLabel } from "../../types/filter/training-sort";
import SliderRange from "../slider-range/slider-range";
import BackButton from "../back-button/back-button";
import { BackButtonDisplayMode } from "../back-button/constant";
import { FilterSortingDisplayMode, FilterSortingSettings } from "./constant";
import { TrainingDuration } from "../../types/training/training-duration.enum";

type FilterSortingProps = {
  allowedFilterValues: AllowedFilterValues;
  onFilterChange: (filterValues: TrainingFilter) => void;
  backButtonDisplayMode: BackButtonDisplayMode;
  displayMode: FilterSortingDisplayMode;
}

function FilterSorting({ allowedFilterValues, onFilterChange, backButtonDisplayMode, displayMode }: FilterSortingProps): JSX.Element {
  const defaultFilter: TrainingFilter = {
    price: { min: allowedFilterValues.price.min ?? 0, max: allowedFilterValues.price.max ?? 0 },
    calories: { min: allowedFilterValues.calories.min ?? 0, max: allowedFilterValues.calories.max ?? 0 },
    types: [],
    sort: TrainingSort.Lower,
    rating: { min: 1, max: 5 },
    durations: []
  };
  const classPrefix = FilterSortingSettings[displayMode].classPrefix;
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

  const handleChangeRating = (ratingValues: TrainingFilter['rating']) => {
    setFilterValues({ ...filterValues, rating: { min: ratingValues.min, max: ratingValues.max } });
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

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setFilterValues({ ...filterValues, durations: [...filterValues.durations, value as TrainingDuration] });
    } else {
      setFilterValues((filterValues) => ({ ...filterValues, durations: filterValues.durations.filter((duration) => duration !== value) }));
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterValues({ ...filterValues, sort: value as TrainingSort });
  }

  return (
    <div className={`${classPrefix}-form`}>
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className={`${classPrefix}-form__wrapper`}>
        <BackButton displayMode={backButtonDisplayMode} />
        <h3 className={`${classPrefix}-form__title`}>Фильтры</h3>
        <form className={`${classPrefix}-form__form`}>
          <div className={`${classPrefix}-form__block ${classPrefix}-form__block--price`}>
            <h4 className={`${classPrefix}-form__block-title`}>Цена, ₽</h4>
            <FilterMinMax
              minAllowedValue={filterValues.price.min ?? 0}
              maxAllowedValue={filterValues.price.max ?? 0}
              onChangeFilter={handleChangePrice}
              displayMode={FilterMinMaxDisplayMode.Price}
            />
            <SliderRange
              className="filter-range"
              maxRangeValue={defaultFilter.price.max}
              minRangeValue={defaultFilter.price.min}
              onChange={handleChangePrice}
            />
          </div>
          <div className={`${classPrefix}-form__block ${classPrefix}-form__block--calories`}>
            <h4 className={`${classPrefix}-form__block-title`}>Калории</h4>
            <FilterMinMax
              minAllowedValue={filterValues.calories.min ?? 0}
              maxAllowedValue={filterValues.calories.max ?? 0}
              onChangeFilter={handleChangeCalories}
              displayMode={FilterMinMaxDisplayMode.Calories}
            />
            <SliderRange
              className="filter-range"
              maxRangeValue={defaultFilter.calories.max}
              minRangeValue={defaultFilter.calories.min}
              onChange={handleChangeCalories}
            />
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--rating">
            <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
            <SliderRange
              className="filter-raiting"
              maxRangeValue={defaultFilter.rating.max}
              minRangeValue={defaultFilter.rating.min}
              isShowValues={true}
              onChange={handleChangeRating}
            />
          </div>
          {
            (displayMode === FilterSortingDisplayMode.GymCatalog) &&
            <div className={`${classPrefix}-form__block ${classPrefix}-form__block--type`}>
              <h4 className={`${classPrefix}-form__block-title`}>Тип</h4>
              <ul className={`${classPrefix}-form__check-list`}>
                {Object.entries(TrainingTypeLabel).map(([key, value]) => (
                  <li className={`${classPrefix}-form__check-list-item`} key={key}>
                    <div className="custom-toggle custom-toggle--checkbox" key={key}>
                      <label>
                        <input
                          type="checkbox"
                          value={key}
                          name="type"
                          key={key}
                          checked={filterValues.types.includes(key as TrainingType)}
                          onChange={handleTypeChange}
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
          }

          {
            (displayMode === FilterSortingDisplayMode.MyTraining) &&
            <div className={`${classPrefix}-form__block ${classPrefix}-form__block--type`}>
              <h4 className={`${classPrefix}-form__block-title`}>Длительность</h4>
              <ul className={`${classPrefix}-form__check-list`}>
                {Object.entries(TrainingDuration).map(([key, value]) => (
                  <li className={`${classPrefix}-form__check-list-item`} key={key}>
                    <div className="custom-toggle custom-toggle--checkbox" key={key}>
                      <label>
                        <input
                          type="checkbox"
                          value={key}
                          name="type"
                          key={key}
                          checked={filterValues.durations.includes(key as TrainingDuration)}
                          onChange={handleDurationChange}
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
          }

          {
            (displayMode === FilterSortingDisplayMode.GymCatalog) &&
            <div className={`${classPrefix}-form__block ${classPrefix}-form__block--sort`}>
              <h4 className={`${classPrefix}-form__title ${classPrefix}-form__title--sort`}>Сортировка</h4>
              <div className={`btn-radio-sort ${classPrefix}-form__radio`}>
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
          }
        </form>
      </div>
    </div>
  );
}

export default FilterSorting;