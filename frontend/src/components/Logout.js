import { useEffect, useContext } from 'react';
import {UserContext} from '../userContext';
import {Navigate} from "react-router-dom";

function Logout() {
    const accountContext = useContext(UserContext);
    useEffect(function () {
        const logout = async function () {
            const data = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': JSON.parse(localStorage.getItem('user')).token,
                    'id': JSON.parse(localStorage.getItem('user')).id
                },
                body: JSON.stringify({
                    id: localStorage.getItem('user').id
                })
            }
            await fetch('http://localhost:5001/logout', data);
            accountContext.setUserContext(null);
        }
        logout();
    }, []);

    return (
        <Navigate replace to="/"/>
    );
}

export default Logout;