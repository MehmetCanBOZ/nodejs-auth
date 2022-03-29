import jwtDecode from "jwt-decode";

const UserService = {
  userName: () => {
    const accessToken = localStorage.getItem("authtoken");
    if (!accessToken) {
      return false;
    }

    const decodedToken = jwtDecode(accessToken);
    if (!decodedToken) {
      return false;
    }

    const userName = decodedToken?.name;
    return userName;
  },
};

export default UserService;
