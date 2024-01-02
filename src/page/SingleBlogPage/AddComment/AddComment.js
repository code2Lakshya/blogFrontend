import { useState } from "react";
import { useFetch } from "../../../utils/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { sessionTimedOut } from "../../../utils/sessionTimedOut";
import { setLoggedIn } from "../../../utils/redux/slices/userSlice";
import toast from "react-hot-toast";
import { fetchData } from "../../../utils/fetchData";
import Loader from "../../../components/Loader/Loader";



const AddComment = ({ setData }) => {

    const [content, setContent] = useState('');
    const { userDetails } = useSelector(store => store.user);
    const [loader, setLoader] = useState(false);
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const clickHandler = () => {
        console.log(userDetails.token);
        if (content) {
            fetchData(`/createcomment`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userDetails.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post: postId,
                    content
                })
            },true)
                .then(response => {
                    if (response.message === 'Token') {
                        sessionTimedOut(dispatch, setLoggedIn);
                        navigate('/');
                        toast.error('Session Timed Out');
                    }
                    else if (!response.success) {
                        throw new Error(response.message);
                    }
                    else {
                        setData(prev => prev ? [...prev, response.response] : response.response);
                        setLoader(false);
                        setContent('');
                        toast.success('Comment Added');
                    }
                })
                .catch(error => {
                    console.log(error);
                    setLoader(false);
                })
        }
    }

    if (loader) {
        return (<div className="addcomment-container">
            <Loader />
        </div>)
    }

    return (
        <div className="addcomment-container">
            <input type='text'
                placeholder="Write a comment..."
                name='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={clickHandler}>Post</button>
        </div>
    );
}
export default AddComment;