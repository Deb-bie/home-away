import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db} from '../../firebase/Firebase';
import { setDoc, Timestamp, doc } from "firebase/firestore"; 

// import Navbar from '../../components/navbar/Navbar'
import './register.css'


const Register = () => {

    const navigate = useNavigate();
    const user = auth.currentUser;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);
  
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const loadingRef = useRef();
    const passwordConfirmRef = useRef();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(`Email: ${email}, Password: ${password}, Username: ${username}`);
        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
          console.log('save user');
          setDoc(doc(db, 'users', userCredentials.user.uid), {
            uid: userCredentials.user.uid,
            username, email, password, createdAt: Timestamp.fromDate(new Date()), isOnline: true, displayName: username
          }).then(navigate("/"))
        }).catch(err => console.log(err.message))
    }


    return (
        <div className="registerContainer">
            <div classname="registerWrapper">
                {/* <Navbar hides="none" /> */}

                <div className="mainRegisterWrapper">
                    <div className="create">Register</div>

                    <form onSubmit={handleRegister}>
                        <div className="formGroup">
                            <label>Username</label>
                            <br />
                            <input
                                type='text'
                                required
                                id="username"
                                name='username'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="formGroup">
                            <label>Email address</label>
                            <br />
                            <input
                                type='email'
                                required
                                id="email"
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="formGroup">
                            <label>Password</label>
                            <br />
                            <input
                                type='password'
                                required
                                id="password"
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>


                        <div className="formGroup">
                            <label>Confirm Password</label>
                            <br />
                            <input
                                type='password'
                                required
                                id="passwordConfirm"
                                name='passwordConfirm'
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>

                        <div className="continue" disabled={loading}>
                            <button>Register</button>
                        </div>

                        {/* {data && <span>{data.errorMsg}</span>} */}
                    </form>

                    <div className="already">
                        Already have an account? <Link to='/login'>Log In </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register