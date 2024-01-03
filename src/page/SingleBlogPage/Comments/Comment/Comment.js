import { LazyLoadImage } from "react-lazy-load-image-component";
import demouser from '../../../../assets/demo user.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Comment.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../utils/fetchData";
import { sessionTimedOut } from "../../../../utils/sessionTimedOut";
import { setLoggedIn } from "../../../../utils/redux/slices/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../../../components/Loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";


const Comment = ({ data ,setData}) => {

    const { user, content,_id } = data;
    const [loader,setLoader]=useState(false);
    const {userDetails,loggedIn}=useSelector(store => store.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const deleteCommentHandler=()=>{
        setLoader(true);
        fetchData(`/deletecomment?comment=${_id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userDetails.token}`
            }
        },true)
        .then((response)=>{
            if(response?.message?.includes('Token')){
                sessionTimedOut(dispatch,setLoggedIn);
                toast.error('Session Timed Out !');
                navigate('/');
            }
            else if(!response?.success){
                console.log(response.message);
            }
            else{
                setData(prev => prev.filter(item => item._id!==_id))
                toast.success('Comment Successfully Deleted');
            }
            setLoader(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoader(false);
        })
    }

    return (
        <div className={`comment-container`}>
            <div className="comment">
                <LazyLoadImage src={user?.profile_pic || demouser} alt={user?.username} effect="blur" />
                <p>
                    <span>{user?.username}</span>
                    {content}
                </p>
            </div>
            {
                loggedIn && user._id===userDetails._id
                &&
                <button onClick={deleteCommentHandler}>Delete <span><AiOutlineDelete /></span></button>
            }
            {
                loader && <Loader className='comment-loader'/>
            }
        </div>
    );
}
export default Comment;