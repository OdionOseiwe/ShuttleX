import { UserRound, Bell, Book,History, UserPen } from "lucide-react"
function Profile() {
    const profile = [
        {name: 'Book Ride', icon: Book},
        {name: 'Notifications', icon: Bell},
        {name: 'history', icon: History},
        {name: 'Profile', icon: UserPen},

    ]
  return (
    <div className='p-4 mt-4 rounded-xl w-1/4 shadow-2xl z-20 fixed top-12  right-20 bg-white'>
      <div className='flex justify-between'>
        <p className="text-3xl font-semibold">Oseiwe Ifebhor</p>
        <div className="flex space-x-3 items-center">
          <UserRound className="rounded-full bg-gray-200 p-2 text-gray-400" size={50} />
        </div>
      </div>
      <div className="my-6">
        {
            profile.map((profile)=>(
                <div className="bg-gray-100 hover:bg-gray-200 py-3 my-3  px-2 rounded-xl text-xl font-semibold flex items-center"> <profile.icon className="mx-3"/> {profile.name}</div>
            ))
        }
      </div>
        <div className=" bg-gray-100 hover:bg-gray-200 text-center py-3 px-6 rounded-xl text-red-500 font-semibold">Logout</div>
    </div>
  )
}

export default Profile
