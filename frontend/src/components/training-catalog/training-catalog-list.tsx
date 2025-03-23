import TrainingCatalogItem from "./training-catalog-item";

function TrainingCatalogList(): JSX.Element {
  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
        <TrainingCatalogItem />
        <TrainingCatalogItem />
        <TrainingCatalogItem />
        <TrainingCatalogItem />
        <TrainingCatalogItem />
        <TrainingCatalogItem />
        <TrainingCatalogItem />
        <TrainingCatalogItem />
        <TrainingCatalogItem />
      </ul>
      <div className="show-more training-catalog__show-more">
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </div>
  );
}

export default TrainingCatalogList;