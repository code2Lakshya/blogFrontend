import { useEffect, useState } from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaGithubAlt,
    FaWhatsapp,
    FaLinkedinIn,
    FaTelegramPlane
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { fetchData } from "../../utils/fetchData";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({ className }) => {

    const [categories, setCategories] = useState(null);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true);
        fetchData(`/categories`)
            .then(response => {
                setCategories(response);
                setLoader(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoader(false);
            })
    }, [])

    const clickHandler = (id) => {
        navigate(`/category/${id}`);
    }

    return (
        <div className={`sidebar ${className ? className : ''}`}>
            <div className="social-icons">
                <h3>Social Plugin</h3>
                <ul>
                    <li style={{ backgroundColor: '#3b5999' }}>
                        <a href='https://www.facebook.com/lakshya.sadhwani/'>
                            <FaFacebookF />
                        </a>
                    </li>
                    <li style={{ backgroundColor: '#00acee' }}>
                        <a href='https://twitter.com/I_sadhwani'>
                            <FaTwitter />
                        </a>
                    </li>
                    <li style={{ background: 'linear-gradient(15deg,#ffb13d,#dd277b,#4d5ed4)' }}>
                        <a href='https://www.instagram.com/_ilakshya_/'>
                            <FaInstagram />
                        </a>
                    </li>
                    <li style={{ backgroundColor: 'black' }}>
                        <a href='https://github.com/code2Lakshya'>
                            <FaGithubAlt />
                        </a>
                    </li>
                    <li style={{ backgroundColor: '#3fbb50' }}>
                        <a href='https://wa.me/7754098890'>
                            <FaWhatsapp />
                        </a>
                    </li>
                    <li style={{ backgroundColor: '#0077b5' }}>
                        <a href='https://www.linkedin.com/in/lakshya-sadhwani-13a007247/'>
                            <FaLinkedinIn />
                        </a>
                    </li>
                    <li style={{ backgroundColor: '#ca2127' }}>
                        <a href='mailto:lakshyamwork@gmail.com'>
                            <IoIosMail />
                        </a>
                    </li>
                    <li style={{ backgroundColor: '#4a76a8' }}>
                        <a href='t.me/DevDaku'>
                            <FaTelegramPlane />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="categories-container">
                <h3>Categories</h3>
                {
                    loader ? <Loader />
                        :
                        categories
                            ?
                            categories
                                .filter((item, index) => index < 4)
                                .map(item => <p key={item._id} className="categories color" onClick={() => clickHandler(item._id)}>
                                    <span>{item.category}</span>
                                    <span>({item.posts.length})</span>
                                </p>)
                            :
                            <p className="noData">No Categories Found...</p>
                }
            </div>
            <div className="tags-container">
                <h3>Popular Tags</h3>
                <div className="tags-wrapper">
                    {
                        loader ? <Loader />
                            :
                            categories
                                ?
                                categories
                                    .filter((item, index) => index > 4)
                                    .map(item => <span key={item._id} className="tags color" onClick={() => clickHandler(item._id)}>
                                        {item.category}
                                    </span>)
                                :
                                <p className="noData">No Tags Found...</p>
                    }
                </div>
            </div>
            
        </div>
    );
}
export default Sidebar;