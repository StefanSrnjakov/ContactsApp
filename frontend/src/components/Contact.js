import {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [contact, setContact] = useState([]);
    const [editClicked, setEditClicked] = useState(false);
    const params = useParams();
    useEffect(function () {
        const getContact = async function () {
            const res = await fetch('http://localhost:5002/contacts/' + params.id, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'auth-token': JSON.parse(localStorage.getItem('user')).token,
                    'userId': JSON.parse(localStorage.getItem('user')).user._id
                }
            });
            const data = await res.json();
            setContact(data);
        }
        getContact();
    }, []);

    async function save() {
        const bodyData= {
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber
        }
        const res = await fetch('http://localhost:5002/contacts/' + params.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('user')).token,
                'userId': JSON.parse(localStorage.getItem('user')).user._id,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });
        const data = await res.json();
        setContact(data);
        setEditClicked(false)
    }
    async function deleteContact() {
        await fetch('http://localhost:5002/contacts/' + params.id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('user')).token,
                'userId': JSON.parse(localStorage.getItem('user')).user._id,
                'Content-Type': 'application/json'
            },
        });

    }

    return (
        <>
            <h3>Contact:</h3>
            <div className="row" style={{margin: "10px", padding: "20px"}}>
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
                    paddingTop: "2%"
                }}>
                    <div style={{
                        fontSize: "20px",
                    }}>
                        {!editClicked && <div>
                            <span>first name:  <b>{contact.firstName}</b></span><br/>
                            <span>last name:  <b>{contact.lastName}</b></span><br/>
                            <span>phone number:  <b>{contact.phoneNumber}</b></span>
                        </div>}
                        {editClicked && <div style={{marginBottom: "20%"}}>
                            <span>first name:  <input className="form-control" type="text"
                                                      placeholder={contact.firstName}
                                                      onChange={e => setFirstName(e.target.value)}/></span>
                            <span>last name:   <input className="form-control" type="text"
                                                      placeholder={contact.lastName}
                                                      onChange={e => setLastName(e.target.value)}/></span>
                            <span>phone number:  <input className="form-control" type="text"
                                                        placeholder={contact.phoneNumber}
                                                        onChange={e => setPhoneNumber(e.target.value)}/></span>
                        </div>}
                    </div>
                </div>
                <div className="col-6" style={{padding: "20px"}}>
                    {!editClicked && <button className="btn btn-primary" onClick={() => {
                        setEditClicked(true)
                    }}><EditIcon/> edit</button>}
                    {editClicked && <button className="btn btn-primary" onClick={save}><SaveIcon/> save</button>}
                    <br/>
                    <br/>
                    <Link to={"/"}><button className="btn btn-danger" onClick={deleteContact}><DeleteForeverIcon/>delete</button></Link>
                </div>
            </div>

        </>
    );
}

export default Contact;