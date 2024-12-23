import React, { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { RiShareForward2Fill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import Navbar from '../Home/Navbar';
import Container1 from '../Home/Container1';
import { getDatabase, ref, onValue, update, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const UserPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [commentIndex, setCommentIndex] = useState(null);
  const [comment, setComment] = useState("");
  const [condition, setCondition] = useState(); // Add condition state to force re-render

  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const postsRef = ref(db, 'posts');
      onValue(postsRef, (snapshot) => {
        const posts = snapshot.val() || [];
        const userPosts = Object.values(posts).filter(post => post.email === user.email);
        setMyPosts(userPosts);
      });
    }
  }, [db, auth, condition]); // Added condition to dependencies

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

          const postRef = ref(db, 'posts/' + myPosts[index].id);

          // Update the existing comments array in place
          myPosts[index].comments = myPosts[index].comments || [];
          myPosts[index].comments.push({
            comment: comment,
            name: userData.name || "Anonymous",
            profileImage: userData.profileImage || "https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          });

         

          // Update the local state
          setMyPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index] = { ...updatedPosts[index], comments: myPosts[index].comments };
            return updatedPosts;
          });

          setComment("");
          setCommentIndex(null);
          setCondition(!condition); // Trigger state change to re-render
        }
      }
    }
  };

  const handleLike = async (index) => {
    const user = auth.currentUser;

    if (user) {
      const postRef = ref(db, 'posts/' + myPosts[index].id);
      const likesArray = myPosts[index].likes || [];

      // Check if the user's email is already in the likes array
      if (likesArray.includes(user.email)) {
        // If the user has already liked, remove their email (dislike)
        likesArray.splice(likesArray.indexOf(user.email), 1);
      } else {
        // If the user hasn't liked, add their email to the likes array (like)
        likesArray.push(user.email);
      }

      

      // Update the local state
      setMyPosts(prevPosts => {
        const updatedPosts = [...prevPosts];
        updatedPosts[index] = { ...updatedPosts[index], likes: likesArray };
        return updatedPosts;
      });

      setCondition(!condition); // Trigger state change to re-render
    }
  };

 

  return (
    <>
      <Navbar />
      <div className='d-flex m-4'>
        <section className="container my-3" style={{ background: "transparent", width: "40%" }}>
          <div className="d-flex flex-column align-items-start text-center gap-3">
            <Container1 />
          </div>
        </section>

        <section className="container d-flex justify-content-center align-items-center flex-column my-3">
          <div>
            <img src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Avatar" className="me-2" style={{ width: '100%', height: '500px' }} />
          </div>
          {myPosts.map((e, index) => (
            <div key={index} className="container border m-2 p-2" style={{ width: "100%", height: "100%", backgroundColor: "#F2F3F4" }}>
              <div className="p-2" style={{ background: "white", borderBottom: "1px solid lightgrey" }}>
                <div className="d-flex align-items-center">
                  <img src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Avatar" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                  <p className="mb-0">{e.name}</p>
                </div>
                <div className="my-2">
                  <p className="mt-2">{e.text}</p>
                  {e.image && <img src={e.image} alt="Post" className="img-fluid" />}
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-0 ms-2">{(e.likes || []).length} Likes</p>
                  <p className="mb-0">{(e.comments || []).length} Comments</p>
                </div>
                <hr className='text-center text-info' />
                <div className="d-flex justify-content-around">
                  <div className="d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => handleLike(index)}>
                    {(e.likes || []).includes(auth.currentUser?.email) ? <AiFillLike style={{ color: "blue" }} /> : <AiOutlineLike />}
                    <p className="mb-0 ms-1">Like</p>
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

                {e.comments && e.comments.map((c, ci) => (
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
                      {c.name === auth.currentUser?.displayName && (
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
        </section>
      </div>
    </>
  );
};

export default UserPosts;
