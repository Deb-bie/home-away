import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/navbar/Navbar';
import './admin.css'
import Select from 'react-select'
import {useNavigate} from 'react-router-dom';
import { db, storage} from '../../firebase/Firebase.js';
import { addDoc, collection, doc, updateDoc, setDoc } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';


const Admin = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        propertyName: "",
        propertyAddress: "",
        propertyDesc: "",
        rating: "",
        cheapestPrice: "",
        error: "",
        rooms: "",
    });

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        }); 
    }

    const [propertyType, setPropertyType] = useState("");
    const handlePropertyType = (e) => {
        console.log(e.target.value);
        setPropertyType(e.target.value);
    };

    const [propertyCity, setPropertyCity] = useState("");
    const handlePropertyCity = (e) => {
        console.log(e.target.value);
        setPropertyCity(e.target.value);
    };

    const [numberOfRooms, setNumberOfRooms] = useState("");
    const handleNumberOfRooms = (e) => {
        console.log(e.target.value);
        setNumberOfRooms(e.target.value);
    };

    const {propertyName, propertyAddress, propertyDesc, rating, cheapestPrice, error, rooms} = data;


    const handleSubmit = async (e) => {
        e.preventDefault();

        setData({ ...data, error: null});

        try {
            const main = await addDoc(collection(db, "Properties", "Cities" , propertyCity), {
                propertyName,
                propertyAddress,
                propertyDesc,
                rating,
                cheapestPrice,
                propertyCity, 
                rooms,
            });

            await updateDoc(doc(db, "Properties", "Cities" , propertyCity, `${main.id}`), {
                id: main.id
            });

            await setDoc(doc(db, "Properties", "Type" , propertyType, `${main.id}`), {
                propertyName,
                propertyAddress,
                propertyDesc,
                rating,
                cheapestPrice,
                propertyCity,
                propertyType,
                rooms,
            });

            setData({
                ...data, 
                propertName: "", 
                propertyAddress: "",
                propertDesc: "",
                rating: "",
                cheapestPrice: "",
                rooms: "",
            });
            setPropertyCity("");
            setPropertyType("");

        } catch(errors) {
            setData({
                ...data, error: errors.message
            });
            console.log(errors)
        }
    }



    return (
        <div>

            {/* <Navbar /> */}

            <div className="main">
                <div className="app-wrapper">
                    <div className="header">
                        <h1>Add new property</h1>
                    </div>

                    <div className='alert'>
                    {error ? <p>{error}</p> : null}
                </div>

                    <div className="input-container">
                        <form onSubmit={handleSubmit}>

                            <label>Property Name</label>
                            <br />
                            <input 
                                type='text' name='propertyName' value={propertyName} 
                                required onChange={handleChange} placeholder=' Property Name' aria-label='Property Name'
                            />
                            <br /><br />

                            <label>Type of property</label>
                            <br />
                            <select name="selectList" id="selectList" onChange={handlePropertyType}>
                            <option value="" autofocus>Select Property type</option>   
                                <option value="Apartment">Apartment</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Condo">Condo</option>
                                <option value="Beach-house">Beach House</option>
                                <option value="Mansion">Mansion</option>
                            </select>
                            <br /><br />

                            <label>City</label>
                            <br />
                            <select name="selectList" id="selectList" onChange={handlePropertyCity}>
                            <option value="" autofocus>Select City</option>   
                                <option value="London">London</option>
                                <option value="Paris">Paris</option>
                                <option value="New-York">New York</option>
                                <option value="Accra">Accra</option>
                                <option value="Kumasi">Kumasi</option>
                            </select>
                            <br/><br/>

                            <label>Number of Rooms</label>
                            <br />
                            <input 
                                type='number' name='rooms' value={rooms} 
                                required onChange={handleChange} placeholder='Number of Rooms' aria-label='Number of Rooms'
                            />
                            <br /><br />

                            <label>Property Address</label>
                            <br />
                            <input 
                                type='text' name='propertyAddress' value={propertyAddress} 
                                required onChange={handleChange} placeholder=' Property Address' aria-label='Property Name'
                            />
                            <br /><br />


                            <label>Property Description</label>
                            <br />
                            <textarea name="propertyDesc" width="378px" height="100px" value={propertyDesc} required onChange={handleChange} >Enter Description here...</textarea>

                            <br /><br />

                            <label>Cheapest Price</label>
                            <br />
                            <input 
                                type='number' name='cheapestPrice' value={cheapestPrice} 
                                required onChange={handleChange} placeholder=' Cheapest Price' aria-label='Cheapest Price'
                            />
                            <br /><br />

                            <label>Rating</label>
                            <br />
                            <input 
                                type='number' name='rating' value={rating} 
                                required onChange={handleChange} placeholder='Please give it a rate out of 5' aria-label='Rating'
                            />
                            <br /><br />

                    
                            <div className="submit-button">
                                <input type='submit' value='Add' className='submit' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin