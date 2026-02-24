import { useState } from "react";
import { Outlet } from "react-router";

const OrderPage = () => {
  const [btnText, setBtnText] = useState(null);

  return (
    <>
      <Outlet context={{ btnText, setBtnText }} />
      <div>
        <p>SubTotal (#item count): #amount</p>
        <button>{btnText}</button>
      </div>
    </>
  );
};

export { OrderPage };
