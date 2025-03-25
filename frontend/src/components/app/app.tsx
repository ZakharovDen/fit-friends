import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constant';
import IntroScreen from '../../pages/intro-screen/intro-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import RegistrationScreen from '../../pages/registration-screen/registration-screen';
import LayoutMain from '../layout-main/layout-main';
import MainScreen from '../../pages/main-screen/main-screen';
import TrainingCatalogScreen from '../../pages/training-catalog-screen/training-catalog-screen';
import TrainingCardScreen from '../../pages/training-card-screen/training-card-screen';
import AccountScreen from '../../pages/account-screen/account-screen';
import PrivateRoute from '../private-route/private-route';
import QuestionnaireScreen from '../../pages/questionnaire-screen/questionnaire-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
              <LayoutMain />
            </PrivateRoute>
          }
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
          <Route
            path={AppRoute.Account}
            element={<AccountScreen />}
          />
        </Route>
        <Route
          path={AppRoute.Intro}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Main}>
              <IntroScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Main}>
              <LoginScreen />
            </PrivateRoute>}
        />
        <Route
          path={AppRoute.Register}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Main}>
              <RegistrationScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Questionnaire}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Main}>
              <QuestionnaireScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;