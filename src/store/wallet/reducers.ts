import { WALLET_CONNECTED, WALLET_DISCONNECTED, WalletState, WalletActionTypes } from "./types";

const initialState: WalletState = {
    address: "",
    connected: false,
};

export function WalletReducer(
    state = initialState,
    action: WalletActionTypes,
): WalletState {
    switch (action.type) {
        case WALLET_CONNECTED:
            return { ...state, address: action.payload.address  };
        case WALLET_DISCONNECTED:
            return { ...state, address: action.payload.address  };
        default:
            return state;
    }
}

