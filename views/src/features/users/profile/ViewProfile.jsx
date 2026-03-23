import { useSelector } from "react-redux";
import { selectUser } from "../usersSlice";

const ViewProfile = () => {
  const userInfo = useSelector(selectUser.info);

  return (
    <>
      <div>
        <p>User: {userInfo.name}</p>
        <p>Phone: {userInfo.phone}</p>
        <p>Address: {userInfo.address}</p>
      </div>
    </>
  );
};

export { ViewProfile };
