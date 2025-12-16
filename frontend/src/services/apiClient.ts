import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5003/api",
});

const refreshClient = axios.create({
  baseURL: "http://localhost:5003/api",
  withCredentials: true,
});

// // Request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
//   failedQueue = [];
// };

// // Response
// apiClient.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest: any = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/refresh-token")
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return apiClient(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await refreshClient.post("/auth/refresh-token");
//         const newToken = res.data.accessToken;

//         localStorage.setItem("accessToken", newToken);
//         processQueue(null, newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return apiClient(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         localStorage.removeItem("accessToken");
//         window.location.replace("/login");
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default apiClient;
