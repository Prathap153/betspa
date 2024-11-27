
const AuthHeader = () => {
  const tokenStr = localStorage.getItem("BetAuthToken");
  console.log("token",tokenStr);
  if (tokenStr) {
    return { Authorization: `Bearer ${tokenStr}` };
  } else {
    return { Authorization: "" };
  }
};

export default AuthHeader;