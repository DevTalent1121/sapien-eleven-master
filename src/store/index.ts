import { createStore, combineReducers } from "redux";
import { shopifyReducer } from "./shopify/reducers";
import { cartUIReducer } from "./cartUI/reducers";
import { variantsReducer } from "./variants/reducers";
import { menuReducer } from "./menu/reducers";
import { WalletReducer } from "./wallet/reducers";


const rootReducer = combineReducers({
    shopify: shopifyReducer,
    cartUI: cartUIReducer,
    variants: variantsReducer,
    menu: menuReducer,
    wallet: WalletReducer,
});

// const rootReducer = combineReducers({
//     shopify: shopifyReducer,
//     cartUI: cartUIReducer,
//     variants: variantsReducer,
// });

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
