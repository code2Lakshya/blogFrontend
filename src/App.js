import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "./utils/checkToken";
import { setLoggedIn, setUserDetails } from "./utils/redux/slices/userSlice";
import HomePage from "./page/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import SignupPage from "./page/SignupPage/SignupPage";
import LoginPage from "./page/LoginPage/LoginPage";
import SingleBlogPage from "./page/SingleBlogPage/SingleBlogPage";
import ErrorPage from "./page/ErrorPage/ErrorPage";


function App() {

const dispatch = useDispatch();


  useEffect(() => {
    if (checkToken()) {
      dispatch(setLoggedIn(true));
      dispatch(setUserDetails(JSON.parse(localStorage.getItem('user'))));
    }
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/post/:postId' element={<SingleBlogPage />} />
        <Route path='/category/:categoryId' element={<p>Category Page</p>}/>
        <Route path='/user/:userId' element={<p>User Page</p>} />
        <Route path='/profile' element={<p> Profile Page</p>} />
        <Route path='/create' element={<p>Create Blog</p>} />
        <Route path='/blogs' element={<p>All Blog Page</p>} />
        <Route path='/about' element={<p>About Page</p>} />
        <Route path='/contact' element={<p>Contact Page</p>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
