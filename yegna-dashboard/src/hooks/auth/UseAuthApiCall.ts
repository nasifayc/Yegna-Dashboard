import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authSlice";
import { notify } from "../../components/Toast";
import { LOGIN_URL } from "../../utils/api/ApiRoutes";
import { LoginFormData } from "./UseAuthForm";

const useAuthApiCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
    const response = await axios.post(LOGIN_URL, data);
    const accessToken = response.data;
    dispatch(login({ accessToken }));
    notify("Sign In Successful");
    navigate("/");
  };

  return { handleLogin };
};

export default useAuthApiCall;
