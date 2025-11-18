import { UserRound, ChevronDown, ChevronUp } from 'lucide-react';
import Profile from '../components/Profile';
import { useState } from 'react';
function SideBar() {
  const [showProfile, setShowProfile] = useState(false);
  
  return (
    <div className=''>
      <div className="flex justify-between md:px-20 px-10 border-b-4 border-gray-200  py-2">
        <h1 className="text-2xl font-semibold cursor-pointer">ShuttleX</h1>
        <div  onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
          className="flex justify-between cursor-pointer items-center">
          <UserRound className="rounded-full text-gray-400" size={35} />
          {showProfile ? <ChevronUp/> : <ChevronDown />}
          {showProfile && <Profile />}
        </div>
      </div>
      
    </div>
  )
}
export default SideBar
// Student:

// Book Ride (Select pickup → destination)

// Notifications

// history

// Profile

// Logout

// Driver:

// Notifications for new ride requests

// Accept / Reject ride

// View currently accepted ride

// Update profile

// Logout

// Admin:

// Manage Drivers

// Manage Students

// View all rides

// Logout