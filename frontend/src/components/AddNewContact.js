import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddNewContact() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const[file, setFile] = useState("");
    const[uploaded, setUploaded] = useState(false);

    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function onSubmit(e){
        e.preventDefault();

        if(!firstName){
            alert("Enter first name!");
            return;
        }
        if(!phoneNumber){
            alert("Enter phone number!");
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneNumber', phoneNumber);
        if(file!=='') {
            formData.append('image', file);
        }
        const res = await fetch('http://localhost:5001/contacts/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('user')).token,
                'userId' : JSON.parse(localStorage.getItem('user')).user._id
            },
            body: formData
        });

        setUploaded(true);
    }
    return (
        <div style={{backgroundColor:"white"}}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {uploaded ? <Navigate replace to="/" /> : ""}
            <h1>Create new contact</h1>
            <form onSubmit={onSubmit}>
                <div className={"form-group"}>
                    <label>First Name</label>
                    <input type={"text"} className={"form-control"} placeholder={"Enter first name"} value={firstName}
                           onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className={"form-group"}>
                    <label>Last name</label>
                    <input type={"text"} className={"form-control"} placeholder={"Enter last name"}
                           value={lastName}
                           onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className={"form-group"}>
                    <label>Telephone number</label>
                    <input type={"text"} className={"form-control"} placeholder={"Enter number"}
                           value={phoneNumber}
                           onChange={e => setPhoneNumber(e.target.value)}/>
                </div>

                <div className={"form-group"}>
                    <label>Add image</label>
                    <input type={"file"} className={"form-control"} onChange={(e)=>{setFile(e.target.files[0])}}/>
                </div>


                <input className={"btn btn-primary"} type="submit" name="submit" value="Save"/>
                <label>{error}</label>

            </form>
        </div>
    );
}

export default AddNewContact;