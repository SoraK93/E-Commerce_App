import { Outlet } from "react-router";

import { Header, Footer } from "../features";
import { getUserCart } from "../features/cart/api/cartAPI";
import { getUser } from "../features/users/usersAPI";
import { handleStoreDispatch } from "../utilities/route-helper";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export const loader = async () => {
  await handleStoreDispatch({ api: getUser });
  await handleStoreDispatch({ api: getUserCart });
};

export const Component = App;
