// Wallet Library Imports
import { useWeb3React } from "@web3-react/core"
import { injected } from "../../components/wallet/connectors"
import { store } from "..";
import { WALLET_CONNECTED } from "./types";

// ****Web3 Connection Mobile
const { active, account, library, connector, activate, deactivate } = useWeb3React()

export function connect1(){
    console.log("connected1")
}

export async function connect() {
    console.log("aaa");
    try {
        await activate(injected)
        console.log("aaa");
        var wallet = {address: account, connected: activate};
        store.dispatch({ type: WALLET_CONNECTED, payload: wallet});
        // store.dispatch({ type: WALLET_ADDRESSS, payload: account});
    } catch (ex) {
        console.log(ex)
    }
}

export async function disconnect() {
    try {
        deactivate()
        store.dispatch({ type: WALLET_CONNECTED, payload: active});
    } catch (ex) {
        console.log(ex)
    }
}        
