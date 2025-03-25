import { useState, useEffect } from "react";
import FilterSorting from "../../components/filter-sorting/filter-sorting";
import TrainingCatalogList from "../../components/training-catalog/training-catalog-list";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTrainings } from "../../store/training/selectors";
import { fetchTrainingsAction } from "../../store/training/thunks";
import { QueryParams } from "../../types/training/query-params";

function TrainingCatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { entities } = useAppSelector(getTrainings);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    sortBy: 'createDate',
    sortOrder: 'asc',
    page: 1,
  });
  useEffect(() => {
    dispatch(fetchTrainingsAction(queryParams));
  }, [dispatch, queryParams]);
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
                <FilterSorting />
              </div>
            </div>
            <TrainingCatalogList trainings={entities} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default TrainingCatalogScreen;