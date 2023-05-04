import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddEditPost from './pages/AddEditPost';
import Post from './pages/Post';
import MyPosts from './pages/MyPosts';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Me from './pages/Me';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRoutes from './components/PrivateRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('userProfile'));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/me"
            element={
              <PrivateRoutes>
                <Me />
              </PrivateRoutes>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoutes>
                <AddEditPost />
              </PrivateRoutes>
            }
          />
          <Route
            path="/postedit/:id"
            element={
              <PrivateRoutes>
                <AddEditPost />
              </PrivateRoutes>
            }
          />
          <Route
            path="/myposts"
            element={
              <PrivateRoutes>
                <MyPosts />
              </PrivateRoutes>
            }
          />

         <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
