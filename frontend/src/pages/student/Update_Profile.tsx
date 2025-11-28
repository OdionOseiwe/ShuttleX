import SideBar from '../../layout/SideBar';
import {useAuthStore} from '../../store/UserAuth'
import { useState } from "react";

export default function UpdateProfile() {
  const [editing, setEditing] = useState(false);
  const {user} = useAuthStore();
  console.log(user);
  
  
  return (
    <div className="py-5 z-1">
        <SideBar/>
        <div className="md:p-10 p-5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome {user?.user?.name}</h1>
              <p className="text-gray-500 text-sm">{new Date(user?.user?.createdAt).toLocaleString()}</p>
            </div>
            {/* <div className="flex items-center gap-4">
              <img
                src="/avatar.png"
                className="w-10 h-10 rounded-full border"
              />
            </div> */}
          </div>

          <div className="bg-white border-gray-100 border rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="md:flex items-center gap-4">
                <img
                  src="/profile.png"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold">{user?.user?.name}</h2>
                  <p className="text-gray-500">{user?.user?.email}</p>
                </div>
              </div>

              <button onClick={() => setEditing(!editing)} className=" bg-gray-200  px-6">
                {editing ? "Save" : "Edit"}
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mb-1 font-medium">{user?.user?.mobileNumber}</label>
                <input className='p-2 outline-none' placeholder="mobile number" disabled={!editing} />
              </div>

                {
                    user?.user?.role === "driver" &&(
                        <>
                            <div>
                                <label className="block mb-1 font-medium">{user?.user?._doc?.vehicleType}</label>
                                <input placeholder="vehicle type" disabled={!editing} />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium"> {user?.user?._doc?.vehicleNumber}</label>
                                <input placeholder="vehicle number" disabled={!editing} />
                            </div> 
                            <div>
                                <label className="block mb-1 font-medium">{user?.user?._doc?.capacity}</label>
                                <input placeholder="capacity" disabled={!editing} />
                            </div>
                        </> 
                    )
                }
              
            </div>
          </div>
        </div>
      </div>
  );
}

