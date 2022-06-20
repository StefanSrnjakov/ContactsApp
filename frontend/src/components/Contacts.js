import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';

function Contacts() {
    const [contacts, setContacts] = useState([]);

    useEffect(function () {

        const getContacts = async function () {

            const res = await fetch('http://localhost:5002/contacts', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('user')).token,
                    'userId': JSON.parse(localStorage.getItem('user')).user._id,
                }
            });
            const data = await res.json();
            setContacts(data.contacts);
        }
        getContacts();
    }, []);

    return (
        <>
            <h3>Contacts:</h3>
            <ul>
                {
                    contacts.map(contact => (
                        <div key={contact._id} className="row" style={{margin: "10px"}}>
                            <div className="col-3" style={{
                                backgroundColor: "whitesmoke",
                                borderTopLeftRadius: "100px",
                                borderBottomLeftRadius: "100px"
                            }}>
                                <img alt={contact.firstName} style={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "50%"
                                }} src={"http://localhost:5002/images/" + contact.imgUrl}/><br/>
                            </div>
                            <div className="col-3" style={{
                                backgroundColor: "whitesmoke",
                                borderTopRightRadius: "100px",
                                borderBottomRightRadius: "100px",
                                paddingTop: "3%"
                            }}>
                                <div style={{
                                    fontSize: "20px",
                                }}>
                                    <span>first name:  {contact.firstName}</span><br/>
                                    <span>last name:  {contact.lastName}</span>
                                </div>
                            </div>
                            <div className="col-6" style={{padding: "20px"}}>
                                <Link to={"/contacts/" + contact._id}><InfoIcon sx={{fontSize: 40}}
                                                                                color="primary"/></Link><br/>
                                <a href={"tel:"+contact.phoneNumber}><CallIcon sx={{fontSize: 40}} color="success"/></a>

                            </div>
                        </div>
                    ))
                }
            </ul>
        </>
    );
}

export default Contacts;