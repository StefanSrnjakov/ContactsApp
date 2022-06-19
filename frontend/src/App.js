import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {UserContext} from "./userContext";
import './App.css';
import Logout from './components/Logout';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AddNewContact from './components/AddNewContact';
import Contacts from './components/Contacts';
import {useState} from "react";
import Contact from './components/Contact';


function App() {

    const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
    const updateUserData = (userInfo) => {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    }

    const update = (userInfo) => {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{
                user: user,
                setUserContext: updateUserData
            }}>
                <div>
                    <Header/>

                    <div className="container ">
                        <div className="container-md myContainer" style={{backgroundColor: "white"}}>
                            <Routes>
                                <Route exact path={"/"} element={<Home/>}></Route>
                                <Route exact path={"/login"} element={<Login/>}></Route>
                                <Route exact path={"/register"} element={<Register/>}></Route>
                                <Route exact path={"/logout"} element={<Logout/>}></Route>
                                <Route exact path={"/addNew"} element={<AddNewContact/>}></Route>
                                <Route exact path={"/contacts"} element={<Contacts/>}></Route>
                                <Route exact path={"/contacts/:id"} element={<Contact/>}></Route>
                            </Routes>
                        </div>

                    </div>
                    <Footer/>

                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
