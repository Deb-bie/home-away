import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword} from 'firebase/auth'; 
import { auth, db} from '../../firebase/Firebase';
import { doc, updateDoc } from "firebase/firestore"; 

import Navbar from '../../components/navbar/Navbar'

import "../register/register.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const signin = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, 'users', signin.user.uid), {
          isOnline: true,
      });

      setEmail("");
      setPassword("")
      navigate('/')
    } catch (error) {
      console.log(error)
  }    
    navigate("/")
  };




  return (
    <div className="registerContainer">
      <div classname="registerWrapper">
        {/* <Navbar hides="none" /> */}

        <div className="mainRegisterWrapper">
          <div className="create">Log In</div>

          <form onSubmit={handleLogin}>
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

                <div className="continue">
                    <button>Login</button>
                </div>

                {/* {data && <span>{data.errorMsg}</span>} */}
            </form>

            <div className="already">
                Don't have an account? <Link to='/register'>Register </Link>
            </div>
        </div>
      </div>
  </div>

  );
};

export default Login;
