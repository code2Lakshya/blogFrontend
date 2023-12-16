import { LazyLoadImage } from 'react-lazy-load-image-component';
import imgSrc from '../../../../assets/demoBlog.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaRegUserCircle } from "react-icons/fa";
import { month } from '../../../../utils/variable';
import './Card.css';
import { FaRegClock } from "react-icons/fa";


const Card = ({ data, className }) => {

    const date = new Date(data.createdAt);
    const newDate = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;

    return (
        <div className={`card-container ${className ? className : ''}`}> {/** Add click Handler to switch to page route  */}
            <LazyLoadImage src={data.img_url ? data.img_url : imgSrc} alt='blog' effect='blur' />
            <div className='card-detail'>
                <span>{data?.categories[0].category}</span>
                <h2>{data.title}</h2>
                <div className='card-details'>
                    <p>
                        {data.user.profile_pic ? 
                        <span><LazyLoadImage src={data.user.profile_pic} alt='user' effect='blur'/></span>
                        :
                         <span> <FaRegUserCircle /></span>}
                        <span>{data.user.username}</span>
                    </p>
                    <p>
                        <span><FaRegClock /></span>
                        <span>{newDate}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Card;