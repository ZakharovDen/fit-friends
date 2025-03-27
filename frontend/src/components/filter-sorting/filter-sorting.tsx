import { FilterValues } from "../../types/training/filter-values";
import FilterMinMax from "../filter-min-max/filter-min-max";
import { FilterMinMaxDisplayMode } from "../filter-min-max/constant";
import { useEffect, useState } from "react";

type FilterSortingProps = {
  allowedFilterValues: FilterValues;
  onFilterChange: (allowedFilterValues: FilterValues) => void; //  Добавили колбэк
}

function FilterSorting({ allowedFilterValues, onFilterChange }: FilterSortingProps): JSX.Element {
  const [filterValues, setFilterValues] = useState<FilterValues>(allowedFilterValues);
  useEffect(() => {
    setFilterValues(allowedFilterValues)
  }, [allowedFilterValues]);

  const handleChangePrice = (priceValues: FilterValues['price']) => {
    setFilterValues({...filterValues, price: {min: priceValues.min, max: priceValues.max}});
    onFilterChange({...filterValues, price: {min: priceValues.min, max: priceValues.max}});
  }

  const handleChangeCalories = (caloriesValues: FilterValues['calories']) => {
    setFilterValues({...filterValues, calories: {min: caloriesValues.min, max: caloriesValues.max}});
    onFilterChange({...filterValues, calories: {min: caloriesValues.min, max: caloriesValues.max}});
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
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label">йога</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label">силовые</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="type" name="type" checked /><span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label">кроссфит</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="type-1" name="type" checked /><span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label">бокс</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label">бег</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label">аэробика</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label">пилатес</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label">стрейчинг</span>
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
        <div className="btn-radio-sort gym-catalog-form__radio">
          <label>
            <input type="radio" name="sort" checked /><span className="btn-radio-sort__label">Дешевле</span>
          </label>
          <label>
            <input type="radio" name="sort" /><span className="btn-radio-sort__label">Дороже</span>
          </label>
          <label>
            <input type="radio" name="sort" /><span className="btn-radio-sort__label">Бесплатные</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default FilterSorting;