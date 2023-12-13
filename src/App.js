import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "./utils/checkToken";
import { setLoggedIn, setUserDetails } from "./utils/redux/slices/userSlice";


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
        <Route path='/' element={<p>Home Page</p>} />
        <Route path='/blog/:blogId' element={<p>Single Blog Page</p>} />
        <Route path='/profile' element={<p> Profile Page</p>} />
        <Route path='/create' element={<p>Create Blog</p>} />
        <Route path='/user/:userId' element={<p>User Page</p>} />
        <Route path='/blogs' element={<p>All Blog Page</p>} />
        <Route path='/about' element={<p>About Page</p>} />
        <Route path='/contact' element={<p>Contact Page</p>} />
        <Route path='/login' element={<p>Login Page</p>}/>
        <Route path='/singup' element={<p>Signup Page</p>}/>
        <Route path='*' element={<p>Error Page</p>} />
      </Routes>
      <p>Footer</p>
    </div>
  );
}

export default App;
