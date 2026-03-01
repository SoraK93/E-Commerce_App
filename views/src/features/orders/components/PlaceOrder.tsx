import { useEffect, type JSX } from "react";
import { useOutletContext } from "react-router";

import type { BtnContextInterface } from "../pages/OrderPage";

const PlaceOrder = (): JSX.Element => {
  const { btnText, setBtnText } = useOutletContext<BtnContextInterface>();

  useEffect(() => {
    setBtnText("Place your Order")
  }, [setBtnText])

  return (
    <>
      <h1>Confirm order details</h1>
    </>
  );
};

export const Component = PlaceOrder;
