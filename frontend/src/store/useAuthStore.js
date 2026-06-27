import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore= create((set,get)=>({
    authUser:null,
    userType:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth: true,
    checkAuth: async ()=>{
        try{
            const res=await axiosInstance.get("/auth/check");
            
            
            set({ 
                authUser : res.data.userEmail,
                userType : res.data.userType,
                userReferenceId : res.data.userReferenceId,
            });
            // console.log(res.data.userEmail)
            set({ isCheckingAuth : false});
        } catch (err) {
            console.log("Error in checkAuth",err );
            set({ authUser : null });
            set({ isCheckingAuth : false});
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post("/auth/signin", data);

            set({
            authUser: res.data.userEmail,
            userType: res.data.userType,
            userReferenceId: res.data.userReferenceId,
            });

            return true;
        } catch (error) {
            toast.error(
            error.response?.data?.message || "Login failed"
            );
            return false;
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        }
    },
    
}));

