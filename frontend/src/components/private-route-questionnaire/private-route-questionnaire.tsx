import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../constant';
import { getIsQuestionnaireCompleted } from '../../store/user/selectors';

type PrivateRouteProps = {
  redirectTo: AppRoute;
  state: boolean;
  children: JSX.Element;
}

const PrivateRouteQuestionnaire = ({ children, state, redirectTo }: PrivateRouteProps): JSX.Element => {
  const isQuestionnaireCompleted = useAppSelector(getIsQuestionnaireCompleted);

  return (
    (isQuestionnaireCompleted === state)
      ? children
      : <Navigate to={redirectTo} />
  );
};

export default PrivateRouteQuestionnaire;
