import * as React from "react";
import Auth from "../build/contracts/Auth.json";
import { loadContract, getAccounts, loadWeb3 } from "../web3helpers";
import "./index.css";

import { useNavigate } from "react-router-dom";
export default function SignUp() {
    const [username, setUsername] = React.useState("");
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

    const signUp = async () => {
        if (!username || !email || !password) {
            alert("Please fill all details.");
            return;
        }

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailformat)) {
            alert("Please enter valid email address.");
            return;
        }

        try {
            await authContract.methods
                .createUser(username, email, password)
                .send({ from: account });

            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            navigate("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    React.useEffect(() => {
        loadWeb3();
    }, []);

    React.useEffect(() => {
        loadAccount();
    }, []);

    return (
        <div class="box">
            <h1>Register New Wallet</h1>
            <img
                src={require('../resources/eth3.webp')}
                alt="ETH"
            />
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
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
            <button class="custom-btn" onClick={signUp}>
                {" "}
                Sign Up
            </button>
        </div>
    );
}

