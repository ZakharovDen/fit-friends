import { useState, useEffect } from "react";
import FilterSorting from "../../components/filter-sorting/filter-sorting";
import TrainingCatalogList from "../../components/training-catalog/training-catalog-list";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFilterValues, getTrainings } from "../../store/training/selectors";
import { fetchTrainingsAction, getFilterValuesAction } from "../../store/training/thunks";
import { QueryParams } from "../../types/training/query-params";
import { COUNT_ITEMS_PER_PAGE }from './constant';
import { FilterValues } from "../../types/training/filter-values";

function TrainingCatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const filterValues = useAppSelector(getFilterValues);
  const { entities, totalItems } = useAppSelector(getTrainings);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'createDate',
    sortOrder: 'asc',
    page: 1,
    limit: COUNT_ITEMS_PER_PAGE
  });
  
  useEffect(() => {
    dispatch(getFilterValuesAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTrainingsAction(queryParams));
  }, [dispatch, queryParams]);

  const handleButtonMoreClick = () => {
    if (totalItems > queryParams.limit) {
      setQueryParams({...queryParams, limit: queryParams.limit + COUNT_ITEMS_PER_PAGE});
    }
  }

  const handleChangePrice = (priceValues: FilterValues['price']) => {
    console.log(totalItems, queryParams.limit)
    if (totalItems > queryParams.limit) {
      setQueryParams({...queryParams, limit: queryParams.limit + COUNT_ITEMS_PER_PAGE});
    }
  }


  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог тренировок</h1>
            <div className="gym-catalog-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="gym-catalog-form__wrapper">
                <button className="btn-flat btn-flat--underlined gym-catalog-form__btnback" type="button">
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
                <h3 className="gym-catalog-form__title">Фильтры</h3>
                <FilterSorting filterValues={filterValues} onPriceChange={handleChangePrice}/>
              </div>
            </div>
            <TrainingCatalogList trainings={entities} onButtonMoreClick={handleButtonMoreClick} totalItems={totalItems}/>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TrainingCatalogScreen;