import { useEffect } from "react";
import { useOutletContext } from "react-router";

const PlaceOrder = () => {
  const { btnText, setBtnText } = useOutletContext();

  useEffect(() => {
    setBtnText("Place your Order")
  }, [btnText])

  return (
    <>
      <h1>Confirm order details</h1>
    </>
  );
};

export const Component = PlaceOrder;
