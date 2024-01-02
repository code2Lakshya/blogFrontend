import { LazyLoadImage } from "react-lazy-load-image-component";
import demouser from '../../../../assets/demo user.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Comment = ({data}) => {

const {user,content}=data;

    return (
        <div className="comment">
            <LazyLoadImage src={user?.profile_pic || demouser} alt={user?.username} effect="blur" />
            <div className="comment-content">
                <h3>{user?.username}</h3>
                <p>{content}</p>
            </div>
        </div>
    );
}
export default Comment;