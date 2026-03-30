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
      <nav className="h-12 content-center">
        <ul className="flex justify-between gap-8 text-2xl">
          <li className="p-2">
            <Link to="/">LOGO</Link>
          </li>
          <li className="w-xl p-2">
            <input type="text" placeholder="Search Bar" className="h-8" />
          </li>
          <li className="flex justify-around group p-2">
            <Link to="/cart" className="px-2">
              Cart<span>({cartList?.length})</span>
            </Link>
            {userInfo?.name ? (
              <>
                <Link to={`/user`} className="px-2">
                  {userInfo.name}
                </Link>
                <a onClick={handleClick} className="px-2">
                  Logout
                </a>
              </>
            ) : (
              <Link to="/auth/login" className="px-2">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
