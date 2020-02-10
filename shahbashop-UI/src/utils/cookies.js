export function setToken(token) {
  localStorage.setItem("token", token);
}

export function checkToken() {
  let user = localStorage.getItem("token");
  if (user !== "") {
    return user;
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
