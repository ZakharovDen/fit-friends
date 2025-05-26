import { useState, useEffect } from "react";
import FilterSorting from "../../components/filter-sorting/filter-sorting";
import TrainingCatalogList from "../../components/training-catalog/training-catalog-list";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllowedFilterValues, getTrainings } from "../../store/training/selectors";
import { fetchTrainingsAction, getFilterValuesAction } from "../../store/training/thunks";
import { QueryParams } from "../../types/training/training-query-params";
import { COUNT_ITEMS_PER_PAGE } from './constant';
import { TrainingFilter } from "../../types/filter/training-filter";
import { TrainingSort } from "../../types/filter/training-sort";
import { BackButtonDisplayMode } from "../../components/back-button/constant";
import { FilterSortingDisplayMode } from "../../components/filter-sorting/constant";

function TrainingCatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const allowedFilterValues = useAppSelector(getAllowedFilterValues);
  const { entities, totalItems } = useAppSelector(getTrainings);
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

  useEffect(() => {
    dispatch(getFilterValuesAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTrainingsAction(queryParams));
  }, [dispatch, queryParams]);

  const handleButtonMoreClick = () => {
    if (queryParams.limit && totalItems > queryParams.limit) {
      setQueryParams({ ...queryParams, limit: queryParams.limit + COUNT_ITEMS_PER_PAGE });
    }
  }

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
      isFree: (filterValues.sort === TrainingSort.Free),
      minRating: filterValues.rating.min,
      maxRating: filterValues.rating.max,
    });
  };

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог тренировок</h1>
            <FilterSorting 
              allowedFilterValues={allowedFilterValues} 
              onFilterChange={handleChangeFilter} 
              backButtonDisplayMode={BackButtonDisplayMode.Catalog} 
              displayMode={FilterSortingDisplayMode.GymCatalog}
            />
            <TrainingCatalogList 
              trainings={entities} 
              onButtonMoreClick={handleButtonMoreClick} 
              totalItems={totalItems} 
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default TrainingCatalogScreen;