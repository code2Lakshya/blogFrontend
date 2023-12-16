import { Link } from "react-router-dom";
import './Footer.css';
import Wrapper from "../Wrapper/Wrapper";


const Footer = () => {

    return (
        <footer>
            <Wrapper className='footer-wrapper'>
                <p>Copyright © 2023 || <span>ENIGMA </span>|| By Lakshya</p>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>
            </Wrapper>
        </footer>
    );
}
export default Footer;