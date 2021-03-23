import {useShoppingCart} from "use-shopping-cart";
import {toast} from "react-hot-toast";
import axios from "axios";

export default function useCheckout() {
    const {redirectToCheckout, cartDetails} = useShoppingCart();

    async function handleCheckout() {
        const session = await axios.post(`/api/checkout-sessions`, cartDetails).then(res => res.data).catch(error => {
            console.error(error);
            toast.error("Checkout Failed. Please try again!")
        })

        if (session) {
            redirectToCheckout({sessionId: session.id})
        }

    }

    return handleCheckout;
}
