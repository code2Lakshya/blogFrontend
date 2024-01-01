import { LazyLoadImage } from "react-lazy-load-image-component";
import demoImg from '../../../assets/demoBlog.png';
import 'react-lazy-load-image-component/src/effects/blur.css';


const SimilarPosts = ({ className, data }) => {

    return (
        <div className={`similar-posts ${className ? className : ''}`}>
            {
                data.map(item => {
                    const { img_url, title,_id } = item;
                    return (<div className="similar-post" key={_id}>
                        <LazyLoadImage src={img_url || demoImg} alt='similar-blog' effect="blur" />
                        <p>{title}</p>
                    </div>);
                })
            }
        </div>
    );
}
export default SimilarPosts;