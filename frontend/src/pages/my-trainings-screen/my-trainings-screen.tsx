import { useEffect, useState } from "react";
import { BackButtonDisplayMode } from "../../components/back-button/constant";
import { FilterSortingDisplayMode } from "../../components/filter-sorting/constant";
import FilterSorting from "../../components/filter-sorting/filter-sorting";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllowedFilterValues, getTrainings } from "../../store/training/selectors";
import { TrainingFilter } from "../../types/filter/training-filter";
import { QueryParams } from "../../types/training/query-params";
import { COUNT_ITEMS_PER_PAGE } from "../training-catalog-screen/constant";
import TrainingCatalogList from "../../components/training-catalog/training-catalog-list";
import { fetchMyTrainingsAction, getFilterValuesAction } from "../../store/training/thunks";

function MyTrainingsScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const allowedFilterValues = useAppSelector(getAllowedFilterValues);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 1,
    limit: COUNT_ITEMS_PER_PAGE,
    minPrice: allowedFilterValues.price.min ?? 0,
    maxPrice: allowedFilterValues.price.max ?? 0,
    minCalories: allowedFilterValues.calories.min ?? 0,
    maxCalories: allowedFilterValues.calories.max ?? 0,
  });
  const { entities, totalItems } = useAppSelector(getTrainings);

  const handleChangeFilter = (filterValues: TrainingFilter) => {
    setQueryParams({
      ...queryParams,
      minPrice: filterValues.price.min,
      maxPrice: filterValues.price.max,
      minCalories: filterValues.calories.min,
      maxCalories: filterValues.calories.max,
      trainingDuration: filterValues.durations,
    });
  };

  const handleButtonMoreClick = () => {
    if (totalItems > queryParams.limit) {
      setQueryParams({ ...queryParams, limit: queryParams.limit + COUNT_ITEMS_PER_PAGE });
    }
  };

  useEffect(() => {
    dispatch(getFilterValuesAction('67fe232fe6bab933340924fe'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMyTrainingsAction(queryParams));
  }, [dispatch, queryParams]);

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