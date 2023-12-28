import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import imgSrc from '../../assets/logo2.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGithubAlt } from "react-icons/fa";
import { FaTwitter, FaInstagram } from "react-icons/fa6";
import './Navbar.css';
import Wrapper from '../Wrapper/Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { MdMenu } from "react-icons/md";
import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import demoUserImg from '../../assets/demo user.png';
import { changeLocalStorage } from '../../utils/checkToken';
import { setLoggedIn, setUserDetails } from '../../utils/redux/slices/userSlice';
import { IoMdArrowDropdown, IoIosLogOut } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import toast from 'react-hot-toast';



const Navbar = () => {

    const { userDetails, loggedIn } = useSelector(store => store.user);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const [profileList, setProfileList] = useState(false);

    const logoutHandler = (e) => {
        e.stopPropagation();
        changeLocalStorage('remove');
        dispatch(setLoggedIn(false));
        dispatch(setUserDetails(null));
        setAllFalse();
        toast.success('Logged Out');
        navigate('/');
    }
    const clickHandler = (e) => {
        e.stopPropagation();
        setAllFalse();
        navigate('/profile');
    }
    function setAllFalse() {
        setShowMenu(false);
        setProfileList(false);
    }

    return (
        <header>

            {/** Banner  */}
            <div className='banner'>

                <Wrapper className='banner-wrapper'>
                    <ul id='banner-list'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>

                    <div className='banner-icons'>
                        <a href='https://www.facebook.com/lakshya.sadhwani/'>
                            <FaFacebookF />
                        </a>
                        <a href='https://twitter.com/I_sadhwani'>
                            <FaTwitter />
                        </a>
                        <a href='https://www.instagram.com/_ilakshya_/'>
                            <FaInstagram />
                        </a>
                        <a href='https://github.com/code2Lakshya'>
                            <FaGithubAlt />
                        </a>
                    </div>
                </Wrapper>
            </div>

            {/** Navbar */}
            <nav>
                <Wrapper className='navbar'>
                    <div className='nav-left'>
                        <p id='menu' onClick={() => setShowMenu(prev => !prev)}>
                            {
                                !showMenu ?
                                    <MdMenu />
                                    :
                                    <IoClose />
                            }
                        </p>
                        <Link to='/'><LazyLoadImage src={imgSrc} alt='luminous' effect='blur' /></Link>
                        <ul id='nav-list' className={showMenu ? 'active' : ''}>
                            <li onClick={setAllFalse}><Link to='/'>Home</Link></li>
                            <li onClick={setAllFalse}><Link to='/blogs'>Blogs</Link></li>
                            <li onClick={setAllFalse}><Link to='/create'>Post Now</Link></li>
                        </ul>
                    </div>
                    <div className='nav-right'>
                        {
                            !loggedIn ?
                                <div className='login-container'>
                                    <button onClick={() => navigate('/login')}>Login</button>
                                    <button onClick={() => navigate('/signup')}>Signup</button>
                                </div>
                                :
                                <div className='login-container'>
                                    <div className='user-details' onClick={() => setProfileList(prev => !prev)}>
                                        <LazyLoadImage src={userDetails?.profile_pic || demoUserImg} alt={userDetails?.username} effect='blur' />
                                        <h3>{userDetails?.username}</h3>
                                        <span><IoMdArrowDropdown /></span>
                                        <ul className={profileList ? 'active' : ''}>
                                            <li onClick={clickHandler}>Profile<RiProfileLine /></li>
                                            <li onClick={logoutHandler}>Logout<IoIosLogOut /></li>
                                        </ul>
                                    </div>
                                </div>
                        }
                    </div>
                </Wrapper>
            </nav>
        </header >
    );
}
export default Navbar;