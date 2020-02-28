import jwt from "jsonwebtoken";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function checkUserToken() {
  let userToken = localStorage.getItem("token");
  if (userToken !== "") {
    return userToken;
  }
    return null;
}

export function setAcceptedCookies(){
  localStorage.setItem("acceptedCookies", true);
}

export function checkAcceptedCookies(){
  let acceptedCookies = localStorage.getItem("acceptedCookies");

  if(acceptedCookies !== null){
    return true;
  }
  
  return false;
}

export function userIsAdmin() {
  let userToken = checkUserToken();
  if (userToken !== null) {
    let token = jwt.decode(userToken);
    return token.role?.includes("Admin") ? true : false;
  }
  return false;
}
