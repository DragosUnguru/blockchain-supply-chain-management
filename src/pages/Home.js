import React from "react";
import { loadContract, getFunds, loadWeb3 } from "../web3helpers";
import SupplyChain from '../build/contracts/SupplyChain.json';
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Home() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const account = localStorage.getItem("account");

    const [supplyChainContract, setSupplyChainContract] = React.useState(null);
    const [productNameToCreate, setProductNameToCreate] = React.useState('');
    const [ownedProducts, setOwnedProducts] = React.useState([]);
    const [productIdToTransfer, setProductIdToTransfer] = React.useState('');
    const [transferDestinationAddress, setTransferDestinationAddress] = React.useState('');

    const fetchData = async () => {
        let supplyChainContract = await loadContract(SupplyChain);
        let ownedProducts = await supplyChainContract.methods.getUserProducts(account).call();

        setSupplyChainContract(supplyChainContract);
        setOwnedProducts(ownedProducts.filter(product => product !== undefined && product !== null));

        console.log(`OWNED_PRODUCTS = ${ownedProducts}`);
    }

    const handleCreateProduct = async (event) => {
        event.preventDefault();
        try {
            await supplyChainContract.methods
                .createProduct(productNameToCreate)
                .send({ from: account });
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();

        // Check whether the current account has enough funds
        // before executing the transaction
        const balance = await getFunds(account);
        if (balance < 10000000000000000) {
            alert("Insufficient funds.");
            return;
        }

        supplyChainContract.methods.transferProduct(productIdToTransfer, transferDestinationAddress)
            .send({ from: account })
            .on('transactionHash', (hash) => {
                console.log(`Transaction hash: ${hash}`);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log(`Confirmation number: ${confirmationNumber}`);
            })
            .on('receipt', (receipt) => {
                console.log(`Transaction confirmed: ${receipt.transactionHash}`);
                alert(`Transaction executed. Transaction hash: ${receipt.transactionHash}`)
                fetchData();
            });
    };

    React.useEffect(() => {
        loadWeb3();
    }, []);

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div class="box">
            <h4>Your account: {account} </h4>
            <h4>Your email: {email} </h4>
            <button class="custom-btn"
                onClick={() => {
                    localStorage.removeItem("email");
                    localStorage.removeItem("account");
                    window.location.reload();
                }}
            >
                {" "}
                Log out
            </button>
            <div>
                <h3>My Products</h3>
                {(ownedProducts === undefined || ownedProducts.length) === 0 ? "No products owned" :
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Owner</th>
                        </tr>
                        {ownedProducts.filter((product) => product.productName).map(product => (
                            <tr>
                                <td>{product.productName}</td>
                                <td>{product.id}</td>
                                <td>{`${product.owner.substring(0, 8)}...`}</td>
                            </tr>
                        ))}
                    </table>
                }
            </div>
            <div>
                <h3>Create Product</h3>
                <form onSubmit={handleCreateProduct}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productNameToCreate}
                        onChange={(event) => setProductNameToCreate(event.target.value)}
                    />
                    <p>
                        <button class="custom-btn" type="submit">
                            Create Product
                        </button>
                    </p>
                </form>
            </div>
            <div>
                <h3>Transfer Products</h3>
                <form onSubmit={handleTransfer}>
                    <input
                        type="text"
                        placeholder="Product ID"
                        value={productIdToTransfer}
                        onChange={e => setProductIdToTransfer(e.target.value)}
                    />
                    <p>
                        <input
                            type="text"
                            placeholder="To Address"
                            value={transferDestinationAddress}
                            onChange={e => setTransferDestinationAddress(e.target.value)}
                        />
                    </p>
                    <p>
                        <button class="custom-btn" type="submit">Transfer</button>
                    </p>
                </form>
            </div>
        </div>
    );
}
