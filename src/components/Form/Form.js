import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { fetchData } from "../../utils/fetchData";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { changeLocalStorage } from "../../utils/checkToken";
import { setLoggedIn, setUserDetails } from "../../utils/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import './Form.css';


const Form = ({ className, type }) => {

    const [formDetails, setFormDetails] = useState({ username: '', email: '', img: null, password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState({ status: false, messaeg: '' });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        const { name, value, files } = e.target;
        setFormDetails(prev => ({ ...prev, [name]: name === 'img' ? files[0] : value }));
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (formDetails.email.length > 0 && formDetails.password.length > 0) {
            setLoader(true);
            if (type === 'signup' && formDetails.username.length > 0) {
                const formData = new FormData();
                formData.append('username', formDetails.username);
                formData.append('email', formDetails.email);
                formData.append('password', formDetails.password);
                formData.append('img', formDetails.img);
                fetchData('/signup', { method: 'POST', body: formData }, true)
                    .then(response => {
                        if (!response?.success) {
                            if (!response.message.includes('Internal Server Error'))
                                setErrMessage({ status: true, message: response.message });
                            else
                                toast.error('Network Error');
                        }
                        else {
                            toast.success('Successfully Signed Up');
                            setFormDetails({ username: '', email: '', img: null, password: '' });
                        }
                        setLoader(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoader(false);
                    })
            }
            if (type === 'login') {
                fetchData('/login', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formDetails.email, password: formDetails.password })
                }, true)
                    .then(response => {
                        if (response.success) {
                            dispatch(setLoggedIn(true));
                            dispatch(setUserDetails({ ...response.response, token: null }));
                            changeLocalStorage('add', response.response);
                            navigate('/');
                            toast.success('Successfully Logged In');
                            setFormDetails({ username: '', email: '', img: null, password: '' });

                        }
                        else {
                            if (!response.message.includes('Internal Server Error'))
                                setErrMessage({ status: true, message: response.message });
                            else
                                toast.error('Network Error');
                        }
                        setLoader(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoader(false);
                    })
            }
        }
    }

    return (
        <div className={`form ${className || ' '}`}>
            {
                errMessage.status &&
                <p id='errorMessage'>{errMessage.message}</p>
            }
            <form>
                {
                    type === 'signup' &&
                    <div className="form-field">
                        <label htmlFor="username">username:</label>
                        <input
                            type='text'
                            placeholder="johncool007"
                            value={formDetails.username}
                            onChange={changeHandler}
                            name='username'
                            id='username'
                            required
                            autoComplete="on"
                        />
                    </div>
                }
                <div className="form-field">
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        placeholder='johndoe@gmail.com'
                        value={formDetails.email}
                        onChange={changeHandler}
                        name='email'
                        id='email'
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="form-field">
                    <label htmlFor='password'>Password:</label>
                    <div id='password'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={formDetails.password}
                            onChange={changeHandler}
                            name='password'
                            id='password'
                            required
                            autoComplete="on"

                        />
                        {
                            !showPassword ?
                                <span onClick={() => setShowPassword(true)}><FaRegEyeSlash /></span>
                                :
                                <span onClick={() => setShowPassword(false)}><FaRegEye /></span>
                        }
                    </div>
                </div>
                {
                    type === 'signup' &&
                    <div className="form-field profile-field">
                        <label htmlFor="img">Profile Picture / Optinal:</label>
                        <input
                            type='file'
                            value={formDetails.file}
                            name='img'
                            onChange={changeHandler}
                            id='img'
                        />
                    </div>
                }
                {
                    loader ?
                        <Loader className='form-loader' />
                        :
                        type === 'signup'
                            ?
                            <button type='submit' onClick={submitHandler}>
                                Sign Up
                            </button>
                            :
                            <button type='submit' onClick={submitHandler}>
                                Log In
                            </button>
                }
            </form>
        </div>
    );
}
export default Form;