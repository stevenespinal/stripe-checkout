import React from "react";
import formatProductPrice from "../utils/formatProductPrice";
import {useShoppingCart} from "use-shopping-cart";

export default function CartItem({cartItem}) {
  const {name, image} = cartItem;

  const {setItemQuantity} = useShoppingCart();

  const handleQuantityChange = (event) => {
    setItemQuantity(cartItem.sku, event.target.value)
  }

  return (
    <div className="flex w-full">
      <div className="flex items-center px-4 py-3 hover:bg-gray-100 -mx-4 w-full justify-between">
        <div className="flex">
          <img
            className="h-16 w-16 rounded-full object-cover mx-1"
            src={image}
            alt={name}
          />
          <p className="text-gray-600 text-lg mx-2">
            <span className="font-bold">{name}</span> <br />
            {formatProductPrice(cartItem)} x {cartItem.quantity}
          </p>
        </div>
        <div>
          <input
            style={{ width: 50 }}
            className="border-solid border-2"
            type="number"
            value={cartItem.quantity}
            min={0}
            onChange={(e) => handleQuantityChange(e)}
          />
        </div>
      </div>
    </div>
  );
}
