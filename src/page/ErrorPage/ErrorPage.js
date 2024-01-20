import { LazyLoadImage } from "react-lazy-load-image-component";
import imgSrc from '../../assets/change.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from "react-router-dom";
import './ErrorPage.css';

const ErrorPage = () => {

    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="error-page-wrapper">
                <div className="error-image">
                    <LazyLoadImage src={imgSrc} alt='error' effect="blur" />
                </div>
                <h1>Page Not Found</h1>
                <p>
                    The page you are looking for might have been removed had its name changed or is
                    temporarily unavailable.
                </p>
                <button onClick={() => navigate('/')}>Home Page</button>
            </div>
        </div>
    );
}
export default ErrorPage;