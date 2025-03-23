import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constant';
import IntroScreen from '../../pages/intro-screen/intro-screen';
import LoginScreen from '../../pages/login/login-screen';
import RegistrationScreen from '../../pages/registration-screen/registration-screen';
import LayoutMain from '../layout-main/layout-main';
import MainScreen from '../../pages/main-screen/main-screen';
import TrainingCatalogScreen from '../../pages/training-catalog-screen/training-catalog-screen';
import TrainingCardScreen from '../../pages/training-card-screen/training-card-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<LayoutMain />}
        >
          <Route
            path={AppRoute.Main}
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Catalog}
            element={<TrainingCatalogScreen />}
          />
          <Route
            path={AppRoute.TrainingCard}
            element={<TrainingCardScreen />}
          />
        </Route>
        <Route
          path={AppRoute.Intro}
          element={<IntroScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Register}
          element={<RegistrationScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;