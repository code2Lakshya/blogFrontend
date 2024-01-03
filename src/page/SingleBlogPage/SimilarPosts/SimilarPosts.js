import { LazyLoadImage } from "react-lazy-load-image-component";
import demoImg from '../../../assets/demoBlog.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from "react-router-dom";
import './SimilarPosts.css';

const SimilarPosts = ({ className, data }) => {

const navigate=useNavigate();

    return (
        <div className={`similar-posts ${className ? className : ''}`}>
        <h1>You may like these posts</h1>
            {
                data.map(item => {
                    const { img_url, title,_id } = item;
                    return (<div className="similar-post" key={_id} onClick={()=>navigate(`/post/${_id}`)}>
                        <LazyLoadImage src={img_url || demoImg} alt='similar-blog' effect="blur" />
                        <p>{title}</p>
                    </div>);
                })
            }
        </div>
    );
}
export default SimilarPosts;