import axios,{AxiosError} from "axios";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          console.error("Bad request");
          break;

        case 401:
          console.error("Unauthorized");
          break;

        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("Resource not found");
          break;

        case 500:
          console.error("Server error");
          break;

        default:
          console.error("Unexpected error");
      }
    } 
    
    else if (error.request) {
      console.error("Backend not reachable");
    } 
    
    else {
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);