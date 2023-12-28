import { LazyLoadImage } from "react-lazy-load-image-component";
import Form from "../../components/Form/Form";
import GoogleAuthBtn from "../../components/GoogleAuthBtn/GoogleAuthBtn";
import Wrapper from "../../components/Wrapper/Wrapper";
import imgsrc from '../../assets/login1.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './LoginPage.css';
import { Link } from "react-router-dom";

const LoginPage=()=>{

    return(
        <div className="login-page">
            <Wrapper className='login-page-wrapper'>
                <div className="login-left">
                    <h1>Login</h1>
                    <p>Don't Have A Account ? <Link to='/signup'>SignUp</Link></p>
                    <Form className='login-form' type='login' />
                    <p className="or">or</p>
                    <GoogleAuthBtn className='login-btn' />
                </div>
                <div className="login-design">
                    <LazyLoadImage src={imgsrc} alt='login' effect="blur" />
                </div>
            </Wrapper>
        </div>
    );
}
export default LoginPage;