import { useAppSelector } from '../../hooks';
import { getUser } from '../../store/user/selectors';
import { UserRole } from '../../types/user/user-role.enum';
import { AppRoute } from '../../constant'; // Импортируйте ваш AppRoute
import { Navigate } from 'react-router-dom';

type PrivateRouteRoleProps = {
  allowedRoles: UserRole[];
  children: JSX.Element;
  redirectTo?: AppRoute;
}

const PrivateRouteRole = ({ children, allowedRoles, redirectTo }: PrivateRouteRoleProps): JSX.Element | null => {
  const user = useAppSelector(getUser);

  // Проверяем, есть ли пользователь и входит ли его роль в список разрешенных
  const isRoleAllowed = !!user && allowedRoles.includes(user.role);

  return (
    isRoleAllowed
      ? children
      : <Navigate to={redirectTo || AppRoute.NotFound} />
  );
};

export default PrivateRouteRole;
