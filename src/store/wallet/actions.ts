import { store } from "..";
import { WALLET_CONNECTED } from "./types";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../../components/wallet/connectors"


const { active, account, library, connector, activate, deactivate } = useWeb3React()
export async function connect1(){
    if(active)
        return;
    try {
        console.log("connected1")
        await activate(injected)
        store.dispatch({ type: WALLET_CONNECTED, payload: {address: account}});
        // store.dispatch({ type: WALLET_ADDRESSS, payload: account});
    } catch (ex) {
        console.log(ex)
    }
}

