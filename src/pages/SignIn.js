import * as React from "react";
import Auth from "../build/contracts/Auth.json";
import { loadContract, getAccounts, loadWeb3 } from "../web3helpers";
import { useNavigate } from "react-router-dom";
import "./index.css"

export default function SignIn() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const [account, setAccount] = React.useState(null);
    const [authContract, setAuthContract] = React.useState(null);

    const loadAccount = async () => {
        let auth = await loadContract(Auth);
        let accounts = await getAccounts();

        setAccount(accounts[0]);
        setAuthContract(auth);
    };

    const login = async () => {
        if (!email || !password) {
            alert("Please fill in all details.");
            return;
        }

        try {
            const res = await authContract.methods.usersList(email).call();

            if (res.password === password) {
                localStorage.setItem("email", email);
                localStorage.setItem("account", account);
                navigate("/home");
            } else {
                alert("Wrong user credentials.");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    React.useEffect(() => {
        loadWeb3();
    }, []);

    React.useEffect(() => {
        loadAccount();
    }, []);

    return (
        <div className="box">
        <h1>Supply Chain Management Portal</h1>
        <img
            src={require('../resources/eth3.webp')}
            alt="ETH"
        />
        <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="text"
        />
        <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
        />
        <button className="custom-btn" onClick={login}>
            {" "}
            Sign in
        </button>
        {/* <p> */}
            <button className="custom-btn" onClick={() => {
                navigate("/signup");
            }}>
                No account? Register now!
            </button>
        {/* </p> */}
        </div>
    );
}
