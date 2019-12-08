export const adminActions = {
  login,
  logout
};

function login() {
  return { type: "LOGIN" };
}
function logout() {
  return { type: "LOGOUT" };
}
