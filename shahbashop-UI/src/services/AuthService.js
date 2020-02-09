import axios from "axios";

export default class AuthService {
  login(email, password) {
    let url = "auth/login";
    return axios.post(url, {
      email,
      password
    });
  }
}
