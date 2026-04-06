import { type JSX } from "react";

const PlaceOrder = (): JSX.Element => {
  return (
    <div>
      <p>Confirmation message: Order placement successful/ failed.</p>
      <button type="button">Homepage</button>
    </div>
  );
};

export const Component = PlaceOrder;
