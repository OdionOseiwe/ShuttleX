import Home from "./pages/Home/Home";
import BookRide from "./pages/student/BookRide";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DriverRideRequest from "./components/DriverRideRequest";
import Notifications from "./pages/student/Notifications";
function App() {
 
/// MORE FEATURES
// 1. Book a ride on behalf of someone
// 2. schedule a ride (like for tomorrow)
// 3. based on feedbacks from passagers reward Drivers with NFT

/// FOR BACKEND
// add notification schema
// for history query rides based on user id and for driver rides completed by driver
// Admin manage users and drivers
// now the admin function for drivers is to approve them before they start receiving ride rquests

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-ride" element={<BookRide />} />
          {/* <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/notification" element={<Notifications />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
         