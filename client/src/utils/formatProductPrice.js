import {formatCurrencyString} from "use-shopping-cart";

export default function formatProductPrice(product) {
    return formatCurrencyString({
        currency: product.currency,
        value: product.price,
        language: navigator.language
    })
}
