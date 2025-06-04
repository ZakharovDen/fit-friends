import { useEffect } from "react";
import BackButton from "../../components/back-button/back-button";
import { BackButtonDisplayMode } from "../../components/back-button/constant";
import FriendsListItem from "../../components/friends-list-item/friends-list-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFriends } from "../../store/friends/selectors";
import { fetchFriendsAction } from "../../store/friends/thunks";
import { getUser } from "../../store/user/selectors";

function MyFriendsScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const friends = useAppSelector(getFriends);
  const user = useAppSelector(getUser);

  useEffect(() => {
    dispatch(fetchFriendsAction());
  }, [dispatch])

  return (
    <main>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <BackButton displayMode={BackButtonDisplayMode.MyFriends} />
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои друзья</h1>
            </div>
            <ul className="friends-list__list">
              {friends.map((friend) => (
                <FriendsListItem friend={friend} key={friend.id} userRole={user?.role} />
              ))}
            </ul>
            <div className="show-more friends-list__show-more">
              <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MyFriendsScreen;