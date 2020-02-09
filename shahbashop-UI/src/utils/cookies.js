export function setCookie(token) {
  localStorage.setItem("token", token);
}

export function checkCookie() {
  let user = localStorage.getItem("token");
  if (user !== "") {
    return user;
  } else {
    return null;
  }
}
