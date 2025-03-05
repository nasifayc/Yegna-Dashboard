import { useModal } from "../context/ModalContext";
import { FaTimes } from "react-icons/fa"; // Importing the 'X' icon
import useAuthForm from "../hooks/auth/UseAuthForm";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/store";

const SignInPage: React.FC = () => {
  const { showSignIn, setShowSignIn } = useModal();
  const { register, handleSubmit, errors, loading, onSubmit } = useAuthForm();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    navigate("/dashboard");
    return;
  }

  const handleCloseModal = () => {
    setShowSignIn(false);
  };

  if (!showSignIn) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="text-text-light  bg-gray-100  p-6 rounded shadow max-w-md w-full relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-xl "
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl  text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4 mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              {...register("email")}
              placeholder="example@gmail.com"
              className="p-2 rounded shadow "
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Your password"
              className="p-2 rounded shadow bg-background-light  text-text-light "
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="mt-4 w-full py-3 rounded-full shadow bg-background-dark text-text-dark"
            >
              Sign In
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
