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
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRouteQuestionnaire from '../private-route-questionnaire/private-route-questionnaire';
import PurchasesScreen from '../../pages/purchases-screen/purchases-screen';
import CreateTrainingScreen from '../../pages/create-training-screen/create-training-screen';
import UserCardScreen from '../../pages/user-card-screen/user-card-screen';
import PrivateRouteRole from '../private-route-role/private-route-role';
import { UserRole } from '../../types/user/user-role.enum';
import MyTrainingsScreen from '../../pages/my-trainings-screen/my-trainings-screen';
import MyOrdersScreen from '../../pages/my-orders-screen/my-orders-screen';
import UserCatalogScreen from '../../pages/users-catalog-screen/users-catalog-screen';
import MyFriendsScreen from '../../pages/my-friends-screen/my-friends-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
        <Route
          path={AppRoute.Main}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Intro}>
              <PrivateRouteQuestionnaire state redirectTo={AppRoute.Questionnaire}>
                <LayoutMain />
              </PrivateRouteQuestionnaire>
            </PrivateRoute>
          }
        >
          <Route
            path={AppRoute.Main}
            element={
              <PrivateRouteRole allowedRoles={[UserRole.Sportsman]} redirectTo={AppRoute.Account}>
                <MainScreen />
              </PrivateRouteRole>
            }
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
          <Route
            path={AppRoute.MyPurchases}
            element={<PurchasesScreen />}
          />
          <Route
            path={AppRoute.CreateTraining}
            element={
              <PrivateRouteRole allowedRoles={[UserRole.Coach]}>
                <CreateTrainingScreen />
              </PrivateRouteRole>
            }
          />
          <Route
            path={AppRoute.UserCard}
            element={<UserCardScreen />}
          />
          <Route
            path={AppRoute.MyTrainings}
            element={
              <PrivateRouteRole allowedRoles={[UserRole.Coach]}>
                <MyTrainingsScreen />
              </PrivateRouteRole>
            }
          />
          <Route
            path={AppRoute.MyOrders}
            element={
              <PrivateRouteRole allowedRoles={[UserRole.Coach]}>
                <MyOrdersScreen />
              </PrivateRouteRole>
            }
          />
          <Route
            path={AppRoute.UsersCatalog}
            element={
              <PrivateRouteRole allowedRoles={[UserRole.Sportsman]}>
                <UserCatalogScreen />
              </PrivateRouteRole>
            }
          />
          <Route
            path={AppRoute.MyFriends}
            element={<MyFriendsScreen />}
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
            </PrivateRoute>
          }
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
            <PrivateRouteQuestionnaire state={false} redirectTo={AppRoute.Main}>
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Register}>
                <QuestionnaireScreen />
              </PrivateRoute>
            </PrivateRouteQuestionnaire>
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
