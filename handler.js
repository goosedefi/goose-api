import {buildResponse, failure} from "./response-lib";
import Web3 from "web3";
import eggABI from "./abi/eggToken.json";
import BigNumber from "bignumber.js";

const web3 = new Web3(process.env.Provider);
const contract = new web3.eth.Contract(eggABI, process.env.EggAddress);

export async function getTotalSupply() {
    try {
        const totalSupply = await contract.methods.totalSupply().call();
        const burnt = await contract.methods.balanceOf(process.env.BurnAddress).call();
        const circ = new BigNumber(totalSupply).minus(new BigNumber(burnt));
        return success(circ.shiftedBy(-18).toNumber().toString());
    } catch (e) {
        return failure(e);
    }
}

export async function getCirculatingSupply() {
    try {
        const totalSupply = await contract.methods.totalSupply().call();
        const burnt = await contract.methods.balanceOf(process.env.BurnAddress).call();
        const circ = new BigNumber(totalSupply).minus(new BigNumber(burnt));
        return success(circ.shiftedBy(-18).toNumber().toString());
    } catch (e) {
        return failure(e);
    }
}

function success(body){
    return buildResponse(200, body, {"Cache-Control": "max-age=500"});
}