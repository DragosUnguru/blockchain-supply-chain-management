import Web3 from "web3/dist/web3.min.js";

export const loadWeb3 = async () => {
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
} else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
} else {
    window.alert(
    "Non-Ethereum browser detected. Install Ganache."
    );
}
};

export const loadContract = async (contractJson) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();

    if (networkId) {
        const contractObj = new web3.eth.Contract(
            contractJson.abi,
            contractJson.networks[networkId].address
        );
        return contractObj;
    }
}

export const getAccounts = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();

    return accounts;
};

export const getFunds = async (account) => {
    const web3 = window.web3;
    return web3.eth.getBalance(account);
}
