import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../utils/fetchData";
import { sessionTimedOut } from "../../../utils/sessionTimedOut";
import { setLoggedIn } from "../../../utils/redux/slices/userSlice";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import AddComment from "../AddComment/AddComment";
import Comment from "./Comment/Comment";


const CommentOnLoggedin = () => {

    const { postId } = useParams();
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const { userDetails } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true);
        fetchData(`/getallcomments?postId=${postId}`, {
            headers: {
                'Authorization': `Bearer ${userDetails.token}`
            }
        }, true)
            .then(response => {
                if (response.message.includes('Token')) {
                    sessionTimedOut(dispatch, setLoggedIn);
                    toast.error('Session Timed Out');
                    navigate('/');
                }
                else if (!response.success) {
                    throw new Error(response.message);
                }
                else {
                    setData(response.response);
                    setLoader(false);
                }
            })
            .catch((error) => {
                setLoader(false);
            })
    }, [])

    return (
        <div className="commentLogin-container">
            <Wrapper className="commentLogin-wrapper">
                <h1>Post a Comment</h1>
                {
                    loader ?
                        <Loader />
                        :
                        <div className="comments-container">
                            <AddComment setData={setData} />
                            {!data
                                ?
                                <p>0 Comments Found</p>
                                :
                                <div className="comments">
                                    {data.map(item => <Comment data={item} key={item._id} />)}
                                </div>
                            }
                        </div>
                }
            </Wrapper>
        </div>
    );
}
export default CommentOnLoggedin;


export const CommentOnLoggedout = () => {

    const navigate = useNavigate();

    return (
        <div className="commentLogout-container">
            <Wrapper className='commentLogout-wrapper'>
                <h1>Post a Comment</h1>
                <p>0 Comments</p>
                <p>To leave a comment, click the button below to sign in on Enigma.</p>
                <button onClick={() => navigate('/signup')}>Signup</button>
            </Wrapper>
        </div>
    );
}
