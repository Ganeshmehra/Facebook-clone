import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import Firebase Auth
import 'firebase/compat/database'; // Import Firebase Realtime Database

// Firebase Configuration (if not initialized earlier)
const firebaseConfig = {
  apiKey: "AIzaSyC4_dHN1p_AomAGQXukCYvaDD5dk8X665Q",
  authDomain: "facebook-clone-react-52a9a.firebaseapp.com",
  projectId: "facebook-clone-react-52a9a",
  storageBucket: "facebook-clone-react-52a9a.appspot.com",
  messagingSenderId: "56357842232",
  appId: "1:56357842232:web:f932343625c9af971e65cd"
};

// Initialize Firebase (if not initialized earlier)
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

const Log_In = () => {
  const [data2, setData2] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const EmailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    if (validateData()) {
      try {
        // Firebase sign-in method
        const userCredential = await Firebase.auth().signInWithEmailAndPassword(data2.email, data2.password);
        const user = userCredential.user;
  
        if (user) {
          // Reference to the user data in Firebase Realtime Database
          const userRef = Firebase.database().ref('users/' + user.uid);
  
          // Retrieve the current data
          const snapshot = await userRef.once('value');
          const currentData = snapshot.val() || {};
  
          // Update only the fields that have changed
          await userRef.update({
            email: data2.email,
            name: data2.name
          });
  
          navigate("/Home");
          toast.success("Log in Success");
          setData2({ email: "", password: "", name: "" });
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            toast.error("Invalid email format");
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            toast.error("Incorrect email or password");
            break;
          case 'auth/network-request-failed':
            toast.error("Network error, please try again later");
            break;
          default:
            toast.error("Login Failed: " + error.message);
        }
      }
    }
  };

  const validateData = () => {
    let valid = true;
    if (data2.email.length === 0) {
      toast.error("Please enter the email");
      valid = false;
    } else if (!EmailRegex.test(data2.email)) {
      toast.error("Invalid email");
      valid = false;
    }

    if (data2.password.length === 0) {
      toast.error("Please enter the password");
      valid = false;
    } else if (!passwordRegex.test(data2.password)) {
      toast.error("Invalid password");
      valid = false;
    }

    if (data2.name.length === 0) {
      toast.error("Please enter the name");
      valid = false;
    }

    return valid;
  };

  return (
    <>
      <section className='d-flex justify-content-center flex-column p-5' style={{ background: 'rgb(196 240 221)' }}>
        <nav className='d-flex border border-2 w-100'>
          <div className='w-100 text-red' style={{ backgroundColor: "#ff03a2" }}>
            <Link className="nav-link text-center" to={"/Sign_Up"}>Sign Up</Link>
          </div>
          <div className='w-100 text-red' style={{ backgroundColor: "#8fc7ef" }}>
            <Link className="nav-link text-center" to={"/Log_In"}>Log In</Link>
          </div>
        </nav>
        <div className='row d-flex justify-content-center align-items-center min-vh-100'>
          <div className='col-md-6'>
            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" 
                 alt="Background" className='img-fluid shadow bg-body w-100' />
          </div>
          <div className='col-md-6'>
            <div className='d-flex justify-content-center flex-column loginpage p-4'>
              <div className='my-3 text-center'>
                <h1>Log in to your account</h1>
              </div>
              <div className='my-3'>
                <label htmlFor="name" className='form-label'> Facebook Name</label>
                <input type="text" className="form-control rounded-pill" id="name" placeholder='Enter name' name="name" value={data2.name} onChange={handleChange} />
              </div>
              <div className='my-3'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email" className="form-control rounded-pill" id="email" placeholder='Enter email' name='email' value={data2.email} onChange={handleChange} />
              </div>
              <div className='my-3'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" className="form-control rounded-pill" id="password" placeholder='Enter password' name="password" value={data2.password} onChange={handleChange} />
              </div>
              <div className='text-end'>
                <Link to="#">Forgot Password?</Link>
              </div>
              <div className='text-center my-3'>
                <button className='btn btn-warning btn-sm' onClick={handleClick}>Log in</button>
              </div>
              <div className='text-center'>
                <p>Don't have an account? <Link to="/Sign_Up">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Log_In;
