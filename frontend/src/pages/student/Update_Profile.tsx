import SideBar from '../../layout/SideBar';
import {useAuthStore} from '../../store/UserAuth'
import { useState } from "react";
import { Mail } from "lucide-react";

export default function UpdateProfile() {
  const [editing, setEditing] = useState(false);
  const {user} = useAuthStore();
  console.log(user);
  
  return (
    <div className="py-5 z-1">
        <SideBar/>
      <div className="">
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome {user?.name}</h1>
              <p className="text-gray-500 text-sm">{new Date(user?.createdAt).toLocaleString()}</p>
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
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>

              <button onClick={() => setEditing(!editing)} className=" bg-gray-200  px-6">
                {editing ? "Save" : "Edit"}
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mb-1 font-medium">{user?.mobileNumber}</label>
                <input className='p-2 outline-none' placeholder="mobile number" disabled={!editing} />
              </div>

                {
                    user?.role === "driver" &&(
                        <>
                            <div>
                                <label className="block mb-1 font-medium">vehicle type</label>
                                <input placeholder="mobile number" disabled={!editing} />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">vehicle number</label>
                                <input placeholder="mobile number" disabled={!editing} />
                            </div> 
                            <div>
                                <label className="block mb-1 font-medium">capacity</label>
                                <input placeholder="mobile number" disabled={!editing} />
                            </div>
                        </> 
                    )
                }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

