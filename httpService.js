import axios from "axios";
import { toast } from "react-toastify";
import { login } from "./authService";
import CookieService from "./cookieService";
import history from "history/browser";
const cookieService = CookieService.getService();

// Add a request interceptor
axios.interceptors.request.use(async (config) =>  {
  // Avoid Auth header for SignIn API
     if (config.headers.clientId)  {
            return config
     } else{
       
       const token = cookieService.getAccessToken();
     // If AT is available add to Header 
       if (token) {
        if (config.method !== 'OPTIONS'){
           config.headers['Authorization'] = token;
           return config
        }        
       }else{
         // If AT expired, check if RT is available
        const  data  = sessionStorage.getItem('data')
        if (data){
          //If RT is available, get AT using RT and attach to Header
          let tokenResponse = await login(data)
          config.headers['Authorization'] = cookieService.getAccessToken();
          return config;          
          
      } else{
        // If RT is also expired move to login
        history.push("/login")
        return config;
      }
      }
      }
       return config;
   },
   (error) => {
      return Promise.reject(error)
   });

   
  
// axios.interceptors.response.use(null, (error) => {
//   console.log(response)
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError ) {
//     // logger.log(error);
//     toast.error("An unexpected error occurrred.");
//   }

//   return Promise.reject(error);
// });


axios.interceptors.response.use((response)=>{
  
  if (response.data.errors) {
    if(response.data.errors[0].extensions.message){
      toast.error(response.data.errors[0].extensions.message)
    }else{
      toast.error(response.data.errors[0].extensions.classification)
    }
      return Promise.reject();
  } else {
    //console.log(response.data)
    return response;
  }
  
},(error)=>{
  
        console.log(error)      
        toast.error(error.message);
        return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
