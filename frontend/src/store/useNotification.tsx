import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

// Use VITE_BACKEND_URL or fallback
const HOST_URL = import.meta.env.VITE_BACKEND_URL ;
// const HOST_URL = "http://localhost:7000/TriRide/api"; 

type NotificationType ={
    _id:string,
    userId:any,
    title:string,
    data:string,
    read:boolean,
    createdAt:Date,
}

type NotificationStore={
    NotificationsArray:NotificationType[] | null,
    notification:any,
    isLoading:boolean,
    error:string | null,

    getNoficationsForUser:()=>Promise<void>
    getUserNotificationbyId:(id:any)=>Promise<void>
    setReadNotification:(id:any)=>Promise<void>
}

export const useNotificationStore = create<NotificationStore>((set)=> ({
    NotificationsArray:null,
    isLoading:false,
    error:'',
    notification:null,
    getNoficationsForUser: async() =>{
        try {
            set({error:null, isLoading:true,NotificationsArray:null})
            const response = await axios.get(`${HOST_URL}/user/notifications`);                        
            set({
                NotificationsArray:response.data.notifications,
                isLoading:false
            });
        } catch (error) {
            set({error:error.response.data.msg, isLoading:false})
            throw error;
        }
    },

    getUserNotificationbyId:async(id)=>{
        try {
            set({error:null, isLoading:true, notification:''})
            const response = await axios.get(`${HOST_URL}/user/notification/${id}`);                                    
            set({
                notification:response.data.notification,
                isLoading:false
            });
        } catch (error) {
            set({error:error.response.data.msg, isLoading:false})
            throw error;
        }
    },

    setReadNotification: async(id) =>{
         try {
            set({error:null, isLoading:true})
            await axios.patch(`${HOST_URL}/user/notification/read/${id}`,);                        
            set({
                isLoading:false
            });
        } catch (error) {
            set({error:error.response.data.msg, isLoading:false})
            throw error;
        }
    }
    
}))

