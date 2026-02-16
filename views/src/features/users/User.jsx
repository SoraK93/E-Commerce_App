import { useSelector } from "react-redux";
import { selectUser } from "./usersSlice";
import { Link, Outlet } from "react-router";

const User = () => {
  const userInfo = useSelector(selectUser.info);

  return (
    <div>
      {/* Sidebar */}
      <div>
        <ul>
          <li>
            Profile
            <ul>
              <li>
                <Link to="#">View profile</Link>
              </li>
              <li>
                <Link to={`/user/update`} state={{ mode: "profile" }}>Update profile</Link>
              </li>
              <li>
                <Link to={`/user/update`} state={{ mode: "password" }}>Change password</Link>
              </li>
            </ul>
          </li>
          {userInfo.is_seller && (
            <li>
              Products
              <ul>
                <li>
                  <Link>Add new product</Link>
                </li>
                <li>
                  <Link>Edit product details</Link>
                </li>
                <li>
                  <Link>Delete product</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
      {/* Content related to sidebar */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export { User };
