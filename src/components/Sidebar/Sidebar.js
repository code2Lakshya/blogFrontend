import { FaFacebookF, FaTwitter, FaInstagram, FaGithubAlt } from "react-icons/fa";


const Sidebar = ({ className }) => {

    return (
        <div className={`sidebar ${className ? className : ''}`}>
            <div className="social-icons">
                <ul>
                    <li>
                        <a href='https://www.facebook.com/lakshya.sadhwani/'>
                            <FaFacebookF />
                        </a>
                    </li>
                    <li>
                        <a href='https://twitter.com/I_sadhwani'>
                            <FaTwitter />
                        </a>
                    </li>
                    <li>
                        <a href='https://www.instagram.com/_ilakshya_/'>
                            <FaInstagram />
                        </a>
                    </li>
                    <li>
                        <a href='https://github.com/code2Lakshya'>
                            <FaGithubAlt />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;