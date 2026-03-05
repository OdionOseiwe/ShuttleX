import Home from "./pages/Home/Home";
import BookRide from "./pages/student/BookRide";
import {Routes, Route,Navigate } from 'react-router-dom';
import Notifications from "./pages/student/Notifications";
import SignupPage from "./pages/Auth/SignUp";
import SignupPageDriver from "./pages/Auth/SignUpDriver";
import Signin from "./pages/Auth/SignIn";
import {useAuthStore} from './store/UserAuth'
import { useEffect } from "react";
import {Loader} from 'lucide-react'
import { ToastContainer } from 'react-toastify';
import HistoryPage from "./pages/student/History";
import UpdateProfile from "./pages/student/Update_Profile";
import { initGlobalSocketListeners } from "./store/driverListener";
import DriverRideRequest from './components/DriverRideRequest'
import NotificationDetails from './components/Notification_detail'
import { socket } from "./store/socket";

const ProtectedRoutes = ({children}: { children: any })=>{
  const { isAuthenticated } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to= "/login" replace />;
  }

  return children
}

function App() {
  const {checkAuth, isCheckingAuth,user} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  useEffect(() => {
    if (!user) return;

    if (user) initGlobalSocketListeners(user); 
  }, [user]);

  useEffect(() => {
      if (!user) return;

      socket.emit("registerUser", { _id: user?.user?._id });

      if (!user?.user?._doc) return;
      
      const isVerified = user?.user?._doc?.isVerified;
      const userId = user?.user?._id;
  
      if (isVerified) {
        socket.emit("registerDriver", {
          _id: userId,
          isVerified: true,
          vehicleType: user?.user?._doc?.vehicleType,

        });
      }
  }, [user]);

   if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} color="black" className="animate-spin" />
      </div>
    );
  }

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-ride" element={
            <ProtectedRoutes>
              <BookRide/>
            </ProtectedRoutes>
            // <BookRide/>
          } />
       
          
          <Route path="/notifications" element={
            <ProtectedRoutes>
              <Notifications/>
            </ProtectedRoutes>
          } /> 
          <Route path="/history" element={
            <ProtectedRoutes>
              <HistoryPage/>
            </ProtectedRoutes>
            // <HistoryPage/>
          } /> 
          <Route path="/update-profile" element={
            <ProtectedRoutes>
              <UpdateProfile/>
            </ProtectedRoutes>
            // <UpdateProfile/>
          } /> 

          <Route path= '/signup' element= {<SignupPage/>}/>
          <Route path= '/signup/as-driver' element= {<SignupPageDriver/>}/>
          <Route path= '/login' element= {<Signin/>}/>
          <Route path= 'notifications/detail/:_id' element= {<NotificationDetails/>}/>
          <Route path= 'requests/:id' element= {<DriverRideRequest/>}/>
        </Routes>
        <ToastContainer />
    </>
  )
}

export default App
         