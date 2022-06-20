import React, {useContext, useState} from "react";
import {UserContext} from "../userContext";

// import '../styles/formStyle.css'

function Login() {

    const userContext = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function login(event) {
        event.preventDefault();
        const res = await fetch('http://localhost:5002/login', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await res.json();

        if (data.token !== undefined) {
            userContext.setUserContext(data);
            window.location.href = "/";
        } else {
            setUsername("");
            setPassword("");
            if (data.error !== undefined)
                setError(data.error);
            else
                setError("Unexpected error");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <div className={"form-group"}>
                    <label>Username</label>
                    <input type={"text"} className={"form-control"} placeholder={"Enter username"} value={username}
                           onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className={"form-group"}>
                    <label>Password</label>
                    <input type={"password"} className={"form-control"} placeholder={"Enter password"}
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <input className={"btn btn-primary"} type={"submit"} name="submit" value="Log in"/>
                <label>{error}</label>
            </form>
        </div>
    );
}

export default Login;