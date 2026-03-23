import { Link, useSubmit } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../users/usersSlice";
import { selectCartList } from "../cart/api/cartSlice";
import { useEffect } from "react";

const Header = () => {
  const userInfo = useSelector(selectUser.info);
  const cartList = useSelector(selectCartList);
  const submit = useSubmit();

  const handleClick = () => {
    submit(null, { method: "POST", action: "/auth/logout" });
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">LOGO</Link>
          </li>
          <li>
            <input type="text" placeholder="Search Bar" />
          </li>
          <li>
            <Link to="/cart">
              Cart<span>({cartList?.length})</span>
            </Link>
          </li>
          {userInfo?.name ? (
            <>
              <li>
                <Link to={`/user`}>{userInfo.name}</Link>
              </li>
              <li>
                <a onClick={handleClick}>Logout</a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export { Header };
