import axios from "axios";

 export function LoginService(email, password){
    let url = "auth/login";
    return axios.post(url, {
      email,
      password
    });
  }
