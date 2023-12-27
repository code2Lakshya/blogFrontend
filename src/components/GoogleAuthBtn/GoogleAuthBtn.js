import toast from "react-hot-toast";
import { changeLocalStorage } from "../../utils/checkToken";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUserDetails } from "../../utils/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import './GoogleAuthBtn.css';

const { GoogleLogin } = require("@react-oauth/google");


const GoogleAuthBtn = ({className}) => {

const dispatch=useDispatch();
const navigate=useNavigate();

    const successHandler = (credentialResponse) => {
        fetch(process.env.REACT_APP_BASE_URL + '/googlesignin',{
            method: 'GET',
            headers: { 'Authorization': `Bearer ${credentialResponse.credential}`}
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(!res.success){
                toast.error('Please retry');
            }
            else{
                changeLocalStorage('add',res.response);
                dispatch(setLoggedIn(true));
                dispatch(setUserDetails(res.response));
                navigate('/');
                toast.success('Successfully Logged In');
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div className={`google-btn ${className ? className : ''}`}>
            <GoogleLogin onSuccess={successHandler} onError={(error) => console.log(error)} />
        </div>
    );
}
export default GoogleAuthBtn;