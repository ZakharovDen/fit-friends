import { Link, useLocation } from "react-router-dom";
import { AppRoute } from "../../constant";

function Header(): JSX.Element {
  const location = useLocation();

  const isActive = (route: AppRoute) => 
    location.pathname === route || 
    (route === AppRoute.Main && location.pathname === '/');

  return (
    <header className="header">
      <div className="container"><span className="header__logo">
        <svg width="187" height="70" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg></span>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link 
                className={`main-nav__link ${isActive(AppRoute.Main) ? 'is-active' : ''}`} 
                to={AppRoute.Main} 
                aria-label="На главную"
              >
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link 
                className={`main-nav__link ${isActive(AppRoute.Account) ? 'is-active' : ''}`} 
                to={AppRoute.Account} 
                aria-label="Личный кабинет"
              >
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="search">
        </div>
      </div>
    </header>
  );
}

export default Header