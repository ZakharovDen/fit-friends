import AccountContentCoach from "../../components/account-content-coach/account-content-coach";
import AccountContentSportsman from "../../components/account-content-sportsman/account-content-sportsman";
import UserInfo from "../../components/user-info/user-info";
import { useAppSelector } from "../../hooks";
import { getUser } from "../../store/user/selectors";
import { UserRole } from "../../types/user/user-role.enum";
import NotFoundScreen from "../not-found-screen/not-found-screen";

function AccountScreen(): JSX.Element {
  const user = useAppSelector(getUser);
  if (!user) {
    return <NotFoundScreen />
  }

  let content: JSX.Element | undefined = undefined;
  if (user.role === UserRole.Coach) {
    content = <AccountContentCoach />
  }
  if (user.role === UserRole.Sportsman){
    content = <AccountContentSportsman />
  }

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <UserInfo user={user} />
            {content}
          </div>
        </div>
      </section >
    </main >
  );
}

export default AccountScreen;