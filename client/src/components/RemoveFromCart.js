import React from "react";
import {useShoppingCart} from "use-shopping-cart";
import toast from "react-hot-toast";

export default function RemoveFromCart({product}) {
    const {removeItem, cartCount} = useShoppingCart();
    const handleClearCart = () => {
        removeItem(product.sku);
        toast.success(`Removed ${product.name} from cart!`)
    }
    return (
        <button
            disabled={!cartCount}
            className="flex ml-2 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={() => handleClearCart()}>
            Remove
        </button>
    );
}
