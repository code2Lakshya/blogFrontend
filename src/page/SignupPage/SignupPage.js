import { LazyLoadImage } from 'react-lazy-load-image-component';
import './SignupPage.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';
import img1 from '../../assets/login.png';
import GoogleAuthBtn from '../../components/GoogleAuthBtn/GoogleAuthBtn';

const SignupPage = () => {

    return (
        <div className="signup-page">
            <div className='signup-wrapper'>
                <div className='signup-form'>
                    <h3>Signup </h3>
                    <p>
                        Have A Account ?
                        <Link to='/login'>Login</Link>
                    </p>
                    <Form className='signup' type='signup' />
                    <p className='or'>or</p>
                    <GoogleAuthBtn className='signup-btn' />
                </div>
                <div className='signup-design'>
                    <LazyLoadImage src={img1} alt='signup' effect='blur' />
                </div>
            </div>
        </div>
    );
}
export default SignupPage;