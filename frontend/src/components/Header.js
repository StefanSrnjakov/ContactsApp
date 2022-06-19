import {Link} from "react-router-dom";
import {UserContext} from "../userContext";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AddBoxIcon from '@mui/icons-material/AddBox';

function Header() {
    return (<header>
        <div className={"m-4 p-1"}>
            <nav className={"navbar navbar-expand-lg fixed-top"} color={"white"}>
                <div className="container-fluid">

                    {/*Logo*/}
                    <span>Contacts App</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        <Link className="nav-link" to='#'><HomeIcon/>&nbsp;&nbsp;Home</Link>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <UserContext.Consumer>
                            {context => (<>

                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        {context.user !== null && <>
                                            <li className="nav-item">
                                                <Link className="nav-link"
                                                      to='/contacts'><MenuBookIcon/>&nbsp;&nbsp;Contacts</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link"
                                                      to='/addNew'><AddBoxIcon/>&nbsp;&nbsp;Add new contact</Link>
                                            </li>
                                        </>
                                        }
                                    </ul>
                                    {/*Right nav bar*/}
                                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                                        {context.user === null && <>
                                            <li className="nav-item">
                                                <Link className="nav-link"
                                                      to='/login'><LoginIcon/>&nbsp;&nbsp;Log in</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link"
                                                      to='/register'><HowToRegIcon/>&nbsp;&nbsp;Register</Link>
                                            </li>
                                        </>}
                                        {context.user !== null &&
                                            <li className="nav-item">
                                                <Link className="nav-link" to='/logout'><LogoutIcon/> &nbsp;&nbsp;Log
                                                    Out</Link>
                                            </li>}
                                    </ul>
                                </>
                            )}
                        </UserContext.Consumer>
                    </div>
                </div>
            </nav>
        </div>
    </header>);
}

export default Header;