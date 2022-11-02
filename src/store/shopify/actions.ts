import { store } from "..";
import { LineItem } from "shopify-buy";
import { CHECKOUT_CREATED } from "./types";

export function addVariantToCart(variantId: string | number, quantity: number) {

    const { shopify } = store.getState();
    const { cart, client } = shopify;
    var idToUseWithAddLineItems = btoa(variantId.toLocaleString());
    const lineItemsToAdd = [{ variantId:idToUseWithAddLineItems, quantity }];
    // const lineItemsToAdd = [{ variantId, quantity }];
    if (cart && client) {
        const checkoutId = cart.id;
        // client.checkout.addLineItems(checkoutId, lineItemsToAdd);
        console.log(client.product.variantForOptions);
        client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
            // Do something with the updated checkout
            // checkout.lineItemCount = cart.lineItemCount + quantity;

            console.log(checkout.lineItems.length);
            store.dispatch({ type: CHECKOUT_CREATED, payload: { cart: checkout } });
            // console.log(checkout.lineItems[0].va);
        });

    }

}


export function decrementQuantity(lineItem: LineItem) {
    const updatedQuantity = lineItem.quantity - 1;
    updateQuantityInCart(lineItem.id, updatedQuantity);
}

export function incrementQuantity(lineItem: LineItem) {
    const updatedQuantity = lineItem.quantity + 1;
    updateQuantityInCart(lineItem.id, updatedQuantity);
}

export function removeLineItemFromCart(lineItemId: string | number) {
    const { shopify } = store.getState();
    const { cart, client } = shopify;
    if (client && cart) {
        const checkoutId = cart.id;
        client.checkout.removeLineItems(checkoutId, [lineItemId.toString()]).then((checkout) =>{
            store.dispatch({ type: CHECKOUT_CREATED, payload: { cart: checkout } });
        });
    }
}

function updateQuantityInCart(id: string | number, quantity: number) {
    const { shopify } = store.getState();
    const { cart, client } = shopify;
    if (client && cart) {
        const checkoutId = cart.id;
        client.checkout.updateLineItems(checkoutId, [{ id, quantity }]).then((checkout) => {
            store.dispatch({ type: CHECKOUT_CREATED, payload: { cart: checkout } });
        });
    }
}
