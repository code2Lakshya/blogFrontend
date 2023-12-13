import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import imgSrc from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGithubAlt } from "react-icons/fa";
import { FaTwitter, FaInstagram } from "react-icons/fa6";
import './Navbar.css';
import Wrapper from '../Wrapper/Wrapper';
import { useSelector } from 'react-redux';
import { MdMenu } from "react-icons/md";
import { useState } from 'react';
import { IoClose } from "react-icons/io5";


const Navbar = () => {

    const { userDetails, loggedIn } = useSelector(store => store.user);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

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
                        <LazyLoadImage src={imgSrc} alt='luminous' effect='blur' />
                        <ul id='nav-list' className={showMenu ? 'active' : ''}>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/blogs'>Blogs</Link></li>
                            <li><Link to='/create'>Post Now</Link></li>
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
                                <div className='user-details' onClick={() => navigate('/profile')}>
                                    <LazyLoadImage src={imgSrc} alt={userDetails?.username} effect='blur' />
                                    <h3>{userDetails?.username}</h3>
                                </div>
                        }
                    </div>
                </Wrapper>
            </nav>

        </header >
    );
}
export default Navbar;