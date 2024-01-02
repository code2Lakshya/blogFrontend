import { useEffect, useMemo } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import { useFetch } from "../../utils/hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const SingleBlogPage = () => {

    const { data, loader, fetchResponse, similarPosts, setSimilarPosts } = useFetch(true);
    const { postId } = useParams();
    const { loggedIn, userDetails } = useSelector(store => store.user);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [change, setChange] = useState(false);


    useEffect(() => {
        fetchResponse(`/post/${postId}`);
    }, [])

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
                    if (response.message.includes('Token'))
                        sessionTimedOut(dispatch, setLoggedIn);
                }
            })
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

    const { categories, title, user, createdAt, content, img_url } = data;
    let date = new Date(createdAt);
    date = date.getDate() + ' ' + month[date.getMonth()] + ` ` + date.getFullYear();

    return (
        <div className="single-blog-page">
            <Wrapper className='single-blog-wrapper'>
                <div className="single-blog-content">
                    <div className="single-blog-heading">
                        <div className="single-blog-left">
                            <Link to='/'>Home</Link>
                            <span> &#62;</span>
                            <Link to={`/category/${categories[0]?._id}`}>
                                {categories[0]?.category}
                            </Link>
                        </div>
                        {
                            loggedIn &&
                            user._id === userDetails?._id &&
                            <div className="single-blog-button">
                                <button onClick={() => setDeleteMessage(true)}>
                                    Delete Post
                                    <IoTrashBinOutline />
                                </button>
                            </div>
                        }
                    </div>
                    <div className="single-blog-detail">
                        <h3>{title}</h3>
                        <div className="blog-by">
                            {
                                user?.profile_pic?.length > 0 ?
                                    <LazyLoadImage src={user?.profile_pic} alt={title} effect="blur" />
                                    :
                                    <span><FaRegUserCircle /></span>
                            }
                            <p>
                                <span><CiClock2 /></span>
                                {date}
                            </p>
                        </div>
                        {
                            img_url?.length > 0 &&
                            <div className="single-blog-image">
                                <LazyLoadImage src={img_url} alt='blog' effect="blur" />
                            </div>
                        }
                        <div className="single-blog-content">
                            {content}
                        </div>
                        <div className="single--blog-category">
                            {
                                categories.map((item) => <span key={item._id}>{item.category}</span>)
                            }
                        </div>
                    </div>
                    <div className="single-blog-user">
                        <LazyLoadImage src={user?.profile_pic || demoUser} alt={user.username} effect="blur" />
                        <p >
                            Posted by
                            <span>{user.username}</span>
                        </p>
                    </div>
                    {
                        similarPosts &&
                        <SimilarPosts className='single-blog-similar' data={similarPosts} />
                    }
                    <ProtectedComments loggedIn={loggedIn} />
                </div>
                <Sidebar className="single-blog-sticky" />
                <div onClick={() => setChange(prev => !prev)}>Chna</div>
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