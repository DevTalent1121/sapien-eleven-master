export const WALLET_CONNECTED = "WALLET_CONNECTED";
export const WALLET_DISCONNECTED = "WALLET_DISCONNECTED";
export const WALLET_ADDRESSS = "WALLET_ADDRESSS";

export interface WalletState {
    connected?: boolean;
    address?: string;
}
export interface WalletConnectedAction {
    type: typeof WALLET_CONNECTED;
    payload: {
        address: string;
    };
}
export interface WalletDisconnectedAction {
    type: typeof WALLET_DISCONNECTED;
    payload: {
        address: string;
    };
}

export type WalletActionTypes = WalletConnectedAction | WalletDisconnectedAction ;
