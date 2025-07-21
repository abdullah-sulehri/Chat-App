import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create ((set)=>({
    authUser:null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth:true,
    checkAuth: async()=>{
        try{
            const res= await axiosInstance.get("/auth/check");
            console.log("response in checkAuth",res.data)
            set({authUser:res.data})
        }
        catch(error){
            set({authUser:null})

        }
        finally{
            set({isCheckingAuth: false})
        }
    },
    signup: async(data)=>{
        set({isSigningUp: true});
        try{
            const res= await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp: false})
        }

    },
    logout: async()=>{
        try{
            const res= await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged Out successfully");
        }
        catch(error){
            toast.error("Something went wrong");
        }
    },
    login: async (data)=>{
        set({isLoggingIn:true})
        
        try{
            
            const res=await axiosInstance.post("/auth/login",data);
            console.log("res",res.data);
            console.log("dates",res.data.createdAt)
            set({authUser:res.data});
            toast.success("User  logged in successfully")
        }
        catch(error){
            toast.error("Invalid credentials");

        }
        finally{
            set({isLoggingIn:false})
        }
    },
     updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },



}))