import React, { useEffect, useState } from 'react';
import { FaVideo, FaImages, FaFilm, FaRegCommentDots } from 'react-icons/fa';
import { FcLikePlaceholder } from "react-icons/fc";
import { RiShareForward2Fill } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { MdOutlinePublic, MdDelete } from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
    LinkedinIcon, TelegramIcon, TwitterIcon, WhatsappIcon,
    WhatsappShareButton, TwitterShareButton, TelegramShareButton, LinkedinShareButton
} from "react-share";
import { getDatabase, ref, set, push, get, update, onValue, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';



const Container2 = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [condition, setCondition] = useState(false);
    const [commentIndex, setCommentIndex] = useState(null);
    const [comment, setComment] = useState("");
    const auth = getAuth();
    const db = getDatabase();

    const inputData = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const textData = (e) => {
        setText(e.target.value);
    };

    const addPost = async () => {
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const userRef = ref(db, `users/${userId}`);

            // Fetch the user's name and email from the Realtime Database
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val(); // Get the user data (name and email)

                const postsRef = ref(db, 'posts');
                const newPostRef = push(postsRef);

                await set(newPostRef, {
                    name: userData.name,   // Using the name from the Realtime Database
                    email: userData.email, // Using the email from the Realtime Database
                    text: text,
                    image: image,
                    comments: [],
                    likes: [],
                });

                setImage(null);
                setText("");
                setCondition(!condition);
            } else {
                console.error("No user data found in Realtime Database.");
            }
        } else {
            console.error("No user is logged in.");
        }
    };

    const handleComment = (index) => {
        setCommentIndex(index);
    };

    const submitComment = async (index) => {
        if (comment.trim() !== "") {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(db, `users/${user.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val(); // Get the user data (name and profile picture)

                    const postRef = ref(db, 'posts/' + allPosts[index].id);
                    const updatedPosts = [...allPosts];

                    updatedPosts[index].comments = updatedPosts[index].comments || [];
                    updatedPosts[index].comments.push({
                        comment: comment,
                        name: userData.name || "Anonymous",
                        profileImage: userData.profileImage || "https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    });

                    await update(postRef, { comments: updatedPosts[index].comments });

                    setComment("");
                    setCommentIndex(null);
                    setCondition(!condition);
                }
            }
        }
    };


    const handleLike = async (index) => {
        const user = auth.currentUser;
        if (user) {
            const postRef = ref(db, 'posts/' + allPosts[index].id); // Reference to the specific post
            const post = allPosts[index]; // Current post object
            const likesArray = post.likes || []; // Ensure likesArray is an array, default to empty array if undefined

            // Check if the user's email is already in the likes array
            if (likesArray.includes(user.email)) {
                // If the user has already liked, remove their email (dislike)
                post.likes = likesArray.filter(email => email !== user.email);
            } else {
                // If the user hasn't liked, add their email to the likes array (like)
                post.likes = [...likesArray, user.email];
            }

            // Update the post in the Firebase Realtime Database
            await update(postRef, { likes: post.likes });

            // Update the state to reflect changes
            setAllPosts([...allPosts]);
            setCondition(!condition); // Trigger state to re-render the component
        }
    };




    const handleDeleteComment = async (postIndex, commentIndex) => {
        const postRef = ref(db, 'posts/' + allPosts[postIndex].id);
        let updatedPosts = [...allPosts];
        updatedPosts[postIndex].comments.splice(commentIndex, 1);

        await update(postRef, { comments: updatedPosts[postIndex].comments });
        setCondition(!condition);
    };

    // Fetch posts from Firebase
    useEffect(() => {
        const postsRef = ref(db, 'posts');
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const posts = Object.keys(data).map(key => ({ ...data[key], id: key }));
                setAllPosts(posts);
            }
        });
    }, [condition]);

    const loginData = auth.currentUser || {};
    const shareUrl1 = 'https://web.whatsapp.com/';
    const shareUrl2 = 'https://x.com/?lang=en-in';
    const shareUrl3 = 'https://web.telegram.org/';
    const shareUrl4 = 'https://in.linkedin.com/';

    return (
        <section className="container d-flex justify-content-center align-items-center flex-column my-3">
            <div className='w-100'>
                <div className="d-flex mb-3" style={{overflowX: 'auto' }}>
                    <div style={{ width: '300px', height: '150px', margin: '10px'}}>
                        <img
                            src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Sample 1"
                            className="mx-1"
                            style={{ cursor: 'pointer', width: '100%',borderRadius: '12px',  height: '100%',}}
                        />
                    </div>
                    <div style={{ width: '300px', height: '150px', margin: '10px'}}>
                        <img
                            src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Sample 2"
                            className="mx-1"
                            style={{ cursor: 'pointer', width: '100%',borderRadius: '12px',  height: '100%',}}
                        />
                    </div>
                    <div style={{ width: '300px', height: '150px', margin: '10px'}}>
                        <img
                            src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Sample 3"
                            className="mx-1"
                            style={{ cursor: 'pointer', width: '100%',borderRadius: '12px',  height: '100%',}}
                        />
                    </div>
                    <div style={{ width: '300px', height: '150px', margin: '10px'}}>
                        <img
                            src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Sample 4"
                            className="mx-1"
                            style={{ cursor: 'pointer', width: '100%',borderRadius: '12px',  height: '100%',}}
                        />
                    </div>
                    <div style={{ width: '300px', height: '150px', margin: '10px'}}>
                        <img
                            src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Sample 5"
                            className="mx-1"
                            style={{ cursor: 'pointer', width: '100%',borderRadius: '12px',  height: '100%',}}
                        />
                    </div>
                </div>
            </div>



            <div className="p-2 border rounded" style={{ background: "white", width: "90%" }}>
                <div className="d-flex align-items-center mb-2">
                    <img src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Avatar" className="rounded-circle me-2" style={{ width: '20px', height: '17px' }} />
                    <input type="text" name="search" placeholder="Your Name" className="form-control" />
                </div>
                <hr />
                <div className="d-flex justify-content-around align-items-center">
                    <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                        <FaVideo className="me-2" />
                        <p className="mb-0">Live</p>
                    </div>
                    <div className="d-flex align-items-center" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: "pointer" }}>
                        <FaImages className="me-2" />
                        <p className="mb-0">Photos</p>
                    </div>
                    <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                        <FaFilm className="me-2" />
                        <p className="mb-0">Reel</p>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Create Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center mb-3">
                                <img src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Avatar" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                                <input type="text" className="form-control" value={text} onChange={textData} placeholder="What's on your mind?" />
                            </div>
                            {image && <img src={image} alt="Preview" className="img-fluid mb-3" />}
                            <div className="form-group mb-3">
                                <input type="file" onChange={inputData} className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={addPost} data-bs-dismiss="modal">Post</button>
                        </div>
                    </div>
                </div>
            </div>

            {allPosts.map((post, index) => (
                <div key={index} className="container border m-2 p-2" style={{ width: "100%", height: "100%", backgroundColor: "#F2F3F4" }}>
                    <div className="p-2" style={{ background: "white", borderBottom: "1px solid lightgrey" }}>
                        <div className="d-flex align-items-center">
                            <img src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Avatar" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                            <p className="mb-0">{post.name}</p>
                        </div>
                        <div className=" my-2">
                            <p className="mt-2">{post.text}</p>
                            {post.image && <img src={post.image} alt="Post" className="img-fluid" />}
                        </div>
                        <div className='d-flex justify-content-between '>
                            <p className="mb-0 ms-2 " >{(post.likes || []).length} Likes</p>
                            <p className="mb-0">{(post.comments || []).length} Comments</p>

                        </div>
                        <hr className='text-center text-info' />
                        <div className="d-flex justify-content-around">
                            <div className="d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => handleLike(index)}>
                                {(post.likes || []).includes(auth.currentUser?.email) ? <AiFillLike style={{ color: "blue" }} /> : <AiOutlineLike />}
                            </div>

                            <div className="d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => handleComment(index)}>
                                <FaRegCommentDots className="me-2" />
                                <p className="mb-0">Comments</p>
                            </div>
                            <div className="d-flex align-items-center" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#shareModal">
                                <RiShareForward2Fill className="me-2" />
                                <p className="mb-0">Share</p>
                            </div>
                        </div>

                        {commentIndex === index && (
                            <div className="mt-2">
                                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className="form-control mb-2" placeholder="Write a comment..." />
                                <button type="button" className="btn btn-primary" onClick={() => submitComment(index)}>Comment</button>
                            </div>
                        )}

                        {post.comments && post.comments.map((c, ci) => (
                            <div key={ci} className="border-bottom mb-2 p-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={c.profileImage || "default-avatar-url"}
                                            alt="Profile"
                                            className="rounded-circle me-2"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                        <p className="mb-0"><strong>{c.name}</strong>: {c.comment}</p>
                                    </div>
                                    {c.name === auth.currentUser?.name && (
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(index, ci)}>
                                            <MdDelete />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            ))}
            <div className="modal fade" id="shareModal" tabIndex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="shareModalLabel">Share Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" >
                            <p>Share this post on:</p>
                            <WhatsappShareButton url={shareUrl1} quote={"title or me"} hashtag={"#profile...."} data-bs-dismiss="modal">
                                <WhatsappIcon size={32} round={true} className='m-2' />
                            </WhatsappShareButton>
                            <TwitterShareButton url={shareUrl2} quote={"title or me"} hashtag={"#profile...."} data-bs-dismiss="modal">
                                <TwitterIcon size={32} round={true} className='m-2' />
                            </TwitterShareButton>
                            <TelegramShareButton url={shareUrl3} quote={"title or me"} hashtag={"#profile...."} data-bs-dismiss="modal">
                                <TelegramIcon size={32} round={true} className='m-2' />
                            </TelegramShareButton>
                            <LinkedinShareButton url={shareUrl4} quote={"title or me"} hashtag={"#profile...."} data-bs-dismiss="modal">
                                <LinkedinIcon size={32} round={true} className='m-2' />
                            </LinkedinShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Container2;


