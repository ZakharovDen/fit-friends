import { ChangeEvent, useEffect, useState } from 'react';
import { FilterMinMaxDisplayMode, FilterMinMaxSettings } from './constant';

type FilterMinMaxProps = {
  minAllowedValue: number;
  maxAllowedValue: number;
  onChangeFilter: (filterValue: FilterValue) => void;
  displayMode: FilterMinMaxDisplayMode;
}

type FilterValue = {
  min: number;
  max: number;
};

function FilterMinMax({minAllowedValue, maxAllowedValue, onChangeFilter, displayMode}: FilterMinMaxProps): JSX.Element {
  const [filterValue, setFilterValue] = useState<FilterValue>({min: minAllowedValue, max: maxAllowedValue});
  const classSuffix = FilterMinMaxSettings[displayMode].classSuffix;

  useEffect(() => {
    setFilterValue({
      min: minAllowedValue,
      max: maxAllowedValue,
    });
  }, [minAllowedValue, maxAllowedValue]);

  const handleMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newMinValue = parseInt(event.target.value, 10);
    if (isNaN(newMinValue)) {
      setFilterValue({...filterValue, min: minAllowedValue});
    } else {
      setFilterValue({...filterValue, min: newMinValue});
    }
  };

  const handleMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = parseInt(event.target.value, 10);
    if (isNaN(newMaxValue)) {
      setFilterValue({...filterValue, max: maxAllowedValue});
    } else {
      setFilterValue({...filterValue, max: newMaxValue});
    }
  };

  const handleFilterBlur = () => {
    if (filterValue.min < minAllowedValue){
      setFilterValue({...filterValue, min: minAllowedValue});
    }
    if (filterValue.max > maxAllowedValue){
      setFilterValue({...filterValue, max: maxAllowedValue});
    }
    onChangeFilter(filterValue);
  };

  return (
    <div className={`filter-${classSuffix}`}>
      <div className={`filter-${classSuffix}__input-text filter-${classSuffix}__input-text--min`}>
        <input
          type="number"
          id="text-min"
          name="text-min"
          min={minAllowedValue}
          value={filterValue.min}
          onChange={handleMinValueChange}
          onBlur={handleFilterBlur}
        />
        <label htmlFor="text-min">от</label>
      </div>
      <div className={`filter-${classSuffix}__input-text filter-${classSuffix}__input-text--max`}>
        <input
          type="number"
          id="text-max"
          name="text-max"
          max={maxAllowedValue}
          value={filterValue.max}
          onChange={handleMaxValueChange}
          onBlur={handleFilterBlur}
        />
        <label htmlFor="text-max">до</label>
      </div>
    </div>
  );
}

export default FilterMinMax;
