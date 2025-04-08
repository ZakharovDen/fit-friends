import { useNavigate } from "react-router-dom";
import { BackButtonClassName, BackButtonDisplayMode } from "./constant";

type BackButtonProps = {
  displayMode: BackButtonDisplayMode
}

function BackButton({ displayMode }: BackButtonProps): JSX.Element {
  const navigate = useNavigate();
  const className = BackButtonClassName[displayMode];
  return (
    <button
      className={`btn-flat ${className}`}
      type="button"
      onClick={() => navigate(-1)}
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg><span>Назад</span>
    </button>
  );
}

export default BackButton;