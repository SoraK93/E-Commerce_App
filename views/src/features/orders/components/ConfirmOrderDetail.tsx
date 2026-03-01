import { useEffect, type JSX } from "react";
import { useOutletContext } from "react-router";

import type { BtnContextInterface } from "../pages/OrderPage";
import { selectOrderList } from "../api/orderSlice";
// import { useAppSelector } from "@app/hook";
import { useSelector } from "react-redux";

/**
 * A sub-component for the order page.
 * This handles all the product and customer details.
 * User will use this to check and confirm there order.
 */
const ConfirmOrderDetail = (): JSX.Element => {
  const orderList = useSelector(selectOrderList);
  const { setBtnText } = useOutletContext<BtnContextInterface>();

  useEffect(() => {
    setBtnText("Confirm your Order");
  }, [setBtnText]);

  return (
    <>
      <h1>Confirm and update order details here</h1>
      <ul>
        {orderList?.map((order: any) => (
          <li key={order.id}>
            <p>{order.name}</p>
            <p>{order.quantity}</p>
            <p>{order.amount}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Component = ConfirmOrderDetail;
