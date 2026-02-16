import { useSelector } from "react-redux";
import { selectUser } from "../usersSlice";
import { useLocation } from "react-router";

const ViewProfile = () => {
  const userInfo = useSelector(selectUser.info);
  const location = useLocation();

  return (
    <>
      {location.state?.passwordChange && (
        <p>
          <em>Password successfully changed</em>
        </p>
      )}
      <div>
        <p>User: {userInfo.name}</p>
        <p>Phone: {userInfo.phone}</p>
        <p>Address: {userInfo.address}</p>
      </div>
    </>
  );
};

export { ViewProfile };
