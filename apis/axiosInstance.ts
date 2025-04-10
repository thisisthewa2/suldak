import axios from "axios";
import { getToken } from "app/liquor/utils/tokenStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

 if (token) {
   // 플러터 앱과 같은 형식으로 설정
   config.headers["Authorization"] = token;
 } else {
   // 토큰이 없으면 환경변수 사용 
   const envToken = process.env.NEXT_PUBLIC_TOKEN;
   if (envToken) {
     config.headers["Authorization"] = envToken;
     console.log("환경변수 토큰을 사용중입니다.");
   }
 }

  return config;
});

export default axiosInstance;
