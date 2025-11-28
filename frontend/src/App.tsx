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
import ApproveDriverPage from "./components/Approve_driver";
import DriverRideRequest from './components/DriverRideRequest'
import NotificationDetails from './components/Notification_detail'

const ProtectedRoutes = ({children}: { children: any })=>{
  const { isAuthenticated } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to= "/login" replace />;
  }
  return children
}

function App() {
  const {checkAuth, isCheckingAuth} = useAuthStore();
    
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

   if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} color="black" className="animate-spin" />
      </div>
    );
  }

/// MORE FEATURES
// 1. Book a ride on behalf of someone
// 2. schedule a ride (like for tomorrow)
// 3. based on feedbacks from passagers reward Drivers with NFT

/// FOR BACKEND
// for history query rides based on user id and for driver rides completed by driver
// Admin manage users and drivers
// now the admin function for drivers is to approve them before they start receiving ride rquests

// TODO: Now that the map is working with mockAddress, and the routes are being drawn
// NEXT: Integrate with backend 
// 1. sign in users and drivers 
   // - toaster messages for success and errors
// 3. Do the notifications systems with backend for all users
// 2. Do the admin dashboard for approving drivers
// 4. Book a ride 
// 5. Drivers see ride requests and accept them (socket.io integration)
// 6. Real-time tracking of rides
// 7. Load history of rides for users and drivers
// 8. Update Profile settings
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-ride" element={
            <ProtectedRoutes>
              <BookRide/>
            </ProtectedRoutes>
          } />
          {/* <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          
          <Route path="/notifications" element={
            <ProtectedRoutes>
              {/* <NotificationList notifications = {[]} onDelete ={()=>{}}/> */}
              <Notifications/>
            </ProtectedRoutes>
          } /> 
          <Route path="/history" element={
            <ProtectedRoutes>
              <HistoryPage/>
            </ProtectedRoutes>
          } /> 
          <Route path="/update-profile" element={
            <ProtectedRoutes>
              <UpdateProfile/>
            </ProtectedRoutes>
          } /> 
          <Route path= '/signup' element= {<SignupPage/>}/>
          <Route path= '/signup/as-driver' element= {<SignupPageDriver/>}/>
          <Route path= '/login' element= {<Signin/>}/>
          <Route path= 'notifications/detail/:_id' element= {<NotificationDetails/>}/>
        </Routes>
        <ToastContainer />
    </>
  )
}

export default App
         