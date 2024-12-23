import React, { useState, useEffect } from 'react';
import { FaUserFriends, FaBars, FaUsers, FaVideo, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4_dHN1p_AomAGQXukCYvaDD5dk8X665Q",
    authDomain: "facebook-clone-react-52a9a.firebaseapp.com",
    projectId: "facebook-clone-react-52a9a",
    storageBucket: "facebook-clone-react-52a9a.appspot.com",
    messagingSenderId: "56357842232",
    appId: "1:56357842232:web:f932343625c9af971e65cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const Container1 = () => {
    const [userData, setUserData] = useState({ name: '', profilePic: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = ref(db, `users/${user.uid}`); // Fetch user data based on authenticated user ID

                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setUserData({
                            name: data.name,
                            profilePic: data.profilePic || 'https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' // Provide a default URL if none is available
                        });
                    }
                    setLoading(false); // Set loading to false once data is fetched
                });
            } else {
                // Handle the case where the user is not authenticated
                setLoading(false);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on component unmount
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Show a loading message or spinner while fetching data
    }

    return (
        <section className="container my-3">
            <div className="row">
                <div className='d-flex flex-column '>
                    <div className="col-12 mb-3">
                        <Link to="/UserPost" className="d-flex align-items-center text-dark text-decoration-none">
                            <img
                                src={userData.profilePic} // Firebase profile pic
                                alt="Profile"
                                className="rounded-circle me-2"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <h3 className="fs-6 text-dark">{userData.name}</h3>
                        </Link>
                    </div>
                    <div className="col-12 mb-3">
                        <Link to="" className="d-flex align-items-center text-dark text-decoration-none">
                            <FaUserFriends className="me-2" />
                            <h3 className="fs-6 mb-0">Friends</h3>
                        </Link>
                    </div>
                    <div className="col-12 mb-3">
                        <Link to="" className="d-flex align-items-center text-dark text-decoration-none">
                            <FaBars className="me-2" />
                            <h3 className="fs-6 mb-0">Feed</h3>
                        </Link>
                    </div>
                    <div className="col-12 mb-3">
                        <Link to="" className="d-flex align-items-center text-dark text-decoration-none">
                            <FaUsers className="me-2" />
                            <h3 className="fs-6 mb-0">Group</h3>
                        </Link>
                    </div>
                    <div className="col-12 mb-3">
                        <Link to="" className="d-flex align-items-center text-dark text-decoration-none">
                            <FaVideo className="me-2" />
                            <h3 className="fs-6 mb-0">Videos</h3>
                        </Link>
                    </div>
                    <div className="col-12 mb-3">
                        <Link to="" className="d-flex align-items-center text-dark text-decoration-none">
                            <FaCaretDown className="me-2" />
                            <h3 className="fs-6 mb-0">See More</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Container1;
