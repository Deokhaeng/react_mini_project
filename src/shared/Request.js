import axios from "axios";
// import Cookies from './Cookie';


const instance = axios.create({
	baseURL: "http://localhost:3000/user/auth", // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
    timeout: 1000,
    headers: {
        access_token: cookies.get('access_token'),
      },
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// instance.defaults.headers.common["Authorization"] = USER_TOKEN; 
instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['Accept'] = '*/*';
  config.headers['authorization'] = `Bearer ${getToken()}`;
  return config;
});

export default instance;

