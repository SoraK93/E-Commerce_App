import { useState, type JSX } from "react";
import { Outlet, useNavigate } from "react-router";

export interface BtnContextInterface {
  btnText: string | null;
  setBtnText: (text: string) => void;
}

/**
 * Renders default order page
 * @returns JSX.Element
 */
const OrderPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [btnText, setBtnText] = useState<string>("Place Order");

  const onButtonClick = (): void => {
    navigate("/order/place-order");
  };

  return (
    <>
      <Outlet context={{ btnText, setBtnText } satisfies BtnContextInterface} />
      <div>
        <p>SubTotal (#item count): #amount</p>
        <button type="button" onClick={onButtonClick}>
          {btnText}
        </button>
      </div>
    </>
  );
};

export { OrderPage };
