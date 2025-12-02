import { UserRound, Bell, Book,History, UserPen } from "lucide-react"
import {useAuthStore} from '../store/UserAuth'
import { useNavigate } from "react-router-dom";
function Profile() {
    const {logout, user} = useAuthStore();
    const navigator = useNavigate();

    const handleLogout = async() =>{
      try {
        await logout();
        navigator('/login')
      } catch (error) {
        console.log(error);
        
      }
    }
    const profile = [
        {name: 'Book Ride', icon: Book, link:"book-ride"},
        {name: 'Notifications', icon: Bell, link:"notifications"},
        {name: 'history', icon: History, link:"history"},
        {name: 'Profile', icon: UserPen, link:"update-profile"},

    ]
  return (
    <div className='p-4 mt-4 rounded-xl md:w-1/4 w-full shadow-2xl z-20 fixed top-12  md:right-20 right-0 bg-white'>
      <div className='flex justify-between'>
        <p className="text-3xl font-semibold">{user?.user?.name}</p>
        <div className="flex space-x-3 items-center">
          <UserRound className="rounded-full bg-gray-200 p-2 text-gray-400" size={50} />
        </div>
      </div>
      <div className="my-6">
        {
            profile.map((profile)=>(
                <a href={`/${profile.link}`} className="bg-gray-100 hover:bg-gray-200 py-3 my-3  px-2 rounded-xl text-xl font-semibold flex items-center"> <profile.icon className="mx-3"/> {profile.name}</a>
            ))
        }
      </div>
        <button onClick={handleLogout} className=" bg-gray-100 w-full hover:bg-gray-200 text-center py-3 px-6 rounded-xl text-red-500 font-semibold">Logout</button>
    </div>
  )
}

export default Profile
