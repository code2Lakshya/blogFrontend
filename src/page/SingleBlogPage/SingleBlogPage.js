import { useEffect, useMemo } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import { useFetch } from "../../utils/hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaRegUserCircle } from 'react-icons/fa';
import { CiClock2 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { month } from "../../utils/variable";
import { useState } from "react";
import { fetchData } from "../../utils/fetchData";
import toast from "react-hot-toast";
import { sessionTimedOut } from "../../utils/sessionTimedOut";
import { setLoggedIn } from "../../utils/redux/slices/userSlice";
import { IoTrashBinOutline } from "react-icons/io5";
import Sidebar from "../../components/Sidebar/Sidebar";
import SimilarPosts from "./SimilarPosts/SimilarPosts";
import demoUser from '../../assets/demo user.png';
import CommentOnLoggedin, { CommentOnLoggedout } from "./Comments/Comments";
import ProtectedComponents from "../../components/ProtectedComponents/ProtectedComponents";
import './SingleBlogPage.css';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useScrollToTop } from "../../utils/hooks/useScrollToTop";
import { GoShareAndroid } from "react-icons/go";

const SingleBlogPage = () => {

    const { data, loader, fetchResponse, similarPosts, setData } = useFetch(true);
    const { postId } = useParams();
    const { loggedIn, userDetails } = useSelector(store => store.user);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useScrollToTop(postId);

    useEffect(() => {
        fetchResponse(`/post/${postId}`);
    }, [postId])

    const deleteHandler = () => {
        fetchData(`/deletepost/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userDetails.token}`
            }
        }, true)
            .then(response => {
                if (response.success) {
                    toast.success('Post Successfully Deleted!');
                    navigate('/');
                }
                else {
                    console.log(response.message);
                    if (response.message.includes('Token')) {
                        sessionTimedOut(dispatch, setLoggedIn);
                        navigate('/');
                        toast.error('Session Timed Out');
                    }
                }
            })
            .catch((error) => console.log(error))
    }

    const likeHandler = () => {
        fetchData(`/likepost?post=${postId}`, {
            headers: {
                'Authorization': `Bearer ${userDetails.token}`
            }
        }, true)
            .then(response => {
                if (response.success) {
                    toast.success('Post Successfully Liked!');
                    setData(prev => ({ ...prev, likes: [...prev?.likes, response?.response] }));
                }
                else {
                    console.log(response.message);
                    if (response.message.includes('Token')) {
                        sessionTimedOut(dispatch, setLoggedIn);
                        navigate('/');
                        toast.error('Session Timed Out');
                    }
                }
            })
            .catch((error) => console.log(error))
    }

    const dislikeHandler = () => {
        fetchData(`/unlikepost?postId=${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${userDetails.token}`
            }
        }, true)
            .then(response => {
                if (response.success) {
                    setData(prev => {
                        console.log(prev?.likes?.filter(item => item?._id !== response?.response?._id));
                        return { ...prev, likes: prev?.likes?.filter(item => item?._id !== response?.response?._id) }
                    });
                    toast.success('Post Successfully Disliked!');
                }
                else {
                    console.log(response.message);
                    if (response.message.includes('Token')) {
                        sessionTimedOut(dispatch, setLoggedIn);
                        navigate('/');
                        toast.error('Session Timed Out');
                    }
                }
            })
            .catch((error) => console.log(error))
    }

    const shareHandler = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Copied To Clipboard');
    }

    const ProtectedComments = useMemo(() => ProtectedComponents(CommentOnLoggedin, CommentOnLoggedout), [loggedIn]);

    if (loader) {
        return <Loader className='full-page' />
    }

    if (!data)
        return (
            <div className="single-blog-page">
                <Wrapper className='single-blog-wrapper'>
                    <p className="noData">No Data Found....</p>
                </Wrapper>
            </div>
        );

    const { categories, title, user, createdAt, content, img_url, likes, comments } = data;
    let date = new Date(createdAt);
    date = date.getDate() + ' ' + month[date.getMonth()] + ` ` + date.getFullYear();

    return (
        <div className="single-blog-page">
            <Wrapper className='single-blog-wrapper'>
                <div className="single-blog-content">
                    <div className="single-blog-heading">
                        <Link to='/'>Home</Link>
                        <span> &#62;</span>
                        <Link to={`/category/${categories[0]?._id}`}>
                            {categories[0]?.category}
                        </Link>
                    </div>
                    <div className="single-blog-title">
                        <h3>{title}</h3>
                        <div className="blog-by">
                            <p>
                                {
                                    user?.profile_pic?.length > 0 ?
                                        <LazyLoadImage src={user?.profile_pic} alt={title} effect="blur" />
                                        :
                                        <span><FaRegUserCircle /></span>
                                }
                                {user.username}
                            </p>
                            <p>
                                <span><CiClock2 /></span>
                                {date}
                            </p>
                        </div>
                    </div>
                    <div className="single-blog-detail">
                        {
                            img_url?.length > 0 &&
                            <LazyLoadImage src={img_url} alt='blog' effect="blur" />
                        }
                        <div className="single-blog-main-content">
                            {content}
                        </div>
                        <div className="single-blog-category">
                            {
                                categories.map((item) => <span
                                    key={item._id}
                                    onClick={()=> navigate(`/category/${item._id}`)}
                                >
                                    {item.category}
                                </span>)
                            }
                        </div>
                    </div>
                    <div className={`single-blog-stats ${!likes.length && !comments.length ? 'disable' : ''} ${!loggedIn ? 'active':''}`}>
                        {likes.length > 0 &&
                            <p>
                                <span>{likes.length}</span>
                                <AiOutlineLike />
                            </p>
                        }
                        {comments.length > 0 &&
                            <p id='comment'>
                                {comments.length}
                                <span>Comments</span>
                            </p>
                        }
                    </div>
                    {
                        loggedIn &&
                        <div className="single-blog-buttons">
                            {
                                likes.findIndex(item => item.user === userDetails._id) === -1
                                    ?
                                    <button onClick={likeHandler}>Like <AiOutlineLike /></button>
                                    :
                                    <button onClick={dislikeHandler} style={{ color: 'var(--bg-color)' }}>Like <AiOutlineDislike /></button>
                            }
                            <button onClick={shareHandler}>Share <GoShareAndroid /></button>
                            <button
                                onClick={() => setDeleteMessage(true)}
                                disabled={user._id !== userDetails._id ? true : false}
                            >
                                Delete<IoTrashBinOutline />
                            </button>
                        </div>
                    }
                    <div className="single-blog-user">
                        <LazyLoadImage src={user?.profile_pic || demoUser} alt={user.username} effect="blur" />
                        <p >
                            Posted by
                            <span>{user.username}</span>
                        </p>
                    </div>
                    {
                        similarPosts.length >0 &&
                        <SimilarPosts className='single-blog-similar' data={similarPosts} />
                    }
                    <ProtectedComments loggedIn={loggedIn} className='single-blog-comments' />
                </div>
                <Sidebar className="single-blog-sticky" />
            </Wrapper>
            {
                deleteMessage &&
                <div className="delete-container">
                    <div className="delete-post">
                        <span onClick={() => setDeleteMessage(false)}>Cross</span>
                        <p>Are You Confirm You Want To Delete The Post ?</p>
                        <div className="delete-btn">
                            <button onClick={() => setDeleteMessage(false)}>Cancel</button>
                            <button onClick={deleteHandler}>Delete</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
export default SingleBlogPage;