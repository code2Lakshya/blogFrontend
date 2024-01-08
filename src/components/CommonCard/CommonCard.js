import { LazyLoadImage } from "react-lazy-load-image-component";
import imgSrc from '../../assets/demoBlog.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaRegClock } from 'react-icons/fa';
import { month } from '../../utils/variable';
import './CommonCard.css';

const CommonCard = ({ data, className, showContent }) => {

    const navigate = useNavigate();
    const date = new Date(data.createdAt);
    const newDate = `${date.getDate()} ${month[date.getMonth() + 1]} ${date.getFullYear()}`;

    const clickHandler = (e,type) => {
        e.stopPropagation();
        type==='category'?
        navigate(`category/${data.categories[0]._id}`)
        :
        navigate(`/post/${data._id}`);
    }

    return (
        <div className={`common-card ${className ? className : ''}`}>
            <div className="common-card-image" onClick={() => navigate(`/post/${data._id}`)}>
                <LazyLoadImage src={data.img_url ? data.img_url : imgSrc} alt='blog' effect="blur" />
                <span onClick={(e)=> clickHandler(e,'category')}>{data.categories[0]?.category}</span>
            </div>
            <div className="common-card-details">
                <h2 onClick={(e)=>clickHandler(e,'post')}>{data.title}</h2>
                <div className='card-detailss'>
                    <p onClick={()=> navigate(`/user/${data.user._id}`)}>
                        {data.user.profile_pic ?
                            <span><LazyLoadImage src={data.user.profile_pic} alt='user' effect='blur' /></span>
                            :
                            <span> <FaRegUserCircle /></span>}
                        <span>{data.user.username}</span>
                    </p>
                    <p>
                        <span><FaRegClock /></span>
                        <span>{newDate}</span>
                    </p>
                </div>
                {
                    showContent
                    &&
                    <p>
                        {data?.content?.length > 200 ? `${data?.content?.slice(0, 200)}...` : data?.content}
                    </p>
                }
            </div>
        </div>
    );
}
export default CommonCard;