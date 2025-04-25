import { useAppSelector } from '../../hooks';
import { getUser } from '../../store/user/selectors';
import { UserRole } from '../../types/user/user-role.enum';
import { Navigate, useLocation } from 'react-router-dom'; // Import useLocation
import { AppRoute } from '../../constant'; // Импортируйте ваш AppRoute

type PrivateRouteRoleProps = {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

const PrivateRouteRole = ({ children, allowedRoles }: PrivateRouteRoleProps): JSX.Element | null => {
  const user = useAppSelector(getUser);
  const location = useLocation(); // Получаем текущий location

  // Проверяем, есть ли пользователь и входит ли его роль в список разрешенных
  const isRoleAllowed = !!user && allowedRoles.includes(user.role);

  if (isRoleAllowed) {
    return children;
  } else {
    // Перенаправляем на страницу входа, сохраняя текущий URL в state
    return (
      <Navigate
        to={AppRoute.Login}
        state={{ from: location }} // Сохраняем текущий location
        replace // Заменяем запись в истории браузера
      />
    );
  }
};

export default PrivateRouteRole;