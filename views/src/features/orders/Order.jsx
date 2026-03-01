import { handleStoreDispatch } from "@utilities/route-helper";
import { getOrderList } from "./api/orderAPI";
import { OrderPage } from "./pages/OrderPage";

export const loader = async () => {
  return await handleStoreDispatch({ api: getOrderList });
};

export const Component = OrderPage;
