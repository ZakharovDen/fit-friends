import { useState } from "react";
import { BackButtonDisplayMode } from "../../components/back-button/constant";
import { FilterSortingDisplayMode } from "../../components/filter-sorting/constant";
import FilterSorting from "../../components/filter-sorting/filter-sorting";
import { useAppSelector } from "../../hooks";
import { getAllowedFilterValues, getTrainings } from "../../store/training/selectors";
import { TrainingFilter } from "../../types/filter/training-filter";
import { TrainingSort } from "../../types/filter/training-sort";
import { QueryParams } from "../../types/training/query-params";
import { COUNT_ITEMS_PER_PAGE } from "../training-catalog-screen/constant";
import TrainingCatalogList from "../../components/training-catalog/training-catalog-list";

function MyTrainingsScreen(): JSX.Element {
  const allowedFilterValues = useAppSelector(getAllowedFilterValues);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'price',
    sortOrder: 'asc',
    page: 1,
    limit: COUNT_ITEMS_PER_PAGE,
    minPrice: allowedFilterValues.price.min ?? 0,
    maxPrice: allowedFilterValues.price.max ?? 0,
    minCalories: allowedFilterValues.calories.min ?? 0,
    maxCalories: allowedFilterValues.calories.max ?? 0,
  });
  const { entities, totalItems } = useAppSelector(getTrainings);

  const handleChangeFilter = (filterValues: TrainingFilter) => {
    let sortOrder: QueryParams['sortOrder'] = 'asc';
    if (filterValues.sort === TrainingSort.Higher) {
      sortOrder = 'desc';
    }
    setQueryParams({
      ...queryParams,
      minPrice: filterValues.price.min,
      maxPrice: filterValues.price.max,
      minCalories: filterValues.calories.min,
      maxCalories: filterValues.calories.max,
      trainingType: filterValues.types,
      sortBy: 'price',
      sortOrder: sortOrder,
      isFree: (filterValues.sort === TrainingSort.Free)
    });
  };

  const handleButtonMoreClick = () => {
    if (totalItems > queryParams.limit) {
      setQueryParams({ ...queryParams, limit: queryParams.limit + COUNT_ITEMS_PER_PAGE });
    }
  }

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Мои тренировки</h1>
            <FilterSorting
              allowedFilterValues={allowedFilterValues}
              onFilterChange={handleChangeFilter}
              backButtonDisplayMode={BackButtonDisplayMode.MyTraining}
              displayMode={FilterSortingDisplayMode.MyTraining}
            />
            <div className="inner-page__content">
              <TrainingCatalogList
                trainings={entities}
                onButtonMoreClick={handleButtonMoreClick}
                totalItems={totalItems}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MyTrainingsScreen;