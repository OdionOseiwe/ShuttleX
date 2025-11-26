import { UserRound, ChevronDown, ChevronUp } from 'lucide-react';
import Profile from '../components/Profile';
import { useState } from 'react';

function SideBar() {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  return (
    <div className=''>
      <div className="flex justify-between md:px-20 px-10 border-b-4 border-gray-200 py-2">
        <h1 className="text-2xl font-semibold cursor-pointer">ShuttleX</h1>

        <div
          onClick={toggleProfile}     // 👈 mobile-friendly
          className="flex justify-between cursor-pointer items-center relative"
        >
          <UserRound className="rounded-full text-gray-400" size={35} />
          {showProfile ? <ChevronUp /> : <ChevronDown />}

          {showProfile && (
            <div className="absolute right-0 top-12">
              <Profile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
