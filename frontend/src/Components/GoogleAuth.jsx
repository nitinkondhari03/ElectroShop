import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context";
import SummaryApi from "../common";
import React, { useContext } from "react";
export default function GoogleAuth() {
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      console.log(result.user.displayName);
      console.log(result.user.email);
      console.log(result.user.photoURL);
      const res = await fetch("https://mern-a77g.onrender.com/api/google", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        fetchUserDetails();
        fetchUserAddToCart();
      }
      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("could not login with google", error);
    }
  };
  return (
    // <button
    //   type="button"
    //   onClick={handleGoogleClick}
    //   className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    // >
    //   Continue with google
    // </button>
    <button
      type="button"
      class="py-2 px-4 flex uppercase justify-center items-center bg-orange-800 hover:bg-orange-900 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      onClick={handleGoogleClick}
    >
      <svg
        width="20"
        height="20"
        fill="currentColor"
        class="mr-2"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
      </svg>
      Continue with google
    </button>
  );
}
