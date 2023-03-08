import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuth } from "./store/auth";
import { useToast } from "vue-toastification";

export const axiosBase = axios.create({
  // baseURL: "",
  
  baseURL: import.meta.env.VITE_API_BASE_URL,

});

// axiosBase.defaults.headers.common['Access-Control-Request-Headers'] = "*"
// axiosBase.defaults.headers.common['Access-Control-Request-Method'] = "*"


axiosBase.interceptors.request.use((config: AxiosRequestConfig) => {
  const userStore = useAuth();
  if (userStore.isAuth) {
    if (config.headers) {
      config.headers["Authorization"] = userStore.berear;
    }
  }
  return config;
});

axiosBase.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    console.log("Response :", error)
    if(error.response?.status === 401){
      console.log("Redirect")
      // window.open('/login','_self')
    }
    // const originalConfig = error.config;
    // if (error.response?.status === 401 && !originalConfig._retry) {
    //   originalConfig._retry = true;
    //   try {
    //     const userStore = useUserStore();
    //     // Refresh the token and retry once
    //     const accessToken = await userStore.refreshToken();
    //     originalConfig.headers.Authorization = "Bearer " + accessToken;
    //     return axiosPrivate(originalConfig);
    //   } catch (_error) {
    //     console.error("Refresh token failed");
    //     console.error(_error);
    //     return Promise.reject(_error);
    //   }
    // }
    const toast = useToast();
    if(error.response && error.response.data){
      toast.error( error.response.data['detail']);
    }else{
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);
