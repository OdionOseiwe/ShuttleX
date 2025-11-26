import Home from "./pages/Home/Home";
import BookRide from "./pages/student/BookRide";
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Notifications from "./pages/student/Notifications";
import SignupPage from "./pages/Auth/SignUp";
import SignupPageDriver from "./pages/Auth/SignUpDriver";
import Signin from "./pages/Auth/SignIn";
import {useAuthStore} from './store/UserAuth'
import { useEffect } from "react";

const ProtectedRoutes = ({children}: { children: any })=>{
  const { isAuthenticated } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to= "/login" replace />;
  }
  return children
}


function App() {
  const {checkAuth} = useAuthStore();

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

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  return (
    <>
      <BrowserRouter>
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
          
          <Route path="/notification" element={
            <ProtectedRoutes>
              <Notifications/>
            </ProtectedRoutes>
          } /> 
          <Route path= '/signup' element= {<SignupPage/>}/>
          <Route path= '/signup/as-driver' element= {<SignupPageDriver/>}/>
          <Route path= '/login' element= {<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
         