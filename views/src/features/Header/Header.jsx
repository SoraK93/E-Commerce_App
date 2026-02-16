import { Link, useSubmit } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../users/usersSlice";

const Header = () => {
  const userInfo = useSelector(selectUser.info);
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
          <li>cart icon</li>
          {userInfo.name ? (
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
