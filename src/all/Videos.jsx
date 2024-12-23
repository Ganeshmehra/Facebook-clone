import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShare, FaThinkPeaks, FaUserFriends, FaBars, FaUsers, FaStore, FaVideo, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Vidios = () => {
 return (
        <>
        <Navbar/>
            <section className='d-flex'>
                <div className="container my-3" style={{ width: "25%", position: "fixed", height: "100vh", overflow: "hidden" }}>
                    <div className="d-flex flex-column align-items-start text-center gap-3">
                        <div className="box1 mb-3">
                            <Link to={"/UserPost"} className="d-flex align-items-center text-dark text-decoration-none">
                                <img src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile" className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
                                <h3 className="fs-6 mb-0">ganesh@</h3>
                            </Link>
                        </div>
                        <div className="box1 mb-3">
                            <Link to={""} className="d-flex align-items-center text-dark text-decoration-none">
                                <FaUserFriends className="me-2" />
                                <h3 className="fs-6 mb-0">Friends</h3>
                            </Link>
                        </div>
                        <div className="box1 mb-3">
                            <Link to={""} className="d-flex align-items-center text-dark text-decoration-none">
                                <FaThinkPeaks className="me-2" />
                                <h3 className="fs-6 mb-0">Professional Dashboard</h3>
                            </Link>
                        </div>
                        <div className="box1 mb-3">
                            <Link to={""} className="d-flex align-items-center text-dark text-decoration-none">
                                <FaBars className="me-2" />
                                <h3 className="fs-6 mb-0">Feed</h3>
                            </Link>
                        </div>
                        <div className="box1 mb-3">
                            <Link to={""} className="d-flex align-items-center text-dark text-decoration-none">
                                <FaUsers className="me-2" />
                                <h3 className="fs-6 mb-0">Group</h3>
                            </Link>
                        </div>
                        <div className="box1 mb-3">
                            <Link to={""} className="d-flex align-items-center text-dark text-decoration-none">
                                <FaStore className="me-2" />
                                <h3 className="fs-6 mb-0">Marketplace</h3>
                            </Link>
                        </div>
                        <div className="box1 mb-3">
                            <Link to={""} className="d-flex align-items-center text-dark text-decoration-none">
                                <FaVideo className="me-2" />
                                <h3 className="fs-6 mb-0">Videos</h3>
                            </Link>
                        </div>
                        <div className="box1 mb-3">
                            <Link to={""} className="d-flex align-items-center text-dark text-decoration-none">
                                <FaCaretDown className="me-2" />
                                <h3 className="fs-6 mb-0">See More</h3>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-2 w-100" style={{ marginLeft: "25%", height: "100vh", overflowY: "auto", padding: "10px" }}>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="https://youtu.be/Ki_0iES2cGI?si=9iSbWBLJAGD9abk6" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="https://youtu.be/VlkOmrt94aQ?si=wY83wEPNzxCQILH2" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '35px' }}
                                    />
                                    <p className="mb-0">User Name</p>
                                </div>
                                <button className="btn-close"></button>
                            </div>
                            <p>Post text goes here...</p>
                            <video src="" className="img-fluid" style={{ width: '100%', height: 'auto' }} controls autoPlay></video>
                            <hr />
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div><FaThumbsUp />  likes</div>
                                    <div> <FaComment /></div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-around fs-4">
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }} >
                                        <FaThumbsUp />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaComment />
                                    </button>
                                    <button className="btn" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                                        <FaShare />
                                    </button>
                                </div>

                               
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Vidios;
