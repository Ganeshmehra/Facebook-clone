import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import Firebase Authentication
import 'firebase/compat/database'; // Import Firebase Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyC4_dHN1p_AomAGQXukCYvaDD5dk8X665Q",
    authDomain: "facebook-clone-react-52a9a.firebaseapp.com",
    projectId: "facebook-clone-react-52a9a",
    storageBucket: "facebook-clone-react-52a9a.appspot.com",
    messagingSenderId: "56357842232",
    appId: "1:56357842232:web:f932343625c9af971e65cd"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Sign_Up = () => {
    const [data1, setData1] = useState({ name: "", email: "", phone: "", password: "" });
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersRef = firebase.database().ref("signup");
                usersRef.on("value", (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setUsers(Object.values(data));
                    } else {
                        setUsers([]);
                    }
                });
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchUsers();

        // Cleanup listener on unmount
        return () => {
            firebase.database().ref("signup").off();
        };
    }, []);

    const EmailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    const handleChange = (e) => {
        setData1({ ...data1, [e.target.name]: e.target.value });
    };

    const handleClick = async () => {
        if (validateData()) {
            const FindData = users.find(user => user.email === data1.email);
            if (FindData) {
                toast.info("User already exists");
            } else {
                try {
                    // Sign up using Firebase Authentication
                    await firebase.auth().createUserWithEmailAndPassword(data1.email, data1.password);

                    // Save user data to Firebase Realtime Database
                    const database = firebase.database();
                    const newIndex = users.length; // Use length as index
                    await database.ref("signup").push({
                        name: data1.name,
                        email: data1.email,
                        phone: data1.phone
                    });

                    toast.success("Sign Up Successful");
                    navigate("/Log_In");
                } catch (error) {
                    toast.error(error.message);
                }
            }
        }
        setData1({ name: "", email: "", phone: "", password: "" });
    };

    const validateData = () => {
        let valid = true;
        if (data1.name?.length === 0) {
            toast.error("Please enter the name");
            valid = false;
        } else if (data1.name.length < 5) {
            toast.error("Name must be at least 5 characters long");
            valid = false;
        }
        if (data1.email?.length === 0) {
            toast.error("Please enter the email");
            valid = false;
        } else if (!EmailRegex.test(data1.email)) {
            toast.error("Invalid email");
            valid = false;
        }
        if (data1.phone?.length === 0) {
            toast.error("Please enter the phone number");
            valid = false;
        } else if (data1.phone.length < 10) {
            toast.error("Invalid phone number");
            valid = false;
        }
        if (data1.password?.length === 0) {
            toast.error("Please enter the password");
            valid = false;
        } else if (!passwordRegex.test(data1.password)) {
            toast.error("Invalid password");
            valid = false;
        }

        return valid;
    };

    return (
        <>
            <section className='d-flex justify-content-center flex-column p-5' style={{ background: 'rgb(196 240 221)' }}>
                <nav className='d-flex border border-2 w-100'>
                    <div className='w-100' style={{ backgroundColor: "#ff03a2" }}>
                        <Link className="nav-link text-center" to={"/Sign_Up"}>Sign Up</Link>
                    </div>
                    <div className='w-100' style={{ backgroundColor: "#8fc7ef" }}>
                        <Link className="nav-link text-center" to={"/Log_In"}>Log In</Link>
                    </div>
                </nav>
                <div className='row d-flex justify-content-center align-items-center min-vh-100'>
                    <div className='col-md-6 col-12'>
                        <div className='container text-center w-100'>
                            <div className='my-3'>
                                <h1>Create account</h1>
                            </div>
                            <div className='my-3'>
                                <label htmlFor="name" className='d-flex justify-content-start text-info'>Name</label>
                                <input type="text" className="form-control rounded-pill" placeholder='Enter name here' name='name' onChange={handleChange} value={data1.name} />
                            </div>
                            <div className='my-3'>
                                <label htmlFor="email" className='d-flex justify-content-start text-info'>Email</label>
                                <input type="email" className="form-control rounded-pill" placeholder='Enter email here' name='email' onChange={handleChange} value={data1.email} />
                            </div>
                            <div className='my-3'>
                                <label htmlFor="phone" className='d-flex justify-content-start text-info'>Phone Number</label>
                                <input type="number" className="form-control rounded-pill" placeholder='Enter phone number here' name='phone' onChange={handleChange} value={data1.phone} />
                            </div>
                            <div className='my-3'>
                                <label htmlFor="password" className='d-flex justify-content-start text-info'>Password</label>
                                <input type="password" className="form-control rounded-pill" placeholder='Enter password here' name="password" onChange={handleChange} value={data1.password} />
                            </div>
                            <div>
                                <button className='btn btn-dark form-control rounded-pill' onClick={handleClick}>Sign Up</button>
                            </div>
                            <Link className="nav-link my-2" to="/Log_In">I already have an account</Link>
                            <div className='d-flex justify-content-center align-items-center my-2'>
                                <hr className="w-25" />
                                <span className='mx-2'>Or</span>
                                <hr className="w-25" />
                            </div>
                            <div className="d-flex align-items-center justify-content-center form-control rounded-pill my-2" style={{ cursor: "pointer" }}>
                                <FcGoogle /> Log in with Google
                            </div>
                            <div className="d-flex align-items-center justify-content-center form-control rounded-pill my-2" style={{ cursor: "pointer" }}>
                                <FaSquareFacebook /> Log in with Facebook
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-12 d-none d-md-block'>
                        <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                            alt="Sign Up Background" className='img-fluid shadow bg-body w-100' />
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Sign_Up;
