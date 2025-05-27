import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <SignIn />
      <button
        className="mt-4 px-4 py-2 bg-gray-400 text-white rounded text-black"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default SignInPage;